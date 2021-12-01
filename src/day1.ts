import * as fs from "fs";

const measurements: number[] = fs
    .readFileSync("src/inputs/day1.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(x => x)
    .map(x => parseInt(x));

// Part 1 -> Spikes of one

let lastMeasurement: number = measurements[0];
let numberOfSpikes: number = 0;
for (let measurement of measurements) {
    if (measurement > lastMeasurement) {
        numberOfSpikes += 1;
    }
    lastMeasurement = measurement;
}

console.log(`There are a total of: ${numberOfSpikes} spikes`);

// Part 2 -> Three sum window

let lastMeasurementOfThree: number =
    measurements[0] + measurements[1] + measurements[2];

let numberOfSpikesOfThree: number = 0;

for (let i = 0; i < measurements.length; i++) {
    let currentSpike: number = 0;
    for (let j = i; j < i + 3; j++) {
        currentSpike += measurements[j];
    }
    if (currentSpike > lastMeasurementOfThree) {
        numberOfSpikesOfThree += 1;
    }
    lastMeasurementOfThree = currentSpike;
}

console.log(`There are a total of: ${numberOfSpikesOfThree} spikes of 3`);
