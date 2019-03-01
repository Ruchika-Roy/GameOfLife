class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    let arrayBoard = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(0);
      }
      arrayBoard.push(row);
    }
    return arrayBoard;
  }
  getCell(row, col) {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return 0;
    }
    return this.board[row][col];
  }
  setCell(val, row, col, board = this.board) {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return 0;
    }
    board[row][col] = val;
  }

  toggleCell(row, col) {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return 'hello';
    }
    if (this.getCell(row, col) === 0) {
      this.setCell(1, row, col);
    }
    else {
      this.setCell(0, row, col);
    }
  }
  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    let sum = 0;
    sum += this.getCell(row - 1, col - 1);
    sum += this.getCell(row - 1, col);
    sum += this.getCell(row - 1, col + 1);
    sum += this.getCell(row, col - 1);
    sum += this.getCell(row, col + 1);
    sum += this.getCell(row + 1, col - 1);
    sum += this.getCell(row + 1, col);
    sum += this.getCell(row + 1, col + 1);
    return sum;
  }


  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    for (let i = 0; i < this.height; i++){
      for (let j = 0; j < this.width; j++){
        if (this.getCell(i, j) === 0){
          if (this.livingNeighbors(i, j) === 3){
            this.setCell(1, i, j, newBoard);
          }
        } else if (this.livingNeighbors(i, j) === 2 || this.livingNeighbors(i, j) === 3) {
            this.setCell(1, i, j, newBoard);
        }
      }
    }


    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    this.board = newBoard;
  }
}
