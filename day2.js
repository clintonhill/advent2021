const fs = require("fs");
const ACTUAL = true;
//const ACTUAL = false;

const file = ACTUAL == 1 ? "actual_input.txt" : "sample_input.txt";

const main = (input) => {
  const arr = input.split("\r\n");
  const pos = {
    x: 0,
    y: 0,
    aim: 0,
  };
  for (const instruction of arr) {
    let [direction, amt] = instruction.split(" ");
    amt = Number.parseInt(amt);

    //console.log("pos", pos);

    switch (direction) {
      case "forward": {
        pos.x += amt;
        pos.y += pos.aim * amt;
        break;
      }
      case "down": {
        pos.aim += amt;
        break;
      }
      case "up": {
        pos.aim -= amt;
        break;
      }
    }
  }
  return pos.x * pos.y;
};

fs.readFile(`./${file}`, (err, data) => {
  if (err) throw err;

  console.log(main(data.toString()));
});
