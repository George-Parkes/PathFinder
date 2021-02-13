// MOUSE DOWN
canvas.addEventListener('mousedown', e => {
  mouseClicked = true;
    cellGrid[mY][mX].isBarrier = true;
    cellGrid[mY][mX].drawCell();
});
// MOUSE MOVE
canvas.addEventListener('mousemove', e => {
  if (mouseClicked === true) {
    cellGrid[mY][mX].isBarrier = true;
    cellGrid[mY][mX].drawCell();
  }
});
// MOUSE UP
canvas.addEventListener('mouseup', e => {
  if (mouseClicked === true) {
    cellGrid[mY][mX].isBarrier = true;
    cellGrid[mY][mX].drawCell();
    mouseClicked = false;
  }
});