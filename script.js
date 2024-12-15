// Lấy đối tượng canvas và context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Cấu hình trò chơi
const tankSpeed = 5;
const bulletSpeed = 8;
const tankWidth = 50;
const tankHeight = 50;
const bulletRadius = 5;

// Trạng thái trò chơi
let tankX = canvas.width / 2 - tankWidth / 2;
let tankY = canvas.height - tankHeight - 10;
let tankDirection = 'UP';
let bullets = [];

function drawTank() {
    ctx.fillStyle = 'green';
    ctx.fillRect(tankX, tankY, tankWidth, tankHeight);
}

function drawBullets() {
    ctx.fillStyle = 'red';
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bulletRadius, 0, Math.PI * 2);
        ctx.fill();
        bullet.y -= bulletSpeed;
    }
}

function moveTank() {
    if (tankDirection === 'UP') {
        tankY -= tankSpeed;
    } else if (tankDirection === 'DOWN') {
        tankY += tankSpeed;
    } else if (tankDirection === 'LEFT') {
        tankX -= tankSpeed;
    } else if (tankDirection === 'RIGHT') {
        tankX += tankSpeed;
    }
}

function shootBullet() {
    const bullet = { x: tankX + tankWidth / 2, y: tankY, direction: tankDirection };
    bullets.push(bullet);
}

// Điều khiển bằng bàn phím
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') tankDirection = 'UP';
    if (e.key === 'ArrowDown') tankDirection = 'DOWN';
    if (e.key === 'ArrowLeft') tankDirection = 'LEFT';
    if (e.key === 'ArrowRight') tankDirection = 'RIGHT';
    if (e.key === ' ') shootBullet();
});

// Vẽ trò chơi
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveTank();
    drawTank();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

// Bắt đầu trò chơi
gameLoop();
