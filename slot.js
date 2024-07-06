// 1. Deposit money
// 2. Determine number of line to bet on
// 3. Bet amount
// 4. Spin the machine
// 5. Win or Lose
// 6. Give user their winnings
// 7. Play again

const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbols_count = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}

const symbol_values = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

const depo = () => {
    while (true) {
        const depoAmount = prompt("Enter a deposit amount: ");
        const numdepoAmount = parseFloat(depoAmount);

        if (isNaN(numdepoAmount) || numdepoAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numdepoAmount;
        }
    }
};

const getNumOfLines = () => {
    while (true) {
        const lines = prompt("Enter the numbers of lines to bet on (1-3): ");
        const numLine = parseFloat(lines);

        if (isNaN(numLine) || numLine <= 0 || numLine > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numLine;
        }
    }
};

const getBet= (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numBet = parseFloat(bet);

        if (isNaN(numBet) || numBet <= 0 || numBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbols_count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [[]];
    for (let i = 0; i < cols; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels
};

const transpose = (reels) => {
    const row = [];

    for (let i = 0; i < rows; i++) {
        row.push([]);
        for (let j = 0; j < cols; j++) {
            row[i].push(reels[j][i]);
        }
    }

    return row;
};



let balance = depo();
const numLine = getNumOfLines();
const bet = getBet(balance, numLine);
const reels = spin()
const row = transpose(reels)
console.log(reels)
console.log(row)


