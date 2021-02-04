var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// <-- CREATE Canvas grid with clickable tiles

let squareColor = "yellow";
const outlineColor = "black";
let cellSize = 20;
const cols = 20;
const rows = 20;

// Cell CLASS
class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY },
    this.color = squareColor
    this.isBarrier = false
  }
  drawCell() {
    // Draw a cell in the grid
    context.beginPath();
    context.rect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle= outlineColor;
    context.strokeRect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize)
    context.closePath();
  }
}

// Create GRID
let cellGrid = new Array(cols); // y

for (let i = 0; i < cellGrid.length; i++) {
  cellGrid[i] = new Array(rows); // x
  for (let j = 0; j < rows; j++) {
    cellGrid[i][j] = new Cell(i, j);
    cellGrid[i][j].drawCell(i, j);
  }
}

// onClick CHANGE square color

// set onClick function on each square
// when clicked
  // change square color to clickedColor
  // set isBarrier to TRUE
  // clear specific Cell
  // redraw Cell