// Canvas setup.
let canSizeX = 1280;
let canSizeY = 720;
const canvas = document.querySelector('canvas');
canvas.width = canSizeX;
canvas.height = canSizeY;
const ctx = canvas.getContext('2d');
// Elements setup.
let ball = new Ball(true);
let player0 = new Racket(true, 20);
let player1 = new Racket(false, canvas.width - 40);
// User input.
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;
// Audio.
let scrSFX = new Audio('score_sfx.mp3');


function drawScore(value, posX, direction = 'ltr') {
	ctx.fillStyle = 'white';
	ctx.font = '48px sans-serif';
	ctx.textBaseline = 'top';
	ctx.direction = direction;
	ctx.fillText(value, posX, 40);
}


function process() {
	// Clears the canvas for a new frame.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draws a cosmetic line in the middle of the screen.
	ctx.fillStyle = 'gray';
	ctx.fillRect(canvas.width / 2, 20, 2, canvas.height - 40); // Line X position, Line Y start, Line width, Line Y end.

    player0.draw(); // Player0 (at left side).
	player1.draw(); // Player1 (at right side).
	ball.draw();
	drawScore(player0.currentScore, 40); // Player0's score;
	drawScore(player1.currentScore, canvas.width - 40, 'rtl'); // Player1's score;
	// Moves the ball around.
	ball.bounceOff();
	ball.moveAround();
	// Moves the rackets with User's Input.
	player0.moveUpOrDown();
	player1.moveUpOrDown();
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


function keyDownHandler(event) {
	if (event.key === 'Up' || event.key === 'ArrowUp') {
		upPressed = true;
	} else if (event.key === 'Down' || event.key === 'ArrowDown') {
		downPressed = true;
	}
}


function keyUpHandler(event) {
	if (event.key === 'Up' || event.key === 'ArrowUp') {
		upPressed = false;
	} else if (event.key === 'Down' || event.key === 'ArrowDown') {
		downPressed = false;
	}
}


setInterval(process, 10);