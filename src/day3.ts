import * as fs from "fs";

const reports: string[][] = fs
    .readFileSync("src/inputs/day3.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(x => x)
    .map(x => x.split(""));

const rows = reports.length;
const columns = reports[0].length;

let gammaRate = "";
let epsilonRate = "";

for (let x = 0; x < columns; x++) {
    let numberOfZeroes = 0;
    let numeberOfOnes = 0;
    for (let y = 0; y < rows; y++) {
        const currentBit = reports[y][x];
        if (currentBit === "0") {
            numberOfZeroes += 1;
        } else {
            numeberOfOnes += 1;
        }
    }
    if (numeberOfOnes > numberOfZeroes) {
        gammaRate += "1";
        epsilonRate += "0";
    } else {
        epsilonRate += "1";
        gammaRate += "0";
    }
}

const answer = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

console.log(answer);
