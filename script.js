// Di chuyển xe người chơi
const playerCar = document.getElementById('player');
const enemyCar = document.getElementById('enemy');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const finishButton = document.getElementById('finish');

// Điều chỉnh vị trí xe
let playerPosition = 45;

function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= 5;
    } else if (direction === 'right' && playerPosition < 90) {
        playerPosition += 5;
    }
    playerCar.style.left = playerPosition + '%';
}

// Nút điều khiển
leftButton.addEventListener('click', () => movePlayer('left'));
rightButton.addEventListener('click', () => movePlayer('right'));

// Đưa ra thông báo "Fine" khi nhấn nút
finishButton.addEventListener('click', () => {
    alert('Fine! Bạn đã hoàn thành!');
});

// Tạo hiệu ứng di chuyển xe địch
let enemyPosition = 0;

function moveEnemy() {
    enemyPosition += 2;
    if (enemyPosition > 100) {
        enemyPosition = 0;
    }
    enemyCar.style.top = enemyPosition + '%';
    requestAnimationFrame(moveEnemy);
}

moveEnemy();
