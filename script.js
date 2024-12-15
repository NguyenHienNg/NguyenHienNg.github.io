const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tankX = canvas.width / 2;
let tankY = canvas.height - 50;
let tankSpeed = 5;
let bulletSpeed = 7;
let bullets = [];

const tankWidth = 50;
const tankHeight = 30;
const bulletWidth = 5;
const bulletHeight = 10;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    } else if (e.key == " " || e.key == "Spacebar") {
        spacePressed = true;
        fireBullet();
    }
}

function keyUpHandler(e) {
    if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    } else if (e.key == " " || e.key == "Spacebar") {
        spacePressed = false;
    }
}

function drawTank() {
    ctx.beginPath();
    ctx.rect(tankX, tankY, tankWidth, tankHeight);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function moveTank() {
    if (leftPressed && tankX > 0) {
        tankX -= tankSpeed;
    }
    if (rightPressed && tankX < canvas.width - tankWidth) {
        tankX += tankSpeed;
    }
    if (upPressed && tankY > 0) {
        tankY -= tankSpeed;
    }
    if (downPressed && tankY < canvas.height - tankHeight) {
        tankY += tankSpeed;
    }
}

function fireBullet() {
    if (spacePressed) {
        let bullet = {
            x: tankX + tankWidth / 2 - bulletWidth / 2,
            y: tankY,
            width: bulletWidth,
            height: bulletHeight,
        };
        bullets.push(bullet);
    }
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        ctx.beginPath();
        ctx.rect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
        bullet.y -= bulletSpeed;

        if (bullet.y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTank();
    moveTank();
    drawBullets();
}

setInterval(draw, 1000 / 60);
