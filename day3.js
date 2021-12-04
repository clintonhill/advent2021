const fs = require("fs");
const ACTUAL = 1;

const file = ACTUAL == 1 ? "actual_input.txt" : "sample_input.txt";

// const main = (input) => {
//   const arr = input.split("\r\n");
//   const ones = new Array(arr[0].split("").length).fill(0);

//   for (let i = 0; i < arr.length; i++) {
//     const row = arr[i].split("").map((el) => +el);
//     // console.log(row);
//     for (let j = 0; j < row.length; j++) {
//       if (row[j]) ones[j]++;
//     }
//   }
//   const zeros = ones.map((el) => arr.length - el);
//   //   console.log("ONES: ", ones);
//   //   console.log("ZEROS: ", zeros);

//   const gamma = ones.map((el, i) => (el > zeros[i] ? 1 : 0));
//   const epsilon = gamma.map((el) => (el == 1 ? 0 : 1));

//   const powerConsumption =
//     parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
//   //   console.log("EPSILON:", epsilon);

//   console.log(powerConsumption);
// };

const getMostActiveNumber = (arr, index) => {
  const ones = new Array(arr[0].split("").length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i].split("").map((el) => +el);
    // console.log(row);
    for (let j = 0; j < row.length; j++) {
      if (row[j]) ones[j]++;
    }
  }
  const zeros = ones.map((el) => arr.length - el);

  return ones[index] >= zeros[index] ? 1 : 0;
};

const getLeastActiveNumber = (arr, index) => {
  const ones = new Array(arr[0].split("").length).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const row = arr[i].split("").map((el) => +el);
    // console.log(row);
    for (let j = 0; j < row.length; j++) {
      if (row[j]) ones[j]++;
    }
  }
  const zeros = ones.map((el) => arr.length - el);

  return ones[index] < zeros[index] ? 1 : 0;
};

const main = (input) => {
  const arr = input.split("\r\n");
  let o2gen;
  let co2Scrubber;

  //   console.log("ONES: ", ones);
  //   console.log("ZEROS: ", zeros);

  let filtered = arr;
  const numRows = arr[0].split("").length;
  for (let i = 0; i < numRows; i++) {
    const filterNumber = getMostActiveNumber(filtered, i);
    filtered = filtered.filter((row) => +row[i] === filterNumber);
  }
  o2gen = filtered;

  filtered = arr;
  for (let i = 0; i < numRows; i++) {
    if (filtered.length == 1) break;
    const filterNumber = getLeastActiveNumber(filtered, i);
    filtered = filtered.filter((row) => +row[i] === filterNumber);
  }
  co2Scrubber = filtered;
  //   console.log("O2:", o2gen);
  //   console.log("CO2:", co2Scrubber);
  console.log(parseInt(o2gen[0], 2) * parseInt(co2Scrubber[0], 2));
};

fs.readFile(`./${file}`, (err, data) => {
  if (err) throw err;

  main(data.toString());
});
