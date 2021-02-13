function getVectorArrow(vector) {
  // let vectorDirection = {
  //   x: 0,
  //   y: 0
  // }
  // if (vector[0] > 0) { vectorDirection.y = 1 }
  // else if (vector[0] < 0) { vectorDirection.y = -1 }
  // else { vectorDirection.y = 0 }

  // if (vector[1] > 0) { vectorDirection.x = 1 }
  // else if (vector[1] < 0) { vectorDirection.x = -1 }
  // else { vectorDirection.x = 0 }

  let vectorIntensity = Math.abs(vector[0]) + Math.abs(vector[1]);
  return vectorIntensity
}

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

function backTrack() {
      currentCell.color = "yellow";
      currentCell.drawCell();
      stack.pop();
      setCurrentCell();
}

const selectNextCell = (currentCell, vectortoB) => {
  let availableCells = checkAvailableCells(currentCell);

  if (availableCells.length === 0) { // <-- check for deadends
    do {
      backTrack();
      availableCells = checkAvailableCells(currentCell);
    } while (availableCells.length == 0);
  }
  // returns the cell with the shortest vector
  let availableCellVectors = [];
  for (let i = 0; i < availableCells.length; i++) {
    let vector = getVector(availableCells[i], squareB);

    // FIX at the moment finds lowest and treats same, when it should recognise direction
    let vectorArrow = getVectorArrow(vector); // <-- needs to prioritise here
    availableCellVectors.push(vectorArrow);
    // FIX
  }
  let lowestVector = Math.min(...availableCellVectors);
  let nextCell = availableCells[availableCellVectors.indexOf(lowestVector)];
  return nextCell;
}

function checkIfStackIsEmpty() {
  if (stack.length == 0) {
    stack.push(squareA);
  }
}

function setCurrentCell() {
  currentCell = stack[stack.length-1];
}

function mousePositionOnCanvas () { // SETS MOUSE POSITION
  canvas.onmousemove = function(e) {
    mX = Math.floor(e.offsetX/cellSize);
    mY = Math.floor(e.offsetY/cellSize);
  }
}

// win check
function reachedTheEnd(nextCell, squareB) {
  if (nextCell.position.x == squareB.position.x &&
      nextCell.position.y == squareB.position.y) {
      mazeComplete = true
    return true;
  } else {
    return false;
  }
}

const positiveVector = () => {
  let vectorToB = getVector(currentCell, squareB);
  let previousVectorToB = getVector(stack[stack.length-1], squareB);

  if (Math.abs(vectorToB[0]) > Math.abs(previousVectorToB[0]) ||
      Math.abs(vectorToB[1]) > Math.abs(previousVectorToB[1])) {
    return false;
  }
  return true;
}

const checkForQuickerRoute = () => {
  // draw straight line and see if it lines up with stack
  for (let i = 0; i < stack.length-2; i++) {
    let vector = getVector(currentCell, stack[i]);
    console.log(vector);

    if (vector[1] == 0) {
      for (let i = 0; i < vector[0]; i++) {
        if (cellGrid[currentCell.position.y][currentCell.position.x + i].isBarrier ||
            cellGrid[currentCell.position.y][currentCell.position.x + i].visited) {
          return false;
        }
      }
      return true;
    }
    if (vector[0] == 0) {
      for (let i = 0; i > vector[1]; i++) {
        if (cellGrid[currentCell.position.y + i][currentCell.position.x].isBarrier ||
            cellGrid[currentCell.position.y + i][currentCell.position.x].visited) {
          return false;
        }
      }
      return true;
    }
  }
}

const findPath = () => {

  setCurrentCell();
  let vectorToB = getVector(currentCell, squareB);
  let nextCell = selectNextCell(currentCell, vectorToB);

  // Completion check
  if (!reachedTheEnd(nextCell, squareB)) {
    currentCell.visited = true;
    stack.push(nextCell);
    nextCell.color = pathSquare;
    nextCell.drawCell();
  } else {
    console.log("congratulations!");
    pathFound = true;
  }
}