const fs = require("fs");
const ACTUAL = 0;

const file = ACTUAL == 1 ? "actual_input.txt" : "sample_input.txt";

const main = (input) => {
  const arr = input.split("\r\n");
};

fs.readFile(`./${file}`, (err, data) => {
  if (err) throw err;

  main(data.toString());
});
