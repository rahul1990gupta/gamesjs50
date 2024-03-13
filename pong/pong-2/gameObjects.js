
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
    move: function(rightPressed, leftPressed, canvas) {
        if(rightPressed) {
            this.x += this.speed;
            if (this.x + this.width > canvas.width){
                this.x = canvas.width - this.width;
            }
        }
        else if(leftPressed) {
            this.x -= this.speed;
            if (this.x < 0){
                this.x = 0;
            }
        }
    }
};

