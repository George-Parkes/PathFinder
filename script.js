// FIND PATH when MOUSE CLICK on START BUTTON
startButton.addEventListener('mouseup', e => {
  let q = 0;
  do {
    
    if (stack.length > 2 && positiveVector()) {
      if (checkForQuickerRoute()) console.log("quicker route available");
    }
    findPath();
    q++
  } while (!mazeComplete);

});