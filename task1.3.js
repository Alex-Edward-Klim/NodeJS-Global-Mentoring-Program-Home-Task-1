import { existsSync, unlinkSync, createReadStream, createWriteStream } from "fs";
import csv from "csvtojson";
import { pipeline } from "node:stream";
import { split, mapSync } from "event-stream";

if (existsSync("nodejs-hw1-ex1.txt")) {
  unlinkSync("nodejs-hw1-ex1.txt");
}

const readStream = createReadStream("./nodejs-hw1-ex1.csv");
const writeStream = createWriteStream("./nodejs-hw1-ex1.txt");

pipeline(
  csv().fromStream(readStream),
  split(),
  mapSync(function (line) {
    readStream.pause();

    if (line.length > 0) {
      writeStream.write(line + "\n");
    }

    readStream.resume();
  }),
  (err) => {
    if (err) {
      console.error("Error: ", err);
    }
  }
);
