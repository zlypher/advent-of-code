// Day 16: Ticket Translation
const fs = require("fs");

const prepareInput = () => fs.readFileSync("./input.txt")
    .toString()
    .split("\r\n");

function solvePartOne(data) {
    const { nearby, fields } = data;
    let errorRate = 0;

    for (let i = 0; i < nearby.length; ++i) {
        const ticket = nearby[i];
        errorRate += scanTicket(ticket, fields);
    }

    return errorRate;
}

function scanTicket(ticket, fields) {
    for (let j = 0; j < ticket.length; ++j) {
        const val = ticket[j];
        let matchesAtLeastOne = false;

        for (let i = 0; i < fields.length; ++i) {
            const { conditions } = fields[i];
            for (let k = 0; k < conditions.length; ++k) {
                const res = matchCondition(val, conditions[k]);
                if (res === 0) {
                    matchesAtLeastOne = true;
                }
            }
        }

        if (!matchesAtLeastOne) {
            return val;
        }
    }

    return 0;
}

function matchCondition(val, condition) {
    const [min, max] = condition;
    if (min <= val && val <= max) {
        return 0;
    } else {
        return val;
    }
}

function prepareTicketData(input) {
    const [fields, ptr] = parseFields(input);
    const [ticket, ptr2] = parseTicket(input, ptr);
    const nearby = parseNearby(input, ptr2);

    return {
        fields,
        ticket,
        nearby,
    };
}

function parseFields(input) {
    const regex = /^([\w\s]*): (\d+)-(\d+) or (\d+)-(\d+)$/
    const fields = [];

    for (let i = 0; i < input.length; ++i) {
        const line = input[i];
        if (line === "") {
            return [fields, i + 1];
        }

        const matches = line.match(regex);
        fields.push({
            name: matches[1],
            conditions: [
                [parseInt(matches[2], 10), parseInt(matches[3], 10)],
                [parseInt(matches[4], 10), parseInt(matches[5], 10)],
            ]
        })
    }

    return [fields, -1];
}

function parseTicket(input, ptr) {
    const line = input[ptr + 1];
    const ticket = line.split(",").map(n => parseInt(n, 10));
    return [ticket, ptr + 4];
}

function parseNearby(input, ptr) {
    const tickets = [];

    for (let i = ptr; i < input.length; ++i) {
        const line = input[i];
        const ticket = line.split(",").map(n => parseInt(n, 10));
        tickets.push(ticket);
    }

    return tickets;
}

const input = prepareInput();
const data = prepareTicketData(input);
console.log(solvePartOne(data));
