var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// <-- CREATE Canvas grid with clickable tiles

const squareColor = "yellow";
const barrierColor = "purple";
const outlineColor = "black";
let cellSize = 20;
const cols = 20;
const rows = 20;
let isHolding = false;

// May need function here to switch TRUE selected tool?
let toolSelected = {
  drawBarrier: true,
  eraseBarrier: false,
  pointA: false,
  pointB: false
}

canvas.width = cellSize * rows;
canvas.height = cellSize * cols;

// Cell CLASS
class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY }
    this.color = squareColor
    this.barrierColor = barrierColor
    this.isBarrier = false
  }
  drawCell() {
    // Draw a cell in the grid
    context.beginPath();
    context.clearRect(       // < -- do I need this?
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize);
    context.rect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize);
    if (this.isBarrier) {
      context.fillStyle = this.barrierColor;
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

if (toolSelected.drawBarrier) {
  let mX, mY; //position mouseX and mouseY

  canvas.addEventListener('mousedown', e => {
    mX = e.offsetX;
    mY = e.offsetY;
    isHolding = true;

    cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].isBarrier = true;
    cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].drawCell();
  });

  canvas.addEventListener('mousemove', e => {
    if (isHolding === true) {
      cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].isBarrier = true;
      cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].drawCell();
      mX = e.offsetX;
      mY = e.offsetY;
    }
  });

  canvas.addEventListener('mouseup', e => {
    if (isHolding === true) {
      cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].isBarrier = true;
      cellGrid[Math.floor(mY/cellSize)][Math.floor(mX/cellSize)].drawCell();
      isHolding = false;
    }
  });
}