import * as fs from "fs";

const entireInput: string[] | number[] = fs
    .readFileSync("src/inputs/day4.txt", {
        encoding: "utf-8",
    })
    .split("\n")
    .filter(x => x);

const luckyNumbers: number[] = entireInput[0].split(",").map(x => parseInt(x));
entireInput.splice(0, 1); // remove numbers from input

let boards: number[][] | string[][] = entireInput.map(x =>
    x.split(" ").filter(x => x)
);
boards = boards.map(x => x.map(b => parseInt(b)));

let newBoards: number[][] = [];

for (let i = 0; i < boards.length; i += 5) {
    let currentBoard = [];
    for (let j = i; j < i + 5; j++) {
        for (const eachNum of boards[j]) {
            currentBoard.push(eachNum);
        }
    }
    newBoards.push(currentBoard);
}

const doesBoardWin = (board: number[]): boolean => {
    // check rows
    let start = 0;
    for (let i = 0; i < 5; i++) {
        if (
            board[start] +
                board[start + 1] +
                board[start + 2] +
                board[start + 3] +
                board[start + 4] ===
            -5
        ) {
            return true;
        }
        start += 5;
    }
    start = 0;
    for (let i = 0; i < 5; i++) {
        if (
            board[start] +
                board[start + 5] +
                board[start + 10] +
                board[start + 15] +
                board[start + 20] ===
            -5
        ) {
            return true;
        }
        start += 1;
    }

    return false;
};

const solvePart1 = (luckyNumbers: number[], newBoards: number[][]) => {
    for (let currentNumber of luckyNumbers) {
        for (let i = 0; i < newBoards.length; i++) {
            for (let j = 0; j < newBoards[i].length; j++) {
                if (newBoards[i][j] === currentNumber) {
                    newBoards[i][j] = -1;
                }
                // if win
                if (doesBoardWin(newBoards[i])) {
                    let remainingSum = 0;
                    for (let number of newBoards[i]) {
                        if (number === -1) {
                            continue;
                        }
                        remainingSum += number;
                    }
                    return currentNumber * remainingSum;
                }
            }
        }
    }
    return -1;
};

console.log(solvePart1(luckyNumbers, newBoards));
