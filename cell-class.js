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
    context.strokeStyle = outlineColor;
    context.strokeRect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize, cellSize)
    context.closePath();
  }
}