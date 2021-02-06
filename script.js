const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const cellSize = 20;
const cols = 20;
const rows = 20;
canvas.width = cellSize * rows;
canvas.height = cellSize * cols;

const squareColor = "#f1ffff";
const outlineColor = "#888";
const barrierColor = "purple";
const checkedSquare = "#b3e6ff";
const pathSquare = "#005580";

// TOOL SELECTED FUNCTIONALITY ??
let toolSelected = {
  drawBarrier: true,
  eraseBarrier: false,
  pointA: false,
  pointB: false
}

// HARD CODE A and B (TEMP CODE) ////
const squareA = [cols/2, 1];
const squareB = [cols/2, rows-2];

// Cell CLASS CREATOR ////////////////////////
class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY }
    this.color = squareColor
    this.barrierColor = barrierColor
    this.isBarrier = false
    this.score = 0
// Checks if current Cell is A or B and sets true or false
    squareA[0] == posY && squareA[1] == posX ? 
      this.isA = true : this.isA = false   // <-- Best way to set A and B?
    squareB[0] == posY && squareB[1] == posX ? 
      this.isB = true : this.isB = false
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
    // Colours cell appropriately
    if (this.isA) {
      context.fillStyle = "#66ccff"; // <-- change how colour is applied
    } else if (this.isB) {
      context.fillStyle = "green";
    } else if (this.isBarrier) {
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

// <-- Create GRID on screen //////////////////
let cellGrid = new Array(cols); // y

for (let i = 0; i < cellGrid.length; i++) {
  cellGrid[i] = new Array(rows); // x
  for (let j = 0; j < rows; j++) {
    cellGrid[i][j] = new Cell(i, j);
    cellGrid[i][j].drawCell(i, j);
  }
}

///// DRAW BARRICADES //////////////////////////////
let mX, mY; //position mouseX and mouseY GLOBAL
let isHolding = false;

function mousePositionOnCanvas () { // SETS MOUSE POSITION
  canvas.onmousemove = function(e) {
    mX = Math.floor(e.offsetX/cellSize);
    mY = Math.floor(e.offsetY/cellSize);
  }
}
mousePositionOnCanvas();

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

// PATH FINDER FUNCTION ////////////
// from SquareA(or start?)
  // find direction to SquareB
  // check if squares in that direction are free
  // if (square are available | isBarrier == false) {
    // move to that square
    // set square to pathSquare
  // } else {
    // check other next best square
    // if that's available move there
    // else go back along along route to next available square
  // }

  // allocate score to each square based on dx/dy when compared with its position/squareB pos

const findPath = () => {
  // find direction of squareB
  let currentCell = cellGrid[squareA[0]][squareA[1]];
  let finalCell = cellGrid[squareB[0]][squareB[1]];
  let availableSquares = [];

  let dx = finalCell.position.x - currentCell.position.x;
  let dy = finalCell.position.y - currentCell.position.y;

  // check surrounding squares
  for (let i = -1; i <= 1; i++) {
    currentCell[0 + i, 1].isBarrier;

  }
}

findPath();