const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const $sprite = document.querySelector('#sprite');
const $bricks = document.querySelector('#bricks');

canvas.width = 448;
canvas.height = 400;

/* Game variables */
let counter = 0;

/* Ball Variables */
const ballRadius = 3;

// ball position
let x = canvas.width / 2;
let y = canvas.height - 30;
// ball speed
let dx = 3;
let dy = -2;

/* Paddle variable */
const PADDLE_SENSITIVITY = 7;

const paddleWidth = 50;
const paddleHeight = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

/* Bricks Variable */
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 30;
const brickHeight = 14;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
  ACTIVE: 1,
  DESTROYED: 0,
};

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    const random = Math.floor(Math.random() * 8);
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      status: BRICK_STATUS.ACTIVE,
      color: random,
    };
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  /*   ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
   */
  ctx.drawImage(
    $sprite, // uploaded image
    29, // ClipX : cut coordinates
    174, // ClipY : cut coordinates
    paddleWidth, // Cut size
    paddleHeight, // cut size
    paddleX, // x position of Image
    paddleY, // y position of Image
    paddleWidth, // Image width
    paddleHeight //  Image height
  );
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const clipX = currentBrick.color * 32;

      ctx.drawImage(
        $bricks,
        clipX,
        0,
        brickWidth, // 31
        brickHeight, // 14
        currentBrick.x,
        currentBrick.y,
        brickWidth,
        brickHeight
      );

      /* ctx.fillStyle = 'yellow';
      ctx.rect(currentBrick.x, currentBrick.y, brickWidth, brickHeight);
      ctx.fill(); */
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const currentBrick = bricks[c][r];
      if (currentBrick.status === BRICK_STATUS.DESTROYED) continue;

      const isBallSameXAsBrick =
        x > currentBrick.x && x < currentBrick.x + brickWidth;

      const isBallSameYAsBrick =
        y > currentBrick.y && y < currentBrick.y + brickHeight;

      if (isBallSameXAsBrick && isBallSameYAsBrick) {
        dy = -dy;
        currentBrick.status = BRICK_STATUS.DESTROYED;
      }
    }
  }
}
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
  drawPaddle();
  drawBricks();

  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}

draw();
initEvents();
