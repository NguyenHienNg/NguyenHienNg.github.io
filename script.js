const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Kích thước canvas
canvas.width = 600;
canvas.height = 400;

// Xe tăng
const tank = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 40,
  width: 40,
  height: 20,
  color: "green",
  speed: 10,
};

// Đạn
const bullets = [];
const enemies = [];
let isFiring = false;

// Vẽ xe tăng
function drawTank() {
  ctx.fillStyle = tank.color;
  ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
}

// Tạo đạn
function fireBullet() {
  bullets.push({
    x: tank.x + tank.width / 2 - 2,
    y: tank.y,
    width: 4,
    height: 10,
    color: "red",
    speed: -5,
  });
}

// Vẽ đạn
function drawBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y += bullet.speed;
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    // Loại bỏ đạn nếu vượt khỏi canvas
    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1);
    }
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

    // Loại bỏ kẻ thù nếu vượt khỏi canvas
    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }
  });
}

// Kiểm tra va chạm
function checkCollision() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        // Xóa đạn và kẻ thù khi va chạm
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });
}

// Điều khiển xe tăng
document.getElementById("move-left").addEventListener("click", () => {
  if (tank.x > 0) tank.x -= tank.speed;
});

document.getElementById("move-right").addEventListener("click", () => {
  if (tank.x + tank.width < canvas.width) tank.x += tank.speed;
});

document.getElementById("fire-button").addEventListener("click", () => {
  if (!isFiring) {
    fireBullet();
    isFiring = true;
    setTimeout(() => (isFiring = false), 300); // Chỉ bắn 1 viên trong 300ms
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTank();
  drawBullets();
  drawEnemies();
  checkCollision();
  requestAnimationFrame(gameLoop);
}

// Tạo kẻ thù mỗi 2 giây
setInterval(spawnEnemy, 2000);

// Bắt đầu trò chơi
gameLoop();
