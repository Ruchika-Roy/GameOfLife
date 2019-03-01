const width = 40;
const height = 25; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */
const coordinize = i => {
  const row = Math.floor(i / gol.width);
  const col = i % gol.width;
  return [row, col];
};

const paint = () => {
  tds.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    if (gol.getCell(row, col) === 1) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove("alive");
    }
  });
};

/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  const target = event.target;
  const row = target.dataset.row;
  const col = target.dataset.col;
  gol.toggleCell(row, col);
  paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  gol.tick();
  paint();
});

document.getElementById("play_btn").addEventListener("click", event => {
  setInterval(() => {
    gol.tick();
    paint();
  }, 1000);
});

document.getElementById("random_btn").addEventListener("click", event => {
  tds.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const val = Math.floor(Math.random() * 2);
    gol.setCell(val, row, col);
  });
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  tds.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    gol.setCell(0, row, col);
  });
  paint();
});
const gliderULC = [[1, 0, 1], [0, 1, 1], [0, 1, 0]];
const gliderURC = [[0, 0, 1], [1, 1, 0], [0, 1, 1]];
const gliderLLC = [[1, 1, 0], [0, 1, 1], [1, 0, 0]];
const gliderLRC = [[1, 0, 1], [1, 1, 0], [0, 1, 0]];
const gliders = [gliderULC, gliderURC, gliderLLC, gliderLRC];

document.getElementById("shapes-btn").addEventListener("click", event => {
  gol.setCell(1, 0, 0);
  gol.setCell(0, 0, 1);
  gol.setCell(1, 0, 2);
  gol.setCell(0, 0, 3);
  gol.setCell(0, 0, 4);
  gol.setCell(0, 1, 0);
  gol.setCell(1, 1, 1);
  gol.setCell(1, 1, 2);
  gol.setCell(0, 1, 3);
  gol.setCell(0, 1, 4);
  gol.setCell(0, 2, 0);
  gol.setCell(1, 2, 1);
  gol.setCell(0, 2, 2);
  gol.setCell(0, 2, 3);
  gol.setCell(0, 2, 4);
  gol.setCell(0, 3, 0);
  gol.setCell(0, 3, 1);
  gol.setCell(0, 3, 2);
  gol.setCell(0, 3, 4);
  gol.setCell(0, 4, 0);
  gol.setCell(0, 4, 1);
  gol.setCell(0, 4, 2);
  gol.setCell(0, 4, 3);
  gol.setCell(0, 4, 4);
  paint();
});
