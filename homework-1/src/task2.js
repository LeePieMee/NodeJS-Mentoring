import fs from "fs";
import csv from "csvtojson";

const csvFilePath = "./static/exampleCsv.csv";
const outputFile = "./static/result.txt";

const writableStream = fs.createWriteStream(outputFile);
const readabelStream = fs.createReadStream(csvFilePath);

const errorLogger = (err) => console.log(err);

readabelStream
  .on("error", errorLogger)
  .pipe(csv())
  .pipe(writableStream)
  .on("error", errorLogger);
