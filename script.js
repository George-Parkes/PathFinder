var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const cellSize = 20;
const cols = 20;
const rows = 20;

const squareColor = "yellow";
const barrierColor = "purple";
const outlineColor = "black";

// May need function here to switch TRUE selected tool?
let toolSelected = {
  drawBarrier: true,
  eraseBarrier: false,
  pointA: false,
  pointB: false
}

canvas.width = cellSize * rows;
canvas.height = cellSize * cols;

// HARD CODE A and B (temp)
const squareA = [cols/2, 1];
const squareB = [cols/2, rows-1];

// Cell CLASS
class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY }
    this.color = squareColor
    this.barrierColor = barrierColor
    this.isBarrier = false

    if (squareA[0] == posY && squareA[1] == posX) {
      this.isA = true;
    } else {
      this.isA = false   // <-- Best way to set A and B?
    }
    this.isB = false
  }
  drawCell() {
    // Draw a cell in the grid
    context.beginPath();
    context.clearRect(       // <-- do I need this?
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize);
    context.rect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize);
    if (this.isBarrier) {
      context.fillStyle = this.barrierColor;
    } else if (this.isA) {
      context.fillStyle = "blue";
    } else {
      context.fillStyle = this.color;
    }
    context.fill();
    context.strokeStyle= outlineColor;
    context.strokeRect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize)
    context.closePath();
  }
}

// <-- Create GRID
let cellGrid = new Array(cols); // y

for (let i = 0; i < cellGrid.length; i++) {
  cellGrid[i] = new Array(rows); // x
  for (let j = 0; j < rows; j++) {
    cellGrid[i][j] = new Cell(i, j);
    cellGrid[i][j].drawCell(i, j);
  }
}

let mX, mY; //position mouseX and mouseY GLOBAL
let isHolding = false;

function mousePositionOnGrid () { // SETS MOUSE POSITION
  canvas.onmousemove = function(e) {
    mX = Math.floor(e.offsetX/cellSize);
    mY = Math.floor(e.offsetY/cellSize);
  }
}
mousePositionOnGrid();

if (toolSelected.drawBarrier) { // <-- DRAW BARRIER
  // MOUSE DOWN
  canvas.addEventListener('mousedown', e => {
    isHolding = true;
      cellGrid[mY][mX].isBarrier = true;
      cellGrid[mY][mX].drawCell();
  });
  // MOUSE MOVE
  canvas.addEventListener('mousemove', e => {
    if (isHolding === true) {
      cellGrid[mY][mX].isBarrier = true;
      cellGrid[mY][mX].drawCell();
    }
  });
  // MOUSE UP
  canvas.addEventListener('mouseup', e => {
    if (isHolding === true) {
      cellGrid[mY][mX].isBarrier = true;
      cellGrid[mY][mX].drawCell();
      isHolding = false;
    }
  });
}