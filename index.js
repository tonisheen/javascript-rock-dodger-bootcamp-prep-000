const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;    // The DODGER is 40 pixels wide

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;    // The rock is 20 pixel's wide

    var collided = (
      ((rockLeftEdge < dodgerLeftEdge) && 
      (rockRightEdge > dodgerLeftEdge))
      ||
      ((rockLeftEdge > dodgerLeftEdge) &&
      (rockRightEdge < dodgerRightEdge))
      ||
      ((rockLeftEdge < dodgerRightEdge) &&
      (rockRightEdge > dodgerRightEdge))
      );
      
    return collided;
  }
  
  return;
}

function createRock(x) {
  var top = 0;
  
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = `${top}px`;

  function moveRock() {
    
    if (checkCollision(rock)) { endGame() }
    if (top === 380) { rock.remove(); return; }
    
    top += 2;
    rock.style.top = `${top}px`;
    
    moveRock();
  }

  const rockMoveInterval = setInterval(moveRock, 2000);

  ROCKS.push(rock);
  
  return rock;
}

function endGame() {
  gameInterval = null;
  for (var rock in ROCKS) { rock.remove() }
  document.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
