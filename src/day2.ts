import * as fs from "fs";

interface Instruction {
    direction: string;
    amount: number;
}

const convertToInstruction = (instruction: string): Instruction => {
    const line: string[] = instruction.split(" ");
    const result: Instruction = {
        direction: line[0],
        amount: parseInt(line[1]),
    };
    return result;
};

const plannedCourse: Instruction[] = fs
    .readFileSync("src/inputs/day2.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(x => x)
    .map(line => convertToInstruction(line));

let horizontalPos: number = 0;
let verticalPos: number = 0;

for (let i = 0; i < plannedCourse.length; i++) {
    const currentCourse: Instruction = plannedCourse[i];
    switch (currentCourse.direction) {
        case "forward":
            horizontalPos += currentCourse.amount;
            break;
        case "up":
            verticalPos -= currentCourse.amount;
            break;
        case "down":
            verticalPos += currentCourse.amount;
            break;
    }
}

const finalAnswer: number = horizontalPos * verticalPos;

console.log(finalAnswer);

let aim: number = 0;
let horizontalPos2: number = 0;
let verticalPos2: number = 0;

for (let i = 0; i < plannedCourse.length; i++) {
    const currentCourse: Instruction = plannedCourse[i];
    switch (currentCourse.direction) {
        case "forward":
            horizontalPos2 += currentCourse.amount;
            verticalPos2 += aim * currentCourse.amount;
            break;
        case "up":
            aim -= currentCourse.amount;
            break;
        case "down":
            aim += currentCourse.amount;
            break;
    }
}

const finalAnswer2: number = horizontalPos2 * verticalPos2;

console.log(finalAnswer2);
