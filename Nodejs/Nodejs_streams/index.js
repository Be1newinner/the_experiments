const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const inputFilePath = path.join(__dirname, "data.csv");
const outputFilePath = path.join(__dirname, "output.json");
const filteredCsvPath = path.join(__dirname, "filtered-data.csv");

const csvWriter = createCsvWriter({
  path: filteredCsvPath,
  header: [
    { id: "name", title: "Name" },
    { id: "age", title: "Age" },
    { id: "email", title: "Email" },
  ],
});

const transformData = (data) => {
  return data.age >= 18 ? data : null;
};

const readStream = fs.createReadStream(inputFilePath);
const filteredCsvWriteStream = fs.createWriteStream(filteredCsvPath, {
  flags: "a",
});

readStream
  .pipe(csv())
  .on("data", (data) => {
    const transformedData = transformData(data);
    if (transformedData) {
      csvWriter
        .writeRecords([transformedData])
        .then(() =>
          console.log(`Written record: ${JSON.stringify(transformedData)}`)
        );
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  })
  .on("error", (err) => {
    console.error("Error processing CSV file:", err);
  });

const jsonWriteStream = fs.createWriteStream(outputFilePath, { flags: "w" });

readStream
  .pipe(csv())
  .on("data", (data) => {
    const transformedData = transformData(data);
    if (transformedData) {
      jsonWriteStream.write(JSON.stringify(transformedData) + "\n");
    }
  })
  .on("end", () => {
    jsonWriteStream.end();
    console.log("Data has been written to output.json");
  })
  .on("error", (err) => {
    console.error("Error processing CSV file:", err);
  });
