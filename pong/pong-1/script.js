const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');

let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddleY = 160;

let score = 0;

let paddle_hit_sound = new Audio('sounds/paddle_hit.wav');
let score_sound = new Audio('sounds/score.wav');
let wall_hit_sound = new Audio('sounds/wall_hit.wav');


function update() {
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <5){
        score_sound.play();
        return
    }
    // Ball collision with walls
    if (ballY >= 380 || ballY <= 0) {
        ballSpeedY = -ballSpeedY;
        wall_hit_sound.play();
    }
    if (ballX >= 580 || ballX <= 0) {
        ballSpeedX = -ballSpeedX;
        wall_hit_sound.play();
    }

    // Ball collision with paddle
    if (ballX <= 20 && ballY > paddleY && ballY < paddleY + 80) {
        ballSpeedX = -ballSpeedX;
        score++;
        paddle_hit_sound.play();
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    const scoreElement = document.querySelector('.player-score');
    scoreElement.textContent = score;
    
    requestAnimationFrame(update);
}

function movePaddle(e) {
    let mouseY = e.clientY;
    if (mouseY > 320) {
        mouseY = 320;
    } else if (mouseY < 0) {
        mouseY = 0;
    }
    paddleY = mouseY;
    paddle.style.top = paddleY + 'px';
}

window.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", etc.

    if (key === 'ArrowUp') {
        paddleY -= 50; // Move the paddle up
    } else if (key === 'ArrowDown') {
        paddleY += 50; // Move the paddle down
    }

    // Prevent the paddle from moving off screen
    if (paddleY < 0) paddleY = 0;
    if (paddleY > 320) paddleY = 320;

    paddle.style.top = paddleY + 'px';
});

// document.addEventListener('mousemove', movePaddle);

update();
