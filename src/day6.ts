import * as fs from "fs";

const fishLives = fs
    .readFileSync("src/inputs/day6.txt", { encoding: "utf-8" })
    .split(",")
    .map(x => parseInt(x));

const updateFishLives = (fishLives: number[]): number[] => {
    let newFishLives = fishLives;
    let newBirths = 0;
    for (let i = 0; i < fishLives.length; i++) {
        if (fishLives[i] === 0) {
            newFishLives[i] = 6;
            newBirths += 1;
            continue;
        }
        newFishLives[i] -= 1;
    }
    for (let i = 0; i < newBirths; i++) {
        newFishLives.push(8);
    }
    return newFishLives;
};

const solvePart1 = (fishLives: number[]): number => {
    let newFishLives = fishLives;
    for (let i = 0; i < 80; i++) {
        newFishLives = updateFishLives(newFishLives);
    }
    return newFishLives.length;
};

console.log(solvePart1(fishLives));
