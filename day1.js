const fs = require("fs");
const ACTUAL = 1;

const file = ACTUAL == 1 ? "actual_input.txt" : "sample_input.txt";

const main = (input) => {
  let count = 0;
  const inputArr = input.split("\r\n").map((e) => +e);
  console.log(inputArr);
  for (let i = 0; i < inputArr.length; i += 1) {
    const A = [inputArr[i], inputArr[i - 1], inputArr[i - 2]];
    const B = [inputArr[i + 1], inputArr[i], inputArr[i - 1]];
    if (B.reduce((a, num) => num + a) > A.reduce((a, num) => num + a)) count++;
  }
  return count;
};

fs.readFile(`./${file}`, (err, data) => {
  if (err) throw err;

  console.log(main(data.toString()));
});
