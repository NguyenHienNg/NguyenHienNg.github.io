const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Kích thước canvas tự động điều chỉnh
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Xe tăng
const tank = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 40,
  width: 40,
  height: 20,
  color: "green",
  speed: 15,
};

// Đạn
const bullets = [];
const enemies = [];

// Vẽ xe tăng
function drawTank() {
  ctx.fillStyle = tank.color;
  ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
}

// Bắn đạn
function fireBullet() {
  bullets.push({
    x: tank.x + tank.width / 2 - 2,
    y: tank.y,
    width: 4,
    height: 10,
    color: "red",
    speed: -6,
  });
}

// Vẽ đạn
function drawBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y += bullet.speed;
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    // Xóa đạn khi ra khỏi màn hình
    if (bullet.y < 0) bullets.splice(index, 1);
  });
}

// Kẻ thù
function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - 30),
    y: 0,
    width: 30,
    height: 30,
    color: "purple",
    speed: 2,
  });
}

function drawEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.y += enemy.speed;
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    // Xóa kẻ thù khi ra khỏi màn hình
    if (enemy.y > canvas.height) enemies.splice(index, 1);
  });
}

// Va chạm
function checkCollision() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });
}

// Xử lý nút điều khiển
document.getElementById("move-left").addEventListener("touchstart", () => {
  if (tank.x > 0) tank.x -= tank.speed;
});

document.getElementById("move-right").addEventListener("touchstart", () => {
  if (tank.x + tank.width < canvas.width) tank.x += tank.speed;
});

document.getElementById("fire-button").addEventListener("touchstart", () => {
  fireBullet();
});

// Vòng lặp trò chơi
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  drawBullets();
  drawEnemies();
  checkCollision();
  requestAnimationFrame(gameLoop);
}

// Tạo kẻ thù
setInterval(spawnEnemy, 2000);

// Bắt đầu trò chơi
gameLoop();
