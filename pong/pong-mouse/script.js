
const canvas = document.getElementById('game-area');
const context = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: -5,
    draw: function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fillStyle = "#fff";
        context.fill();
        context.closePath();
    }
};

const paddle = {
    width: 125,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 10,
    speed: 7,
    draw: function() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = "#fff";
        context.fill();
        context.closePath();
    },
    move: function(mouseX) {        
        if (mouseX > 675) {
            mouseX = 675;
        } else if (mouseX < 0) {
            mouseX = 0;
        }
        this.x = mouseX;
    }
};

let mouseX = 0;
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX - canvas.offsetLeft;
})


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
            scoreElement.textContent = score // "mouseX: " + mouseX;
            paddle_hit_sound.play();
        }
        else {
            score_sound.play();
            clearInterval(interval); 
            document.getElementById('game-over-screen').style.display = 'block';
        }
    }

    paddle.move(mouseX);

    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

let interval;

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('welcome-screen').style.display = 'none';
    interval = setInterval(draw, 10);
});

document.getElementById('restart-button').addEventListener('click', function() {
    document.getElementById('game-over-screen').style.display = 'none';
    // Reset game state here
    ball.x = canvas.width / 2;
    ball.y = 10;
    interval = setInterval(draw, 10);    
});



