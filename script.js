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
let firing = false;

// Xử lý sự kiện cảm ứng
canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchmove", touchMoveHandler, false);
canvas.addEventListener("touchend", touchEndHandler, false);

// Xử lý sự kiện chạm
function touchStartHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    let touchX = touch.clientX;
    let touchY = touch.clientY;

    // Điều khiển bắn đạn
    if (touchY > canvas.height - 100) {
        firing = true;
        fireBullet();
    }
}

function touchMoveHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const moveX = touch.clientX;

    // Điều khiển di chuyển xe tăng
    if (moveX > tankWidth / 2 && moveX < canvas.width - tankWidth / 2) {
        tankX = moveX - tankWidth / 2;
    }
}

function touchEndHandler(e) {
    e.preventDefault();
    firing = false;
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

// Vẽ xe tăng
function drawTank() {
    ctx.beginPath();
    ctx.rect(tankX, tankY, tankWidth, tankHeight);
    ctx.fillStyle = "#00FF00"; // Màu xanh lá cây
