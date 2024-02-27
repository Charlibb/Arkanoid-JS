const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

/* Game variables */
let counter = 0;

/* Ball Variables */
const ballRadius = 4;

// ball position
let x = canvas.width / 2;
let y = canvas.height - 30;
// ball speed
let dx = 2;
let dy = -2;

/* Paddle variable */
const paddleWidth = 50;
const paddleHeight = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.fillStyle = 'red';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}
drawPaddle();

function drawBricks() {}
function collisionDetection() {}
function ballMovement() {
  //side wall bounce ball
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  //upper wall bounce ball
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  // Game over
  if (y + dy > canvas.height - ballRadius) {
    console.log('Game Over!');
    document.location.reload();
  }

  x += dx;
  y += dy;
}

function paddleMovement() {
  /*  if (keydown right) {
    drawPaddle += dx

 }
    */
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  function keyDownHandler(event) {
    const { key } = event;
    if (key === 'Right' || key === 'ArrowRight') {
      rightPressed = true;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      leftPressed = true;
    }
  }
  function keyUpHandler(event) {
    const { key } = event;
    if (key === 'Right' || key === 'ArrowRight') {
      rightPressed = false;
    } else if (key === 'Left' || key === 'ArrowLeft') {
      leftPressed = false;
    }
  }
}
initEvents();
function draw() {
  cleanCanvas();
  initEvents();
  drawBall();
  drawBricks();
  drawPaddle();
  collisionDetection();
  ballMovement();
  paddleMovement();
  console.log('drawing canvas');
  window.requestAnimationFrame(draw);
}
// draw();
