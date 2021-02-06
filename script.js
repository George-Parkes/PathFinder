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
const squareACoordinates = [cols/2, 1];
const squareBCoordinates = [cols/2, rows-2];

// Cell CLASS CREATOR ////////////////////////
class Cell {
  constructor(posY, posX) {
    this.position = { x: posX, y: posY }
    this.color = squareColor
    this.barrierColor = barrierColor
    this.isBarrier = false
    this.visited = false;
// Checks if current Cell is A or B and sets true or false
    squareACoordinates[0] == posY && squareACoordinates[1] == posX ? 
      this.isA = true : this.isA = false   // <-- Best way to set A and B?
    squareBCoordinates[0] == posY && squareBCoordinates[1] == posX ? 
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

if (toolSelected.drawBarrier) { // <-- DRAW BARRIER TOOL
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

// PATH FINDER FUNCTIONS ////////////

// Get Vector to B
const getVector = (currentCell, finalCell) => {
  let dx = finalCell.position.x - currentCell.position.x;
  let dy = finalCell.position.y - currentCell.position.y;

  // <-- Add functionality to detect line of sight
  return [dx, dy];
}

// checks and returns available cells
const checkAvailableCells = (currentCell) => {
  let x = currentCell.position.x, y = currentCell.position.y;
  let availableCellsArray = [];

  for (let i = -1; i <= 1; i=i+2) { // <-- better way to write this??
    if (cellGrid[y+i][x].isBarrier == false && // <-- Make sure this doesn't check off the grid
        cellGrid[y+i][x].visited == false) {
      availableCellsArray.push(cellGrid[y+i][x]);
    }
    if (cellGrid[y][x+i].isBarrier == false &&
        cellGrid[y][x+i].visited == false) {
          availableCellsArray.push(cellGrid[y][x+i]);
    }
  }
  return availableCellsArray;
}

const selectNextCell = (currentCell, vectortoB) => {
  let availableCells = checkAvailableCells(currentCell);

  if (availableCells.length === 0) {

  } else if (availableCells.length === 1) {

  } else {
    // returns the cell with the shortest vector
    let availableCellVectors = [];
    for (let i = 0; i < availableCells.length; i++) {
      let vectorsArr = getVector(availableCells[i], squareB);
      let vector = Math.abs(vectorsArr[0]) + Math.abs(vectorsArr[1]);
      availableCellVectors.push(vector);
    }
    let lowestVector = Math.min(...availableCellVectors);
    let nextCell = availableCells[availableCellVectors.indexOf(lowestVector)];
    return nextCell;
  }
}

function checkIfStackIsEmpty() {
  if (stack.length == 0) {
    stack.push(squareA);
  }
}

// win check
function reachedTheEnd(nextCell, squareB) {
  if (nextCell.position.x == squareB.position.x &&
      nextCell.position.y == squareB.position.y) {
    return true;
  } else {
    return false;
  }
}

// INIT VARIABLES FOR PATHFINDER
let stack = [];
let squareA = cellGrid[squareACoordinates[0]][squareACoordinates[1]];
let squareB = cellGrid[squareBCoordinates[0]][squareBCoordinates[1]];
let currentCell;

checkIfStackIsEmpty(); // <-- checks if at beginning or back to start

const findPath = () => {

  let currentCell = stack[stack.length-1];
  let vectorToB = getVector(currentCell, squareB);
  let nextCell = selectNextCell(currentCell, vectorToB);

  // Completion check
  if (!reachedTheEnd(nextCell, squareB)) {
    stack.push(nextCell);
    nextCell.color = pathSquare;
    nextCell.drawCell();
  } else {
    console.log("congratulations!")
  }
}

// Search Loop
let q = 0;
do {
  findPath();
  q++
} while (q < 20);

/*/ TO DO NEXT
  - add start button
  - path finder needs to acknowledge barriers
*/