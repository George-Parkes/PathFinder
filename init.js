const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

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

let mX, mY; //position mouseX and mouseY GLOBAL
let mouseClicked = false;

// HARD CODE A and B (TEMP CODE) ////
const squareACoordinates = [cols/2, 1];
const squareBCoordinates = [cols/2, rows-2];

// <-- CREATE GRID //////////////////
let cellGrid = new Array(cols); // y
for (let i = 0; i < cellGrid.length; i++) {
  cellGrid[i] = new Array(rows); // x
  for (let j = 0; j < rows; j++) {
    cellGrid[i][j] = new Cell(i, j);
    cellGrid[i][j].drawCell(i, j);
  }
}

// INIT VARIABLES ONCE GRID IS MADE – FOR PATHFINDER
let stack = [];
let mazeComplete = false;
let squareA = cellGrid[squareACoordinates[0]][squareACoordinates[1]];
let squareB = cellGrid[squareBCoordinates[0]][squareBCoordinates[1]];
let currentCell;
let pathFound = false;

mousePositionOnCanvas();
checkIfStackIsEmpty(); // <-- checks if at beginning or back to start