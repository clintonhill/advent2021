const fs = require("fs");
const ACTUAL = 1;

class Card {
  constructor(boardString) {
    this.board = this.createBoard(boardString);
    this.winningNums = [];
  }

  breakColumns(row) {
    const rows = [];
    for (let i = 0; i < row.length; i += 3) {
      rows.push(Number(row.slice(i, i + 2)));
    }
    return rows;
  }

  createBoard(boardString) {
    const boardArr = [];
    const rows = boardString.split("\r\n");
    for (const row of rows) {
      boardArr.push(this.breakColumns(row));
    }
    return boardArr;
  }

  checkForRowWin(numbers) {
    const window = numbers;
    for (const row of this.board) {
      console.log("Comparing", window, "to", row);
      if (row.every((num) => window.includes(num))) {
        this.winningNums = row;
        this.markedNums = numbers;
        return true;
      }
    }
    return false;
  }

  checkForColWin(numbers) {
    //Invert the rows
    let cols = [];
    for (let idx = 0; idx < this.board.length; idx++) {
      const col = [];
      for (let i = 0; i < this.board.length; i++) {
        const row = this.board[i];
        col.push(row[idx]);
      }
      cols.push(col);
    }
    return this.checkForRowWin(numbers);
  }

  checkForWin(numbers) {
    return this.checkForRowWin(numbers) || this.checkForColWin(numbers);
  }

  calculateWin() {
    console.log(this.board.flat(2));
    return (
      this.board.flat(2).reduce((accum, el) => {
        if (!this.markedNums.includes(el)) {
          return (accum += el);
        } else return accum;
      }, 0) * this.markedNums[this.markedNums.length - 1]
    );
  }
}

const file = ACTUAL == 1 ? "actual_input.txt" : "sample_input.txt";

const main = (input) => {
  const arr = input.split("\r\n\r\n");
  const numQueue = arr[0].split(",").map((n) => +n);
  const cards = [];

  for (let i = 1; i < arr.length; i++) {
    cards.push(new Card(arr[i]));
  }
  for (let j = 5; j < numQueue.length; j++) {
    for (let cardIdx = 0; cardIdx < cards.length; cardIdx++) {
      const card = cards[cardIdx];
      const window = numQueue.slice(0, j);
      if (card.checkForWin(window)) {
        console.log(
          "Card #",
          cardIdx + 1,
          "wins. Winning Numbers:",
          card.winningNums
        );
        console.log(card.calculateWin());
        return;
      }
    }
  }
};

fs.readFile(`./${file}`, (err, data) => {
  if (err) throw err;

  main(data.toString());
});
