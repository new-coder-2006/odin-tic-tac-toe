const checkEvery = function(lst) {
    if (lst.every(element => element.toLowerCase() === "x")) {
        return "x";
    } else if (lst.every(element => element.toLowerCase() === "o")) {
        return "o";
    } else {
       return "none";
    }
}

const checkRow = function(row) {
    return checkEvery(row);
}

const checkCol = function(board, colIndex) {
    let arr = [];

    for (let key in board) {
        arr.push(board[key][colIndex]);
    }

    return checkEvery(arr);
}

const checkDiag = function(board, diag) {
    let arr;

    if (diag === "leftToRight") {
        arr = [board["0"][0], board["1"][1], board["2"][2]];
    } else if (diag === "rightToLeft") {
        arr = [board["0"][2], board["1"][1], board["2"][0]];
    } else {
        alert("Please enter a valid diagonal to check!");
    }

    return checkEvery(arr);
}

const setWinner = function(winner) {
    const resultContainer = document.querySelector(".winner");

    if (winner === "tie") {
        resultContainer.textContent = "It's a tie!";
    } else {
        resultContainer.textContent = winner + " wins!";
    }
}

const checkForWin = function(board) {
    for (let key in board) {
        const winner = checkRow(board[key]);

        if (winner !== "none") {
            return winner;
        } else {
            // Do nothing b/c no tic tac toe in this row
        }
    }

    for (let i = 0; i < 3; i++) {
        const winner = checkCol(board, i);

        if (winner !== "none") {
            return winner;
        } else {
            // Do nothing b/c no tic tac toe in this row
        }
    }

    const leftDiagWinner = checkDiag(board, "leftToRight");
    const rightDiagWinner = checkDiag(board, "rightToLeft");

    if (leftDiagWinner !== "none") {
        return leftDiagWinner;
    } else if (rightDiagWinner !== "none") {
        return rightDiagWinner;
    } else {
        return "none"; // Can return none here b/c no one has tic tac toe
    }
}

const checkAvailableMoves = function(board) {
    return board["0"].includes("_") || 
           board["1"].includes("_") || 
           board["2"].includes["_"];
}

const restartGame = function() {
    const rows = document.querySelectorAll(".row");

    rows.forEach(row => {
        Array.from(row.childNodes).forEach(child => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                child.textContent = '';
            }
        });
    });

    let board = {
        0: ["_", "_", "_"],
        1: ["_", "_", "_"],
        2: ["_", "_", "_"]
    }

    return board;
}

function createPlayer(name, symbol) {
    const playMove = (board, row, col) => {
        console.log(board);
        console.assert(row >= 0 && row < 3 && col >= 0 && col < 3);
        
        if (board[row][col] !== "_") {
            return "invalid";
        } else if (checkForWin(board) !== "none") {
            // Do nothing because game is already over
        } else {
            board[row][col] = symbol;
            const squareNumber = String(row) + String(col);
            const square = document.querySelector("#square" + squareNumber);
            square.textContent = symbol.toUpperCase();
        }

        const checkWin = checkForWin(board);
        const checkAvailable = checkAvailableMoves(board);
        
        if (checkWin !== "none") {
            return checkWin;
        } else if (!checkAvailable) {
            return "tie";
        } else {
            return "none";
        }
    }

    return {name, symbol, playMove};
}

function game() {
    const xName = prompt("Name of X player: ");
    const oName = prompt("Name of O player: ");
    const x = createPlayer(xName, "X");
    const o = createPlayer(oName, "O");

    let board = {
        0: ["_", "_", "_"],
        1: ["_", "_", "_"],
        2: ["_", "_", "_"]
    }

    let currentPlayer = x;
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        const squareNumber = square.id;

        square.addEventListener("click", () => {
            const moveResult = currentPlayer.playMove(board, 
                                                      squareNumber[6], 
                                                      squareNumber[7]);

            if (moveResult !== "none" && moveResult !== "invalid") {
                if (moveResult === "x") {
                    setWinner(xName);
                } else {
                    setWinner(oName);
                }
            } else if (moveResult !== "invalid") {
                if (currentPlayer === x) {
                    currentPlayer = o;
                } else {
                    currentPlayer = x;
                }
            } else {
                // Do nothing because user clicked on a space that is already filled
            }
        });
    });

    const restart = document.querySelector(".restart");

    restart.addEventListener("click", () => {
        board = restartGame();
    });
}

game();