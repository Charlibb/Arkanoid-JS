# Arkanoid Vainila JS

![Captura de pantalla 2024-02-27 a las 23 42 10](https://github.com/Charlibb/Arkanoid-JS/assets/81753538/54835e25-ee51-4ec7-893b-5f910a86a313)

The classic 80´s arcade game, Arkanoid, made entirely on Javascript!

# Basic Concepts of the Game Code

## Key Elements:

- **Canvas:** The game is rendered on an HTML5 canvas element.
- **Game Loop:** The `draw()` function continuously renders the game elements, creating animation.
- **Input Handling:** The `initEvents()` function listens for keyboard input to control the paddle.
- **Objects:** The game utilizes objects for the ball, paddle, and bricks.

## Key Functions:

- `drawBall()`: Draws the ball on the canvas.
- `drawPaddle()`: Draws the paddle on the canvas.
- `drawBricks()`: Draws the bricks on the canvas.
- `collisionDetection()`: Checks for collisions between the ball and other objects.
- `ballMovement()`: Updates the ball's position and handles collisions with walls and the paddle.
- `paddleMovement()`: Updates the paddle's position based on keyboard input.

## Game Structure:

### Initialization:

- Canvas is set up.
- Ball, paddle, and bricks are initialized with their properties.
- Event listeners are added for keyboard input.

### Game Loop:

- The `draw()` function is repeatedly called:
  - The canvas is cleared.
  - Objects are drawn on the canvas.
  - Object movement and collisions are handled.
  - The screen is updated.
 

### Credit :
Kudos To Midudev for the tutorial, part of his JS 100 projects
https://github.com/midudev/javascript-100-proyectos/tree/main
