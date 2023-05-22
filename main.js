// Canvas setup.
let canSizeX = 1280;
let canSizeY = 720;
const canvas = document.querySelector('canvas');
canvas.width = canSizeX;
canvas.height = canSizeY;
const ctx = canvas.getContext('2d');
// Elements setup.
let ballPosX = canvas.width / 2;
let ballPosY = canvas.height / 2;
let ballSizeX = 20;
let ballSizeY = 20;
let ballDirX = 4;
let ballDirY = -4;
let pl0PosX = 10;
let pl0PosY = canvas.height / 2;
let pl0SizeX = 20;
let pl0SizeY = 100;
let pl1PosX = canvas.width - pl0SizeX;
let pl1PosY = canvas.height / 2;
const errorMargin = 4;
// User input.
let wPressed = false;
let sPressed = false;
let upPressed = false;
let downPressed = false;
// Interface.
let pl0CurrentScore = 0;
let pl1CurrentScore = 0;
// Audio.
let audio = true;
let scrSFX = new Audio('score_sfx.mp3');


function drawABall(color, posX, posY, sizeX, sizeY) {
	ctx.fillStyle = color;
	ctx.fillRect(posX, posY, sizeX, sizeY);
}


function drawRacket(color, posX, posY) {
	ctx.fillStyle = color;
	ctx.fillRect(posX, posY, pl0SizeX, pl0SizeY);
}


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
	drawABall('#58c47a', ballPosX, ballPosY, 20, 20);
    drawRacket('white', pl0PosX, pl0PosY); // Player0 (at left side).
	drawRacket('white', canSizeX - 30, 10); // Player1 (at right side).
	drawScore(pl0CurrentScore, 40); // Player0's score;
	drawScore(pl1CurrentScore, canvas.width - 40, 'rtl'); // Player1's score;
	// Bounces the ball off from the rackets.
	// For Player 0 (left)
	if (ballPosX < pl0PosX + pl0SizeX && ballPosY > pl0PosY && ballPosY < pl0PosY + pl0SizeY) {
		ballDirX = -ballDirX;
	}
	// For Player 1 (right)
	if (ballPosX + ballSizeX > pl1PosX && ballPosY > pl1PosY && ballPosY < pl1PosY + pl0SizeY) {
		ballDirX = -ballDirX;
	}
	// Bouncing off the top and bottom and applies a new score if necessary.
	if (ballPosX >= canvas.width - ballSizeX) {
		pl0CurrentScore++;
		ballDirX = -ballDirX;
		scrSFX.play();
	}
	if (ballPosX + (ballSizeX/2) <= 0) {
		pl1CurrentScore++;
		ballDirX = -ballDirX;
		scrSFX.play();
	}
	if (ballPosY + ballSizeY >= canvas.height || ballPosY <= 0) {
		ballDirY = -ballDirY;
	}
	// Moves the ball around.
	ballPosX += ballDirX;
	ballPosY += ballDirY;
	// Moves the rackets with User's Input.
	if (upPressed) {
		pl0PosY = Math.max(pl0PosY - 7, 0);
	} else if (downPressed) {
		pl0PosY = Math.min(pl0PosY + 7, canvas.height - 100);
	}
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