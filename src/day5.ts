import * as fs from "fs";

const input = fs
    .readFileSync("src/inputs/day5.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(x => x)
    .map(x => x.split("->"));

const parts = input.map(x => x.map(y => y.split(",").map(x => parseInt(x))));

interface Cordinate {
    x: number;
    y: number;
}

let cordinateCount = new Map<string, number>();
for (const part of parts) {
    const startCor: Cordinate = { x: part[0][0], y: part[0][1] };
    const endCor: Cordinate = { x: part[1][0], y: part[1][1] };

    if (startCor.x === endCor.x) {
        let yMin = 0;
        let yMax = 0;
        if (startCor.y > endCor.y) {
            yMax = startCor.y;
            yMin = endCor.y;
        } else {
            yMax = endCor.y;
            yMin = startCor.y;
        }
        for (let Y = yMin; Y <= yMax; Y++) {
            const currCor: Cordinate = { x: startCor.x, y: Y };
            const currCorString = `${currCor.x}, ${currCor.y}`;
            const oldOverlap: any = cordinateCount.get(currCorString) ?? 0;
            cordinateCount.set(currCorString, oldOverlap + 1);
        }
    } else if (startCor.y === endCor.y) {
        let xMin = 0;
        let xMax = 0;
        if (startCor.x > endCor.x) {
            xMax = startCor.x;
            xMin = endCor.x;
        } else {
            xMax = endCor.x;
            xMin = startCor.x;
        }
        for (let X = xMin; X <= xMax; X++) {
            const currCor: Cordinate = { x: X, y: startCor.y };
            const currCorString = `${currCor.x}, ${currCor.y}`;
            const oldOverlap: any = cordinateCount.get(currCorString) ?? 0;
            cordinateCount.set(currCorString, oldOverlap + 1);
        }
    }
}

let answer = 0;
for (const val of cordinateCount.values()) {
    if (val >= 2) {
        answer += 1;
    }
}
console.log(`The answer is ${answer}`);
