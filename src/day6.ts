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
const solvePart2 = (fishLives: number[]): number => {
    let fish: number[] = fishLives;
    const lanternfishSchool: any = {};
    for (let i = 0; i < 9; i++) {
        lanternfishSchool[i] = 0;
    }
    fish.forEach(fishTimer => {
        lanternfishSchool[fishTimer]++;
    });

    return numberAfterDays(lanternfishSchool, 256);
};

function grow(schoolObj: any) {
    const tempZero = schoolObj[0];
    for (let i = 0; i < 8; i++) {
        schoolObj[i] = schoolObj[i + 1];
    }
    schoolObj[8] = tempZero;
    schoolObj[6] += tempZero;
}
function numberAfterDays(schoolObj: any, days: any): any {
    const schoolCopy = { ...schoolObj };
    for (let i = 0; i < days; i++) {
        grow(schoolCopy);
    }
    return Object.values(schoolCopy).reduce(
        (accu: any, curr: any) => accu + curr
    );
}
// console.log(solvePart1(fishLives));
console.log(solvePart2(fishLives));
