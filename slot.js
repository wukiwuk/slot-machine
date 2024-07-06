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

    const reels = [];
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

const Rows = (row) => {
    for(const ro of row) {
        let rowString = "";
        for(const [i, symbol] of ro.entries()) { 
            rowString += symbol;
            if(i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const Winnings = (row, bet, lines) => {
    let winnings = 0;

    for (let ro = 0; ro < lines; ro++) {
        const symbols = row[ro];
        let allSame = true;

        for(const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * symbol_values[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balance = depo();

    while (true) {
        console.log("Your balance is $" + balance);
        const numLine = getNumOfLines();
        const bet = getBet(balance, numLine);
        balance -= bet * numLine;
        const reels = spin();
        const row = transpose(reels)
        const ro = Rows(row);
        console.log(ro);
        const winnings = Winnings(row, bet, numLine) ;
        balance += winnings;
        console.log("YOU HAVE WON $" + winnings.toString());

        if (balance <= 0 ) {
            console.log("You're balance is empty")
            break;
        }

        const playAgain = prompt("Do you want to play again (Y/N)?: ")  
        if (playAgain != "Y") {
            break;
        } 
    }
}

game()



