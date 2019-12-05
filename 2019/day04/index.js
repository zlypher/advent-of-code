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

const findPasswords = (minPw, maxPw) => {
    const passwords = [];

    for (let curr = minPw; curr < maxPw; ++curr) {
        if (isValidPassword(curr)) {
            passwords.push(curr);
        }
    }

    return passwords;
}

const passwords = findPasswords(min, max);
console.log("Result (Part 1):", passwords.length);