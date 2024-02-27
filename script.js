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

const paddleWidth = 50;
const paddleHeight = 20;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.fillRect(x - 20, y + 20, paddleWidth, paddleHeight);
  ctx.closePath();
}
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
function paddleMovement() {}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  cleanCanvas();

  drawBall();
  drawBricks();

  collisionDetection();
  ballMovement();
  paddleMovement();
  console.log('drawing canvas');
  window.requestAnimationFrame(draw);
}
// draw();
