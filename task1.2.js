const fs = require("fs");
const csv = require("csvtojson");
const { pipeline } = require("node:stream");
const es = require("event-stream");

if (fs.existsSync("nodejs-hw1-ex1.txt")) {
  fs.unlinkSync("nodejs-hw1-ex1.txt");
}

const readStream = fs.createReadStream("./nodejs-hw1-ex1.csv");
const writeStream = fs.createWriteStream("./nodejs-hw1-ex1.txt");

pipeline(
  csv().fromStream(readStream),
  es.split(),
  es.mapSync(function (line) {
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
