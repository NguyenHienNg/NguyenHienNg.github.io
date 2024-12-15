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

let touchX = 0;
let touchY = 0;
let firing = false;

// Xử lý cảm ứng
canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchmove", touchMoveHandler, false);
canvas.addEventListener("touchend", touchEndHandler, false);

function touchStartHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchX = touch.clientX;
    touchY = touch.clientY;

    // Nếu người chơi chạm vào khu vực gần xe tăng, cho phép bắn
    if (touchY < canvas.height - 100) {
        firing = true;
        fireBullet();
    }
}

function touchMoveHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const moveX = touch.clientX;

    // Điều khiển xe tăng di chuyển theo hướng cảm ứng
    if (moveX > tankWidth / 2 && moveX < canvas.width - tankWidth / 2) {
        tankX = moveX - tankWidth / 2;
    }
}

function touchEndHandler(e) {
    e.preventDefault();
    firing = false;
}

// Chức năng di chuyển xe tăng
function moveTank() {
    // Di chuyển theo cảm ứng đã được xử lý trong touchMoveHandler
}

// Chức năng bắn đạn
function fireBullet() {
    let bullet = {
        x: tankX + tankWidth / 2 - bulletWidth / 2,
        y: tankY,
        width: bulletWidth,
        height: bulletHeight,
    };
    bullets.push(bullet);
}

function drawTank() {
    ctx.beginPath();
    ctx.rect(tankX, tankY, tankWidth, tankHeight);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        ctx.beginPath();
        ctx.rect(bullet.x, bullet.y, bullet.width, bullet.height);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
