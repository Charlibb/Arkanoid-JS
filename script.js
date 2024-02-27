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
let dx = 3;
let dy = -2;

/* Paddle variable */
const paddleWidth = 50;
const paddleHeight = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENSITIVITY = 7;

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

  // Ball bounces on paddle
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

  const isBallTouchingPaddle = y + dy > paddleY;

  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy;
  }

  // Ball touch down: Game over
  else if (y + dy > canvas.height - ballRadius) {
    console.log('Game Over!');
    document.location.reload();
  }
  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;
  }
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
  console.log({ rightPressed, leftPressed });
}
function draw() {
  console.log({ rightPressed, leftPressed });

  cleanCanvas();
  drawBall();
  drawBricks();
  drawPaddle();

  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}

// draw();
initEvents();
