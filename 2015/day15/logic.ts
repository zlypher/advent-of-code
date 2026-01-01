export type Input = {
  ingredients: {
    name: string;
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
  }[];
};

export const prepareInput = (rawInput: string): Input => {
  let line: string | undefined;
  let ingredients = [];
  const lines = rawInput.split(/\r\n|\r|\n/);
  while ((line = lines.shift())) {
    const [_, name, capacity, durability, flavor, texture, calories] =
      line.match(
        /^(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)$/
      )!;
    ingredients.push({
      name,
      capacity: Number(capacity),
      durability: Number(durability),
      flavor: Number(flavor),
      texture: Number(texture),
      calories: Number(calories),
    });
  }

  return { ingredients };
};

export function solvePartOne(input: Input): number {
  let highScore = 0;

  const [sprinkles, butterscotch, chocolate, candy] = input.ingredients;

  for (let tspSprinkles = 0; tspSprinkles <= 100; tspSprinkles++) {
    for (
      let tspButterscotch = 0;
      tspButterscotch <= 100 - tspSprinkles;
      tspButterscotch++
    ) {
      for (
        let tspChocolate = 0;
        tspChocolate <= 100 - tspSprinkles - tspButterscotch;
        tspChocolate++
      ) {
        const tspCandy = 100 - tspSprinkles - tspButterscotch - tspChocolate;

        const capacity =
          tspSprinkles * sprinkles.capacity +
          tspButterscotch * butterscotch.capacity +
          tspChocolate * chocolate.capacity +
          tspCandy * candy.capacity;
        const durability =
          tspSprinkles * sprinkles.durability +
          tspButterscotch * butterscotch.durability +
          tspChocolate * chocolate.durability +
          tspCandy * candy.durability;
        const flavor =
          tspSprinkles * sprinkles.flavor +
          tspButterscotch * butterscotch.flavor +
          tspChocolate * chocolate.flavor +
          tspCandy * candy.flavor;
        const texture =
          tspSprinkles * sprinkles.texture +
          tspButterscotch * butterscotch.texture +
          tspChocolate * chocolate.texture +
          tspCandy * candy.texture;

        const totalScore =
          Math.max(0, capacity) *
          Math.max(0, durability) *
          Math.max(0, flavor) *
          Math.max(0, texture);

        if (totalScore > highScore) {
          highScore = totalScore;
        }
      }
    }
  }

  return highScore;
}

export function solvePartTwo(input: Input): number {
  let highScore = 0;

  const [sprinkles, butterscotch, chocolate, candy] = input.ingredients;

  for (let tspSprinkles = 0; tspSprinkles <= 100; tspSprinkles++) {
    const sprinklesCalories = tspSprinkles * sprinkles.calories;
    if (sprinklesCalories > 500) {
      continue;
    }

    for (
      let tspButterscotch = 0;
      tspButterscotch <= 100 - tspSprinkles;
      tspButterscotch++
    ) {
      const butterscotchCalories = tspButterscotch * butterscotch.calories;
      if (sprinklesCalories + butterscotchCalories > 500) {
        continue;
      }

      for (
        let tspChocolate = 0;
        tspChocolate <= 100 - tspSprinkles - tspButterscotch;
        tspChocolate++
      ) {
        const tspCandy = 100 - tspSprinkles - tspButterscotch - tspChocolate;

        const chocolateCalories = tspChocolate * chocolate.calories;
        const candyCalories = tspCandy * candy.calories;
        const totalCalories =
          sprinklesCalories +
          butterscotchCalories +
          chocolateCalories +
          candyCalories;

        if (totalCalories !== 500) {
          continue;
        }

        const capacity =
          tspSprinkles * sprinkles.capacity +
          tspButterscotch * butterscotch.capacity +
          tspChocolate * chocolate.capacity +
          tspCandy * candy.capacity;
        const durability =
          tspSprinkles * sprinkles.durability +
          tspButterscotch * butterscotch.durability +
          tspChocolate * chocolate.durability +
          tspCandy * candy.durability;
        const flavor =
          tspSprinkles * sprinkles.flavor +
          tspButterscotch * butterscotch.flavor +
          tspChocolate * chocolate.flavor +
          tspCandy * candy.flavor;
        const texture =
          tspSprinkles * sprinkles.texture +
          tspButterscotch * butterscotch.texture +
          tspChocolate * chocolate.texture +
          tspCandy * candy.texture;

        const totalScore =
          Math.max(0, capacity) *
          Math.max(0, durability) *
          Math.max(0, flavor) *
          Math.max(0, texture);

        if (totalScore > highScore) {
          highScore = totalScore;
        }
      }
    }
  }

  return highScore;
}
