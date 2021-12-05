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

const getLoserAndNumber = (
    luckyNumbers: number[],
    newBoards: number[][]
): any[] => {
    for (let currentNumber of luckyNumbers) {
        for (let index = 0; index < newBoards.length; index++) {
            for (let i = 0; i < newBoards[index].length; i++) {
                if (newBoards[index][i] === currentNumber) {
                    newBoards[index][i] = -1;
                }
                if (doesBoardWin(newBoards[index])) {
                    if (newBoards.length === 1) {
                        return [currentNumber, newBoards[0]];
                    }
                    newBoards.splice(index, 1);
                    index -= 1;
                    break;
                }
            }
        }
    }
    return [0, newBoards[0]];
};

const solvePart2 = (luckyNumbers: number[], newBoards: number[][]) => {
    const answer = getLoserAndNumber(luckyNumbers, newBoards);
    const lastNumber: number = answer[0];
    const board: number[] = answer[1];

    let remSum = 0;
    for (let num in board) {
        if (board[num] !== -1) {
            remSum += board[num];
        }
    }
    return remSum * lastNumber;
};

console.log(solvePart1(luckyNumbers, newBoards));
console.log(solvePart2(luckyNumbers, newBoards));
