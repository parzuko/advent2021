import * as fs from "fs";

const reports: string[][] = fs
    .readFileSync("src/inputs/day3.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(x => x)
    .map(x => x.split(""));

const getGammaEpsilon = (reports: string[][]): number => {
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
    return answer;
};

const reduceList = (
    reports: string[][],
    currentIndex: number,
    isOxygen: boolean
): string[][] => {
    const rows = reports.length;
    let majorityNumber = "0";
    let minorityNumber = "1";
    if (isOxygen) {
        majorityNumber = "1";
        minorityNumber = "0";
    }

    let numberOfZeroes = 0;
    let numeberOfOnes = 0;
    for (let i = 0; i < rows; i++) {
        const currentBit = reports[i][currentIndex];
        if (currentBit === "0") {
            numberOfZeroes += 1;
        } else {
            numeberOfOnes += 1;
        }
    }
    if (numeberOfOnes >= numberOfZeroes) {
        let newReports = reports.filter(
            binaryNumber => binaryNumber[currentIndex] === majorityNumber
        );
        return newReports;
    } else {
        let newReports = reports.filter(
            binaryNumber => binaryNumber[currentIndex] === minorityNumber
        );
        return newReports;
    }
};

const getGasRating = (reports: string[][], isOxygen: boolean): string => {
    let newReports = reports;
    const binLength = reports[0].join().length;
    for (let i = 0; i < binLength; i++) {
        newReports = reduceList(newReports, i, isOxygen);
        if (newReports.length === 1) {
            const binString = newReports[0].join("");
            return binString;
        }
    }
    const binString = newReports[0].join("");
    return binString;
};

const getCarbonOxy = (reports: string[][]) => {
    const oxyRating = getGasRating(reports, true);
    const carbonRating = getGasRating(reports, false);

    const answer = parseInt(oxyRating, 2) * parseInt(carbonRating, 2);
    return answer;
};

const run = () => {
    const answerPart1 = getGammaEpsilon(reports);
    const answerPart2 = getCarbonOxy(reports);

    console.log("Answer to part 1 is", answerPart1);
    console.log("Answer to part 2 is", answerPart2);
};

run();
