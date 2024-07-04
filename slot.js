// 1. Deposit money
// 2. Determine number of line to bet on
// 3. Bet amount
// 4. Spin the machine
// 5. Win or Lose
// 6. Give user their winnings
// 7. Play again

const prompt = require("prompt-sync")();

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


let balance = depo();
const numLine = getNumOfLines();
const bet = getBet(balance, numLine);

