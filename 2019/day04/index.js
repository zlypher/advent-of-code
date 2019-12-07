// Day 4: Secure Container

const min = 264360;
const max = 746325;

const isValidPassword = (password) => {
    const passwordArr = password.toString().split("").map(x => parseInt(x, 10));
    let previous = passwordArr[0];
    let hasAdjacent = false;

    for (let idx = 1; idx < passwordArr.length; ++idx) {
        const current = passwordArr[idx];
        if (current < previous) {
            return false;
        }

        hasAdjacent = hasAdjacent || current === previous;
        previous = current;
    }

    return hasAdjacent;
}

const findPasswords = (minPw, maxPw, isValidFn) => {
    const passwords = [];

    for (let curr = minPw; curr < maxPw; ++curr) {
        if (isValidFn(curr)) {
            passwords.push(curr);
        }
    }

    return passwords;
}

const passwords = findPasswords(min, max, isValidPassword);
console.log("Result (Part 1):", passwords.length);

// Part Two

const isValidPasswordV2 = (password) => {
    const passwordArr = password.toString().split("").map(x => parseInt(x, 10));
    let previous = passwordArr[0];
    let hasDoubleDigit = false;
    let digitCount = 1;

    for (let idx = 1; idx < passwordArr.length; ++idx) {
        const current = passwordArr[idx];
        if (current < previous) {
            return false;
        }

        if (current === previous) {
            digitCount++;
        } else {
            if (digitCount === 2) {
                hasDoubleDigit = true;
            }

            digitCount = 1;
        }

        previous = current;
    }

    if (digitCount === 2) {
        hasDoubleDigit = true;
    }

    return hasDoubleDigit;
}

const passwordsV2 = findPasswords(min, max, isValidPasswordV2);
console.log("Result (Part 2):", passwordsV2.length);