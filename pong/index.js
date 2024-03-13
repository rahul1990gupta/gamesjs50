// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Game objects
var player = { speed: 400, x: 0, y: canvas.height / 2 };
var computer = { speed: 200, x: canvas.width - 10, y: canvas.height / 2 };
var ball = { speed: 200, x: canvas.width / 2, y: canvas.height / 2, dx: 1, dy: 1 };

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
};

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        player.y -= player.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        player.y += player.speed * modifier;
    }

    // Computer AI
    if (computer.y < ball.y) {
        computer.y += computer.speed * modifier;
    }
    if (computer.y > ball.y) {
        computer.y -= computer.speed * modifier;
    }

    // Ball movement
    ball.x += ball.dx * ball.speed * modifier;
    ball.y += ball.dy * ball.speed * modifier;

    // Ball and paddle collision
    if (ball.y > player.y && ball.y < player.y + 50 && ball.x < 10) {
        ball.dx = 1;
    }
    else if (ball.y > computer.y && ball.y < computer.y + 50 && ball.x > canvas.width - 20) {
        ball.dx = -1;
    }

    // Ball and wall collision
    if (ball.y < 0 || ball.y > canvas.height) {
        ball.dy *= -1;
    }

    // Ball goes off screen
    if (ball.x < 0 || ball.x > canvas.width) {
        reset();
    }
};

// Draw everything
var render = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(player.x, player.y, 10, 50);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(computer.x, computer.y, 10, 50);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();