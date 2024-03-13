
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let score = 0;

const paddle_hit_sound = new Audio('sounds/paddle_hit.wav');
const score_sound = new Audio('sounds/score.wav');
const wall_hit_sound = new Audio('sounds/wall_hit.wav');

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#333"; // Gray color
    context.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();

    // Ball collision logic
    if(ball.x + ball.speedX > canvas.width-ball.radius || ball.x + ball.speedX < ball.radius) {
        ball.speedX = -ball.speedX;
        wall_hit_sound.play()
    }
    if(ball.y + ball.speedY < ball.radius) {
        ball.speedY = -ball.speedY;
        wall_hit_sound.play();
    } else if(ball.y + ball.speedY > canvas.height-ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.speedY = -ball.speedY;
            score++;
            const scoreElement = document.querySelector('.player-score');
            scoreElement.textContent = score;
            paddle_hit_sound.play();
        }
        else {
            score_sound.play();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }

    paddle.move(rightPressed, leftPressed, canvas);

    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

const interval = setInterval(draw, 10);