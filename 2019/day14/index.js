// Day 14: Space Stoichiometry
const fs = require("fs");

const parseReactonListRaw = (reactionListRaw) => {
    return reactionListRaw.map(formula => {
        const [inRaw, outRaw] = formula.split(" => ");
        const outSplit = outRaw.split(" ");
        const output = {
            name: outSplit[1],
            quantity: parseInt(outSplit[0], 10)
        };
        const inSplit = inRaw.split(", ");
        const input = inSplit.map(part => {
            const partSplit = part.split(" ");
            return {
                name: partSplit[1],
                quantity: parseInt(partSplit[0], 10)
            }
        });

        return {
            output,
            input
        }
    })
}
let reactionListRaw = fs.readFileSync("./input.txt").toString().split("\r\n");
let reactionList = parseReactonListRaw(reactionListRaw);

const findFormula = (reactionList, ingredient) => reactionList.filter(f => f.output.name === ingredient)[0];

// Heavily inspired by https://dev.to/maxart2501/comment/ipmn
const findRequiredOre = (reactionList, amount) => {
    let required = {
        FUEL: amount,
    };
    let ingredients = {};

    while (Object.keys(required).length !== 1 || !("ORE" in required)) {
        let requiredNew = {};

        for (const [name, quantity] of Object.entries(required)) {
            if (name === "ORE") {
                requiredNew[name] = (requiredNew[name] || 0) + quantity;
                continue;
            }

            let formula = findFormula(reactionList, name);
            const numApplications = Math.ceil((quantity - (ingredients[name] || 0)) / formula.output.quantity);
            Object.entries(formula.input)
                .map(([_, ingredient]) => {
                    requiredNew[ingredient.name] = (requiredNew[ingredient.name] || 0) + numApplications * ingredient.quantity;
                });

            ingredients[name] = (ingredients[name] || 0) + numApplications * formula.output.quantity - quantity;
        }

        required = requiredNew;
    }

    return required["ORE"];
}

const result = findRequiredOre(reactionList, 1);
console.log("Result (Part 1):", result);

// Part 2
let orePerFuel = result;

const findFuelForOre = (reactionList, orePerFuel, oreAmount) => {
    let estimatedFuel = Math.floor(oreAmount / orePerFuel);
    let estimated = 0;
    do {
        estimated = estimatedFuel;
        const neededOre = findRequiredOre(reactionList, estimated);
        estimatedFuel = Math.floor(estimatedFuel * oreAmount / neededOre);
    } while (estimatedFuel > estimated)

    return estimated;
}

const resultV2 = findFuelForOre(reactionList, orePerFuel, 1e12);
console.log("Result (Part 2):", resultV2);
