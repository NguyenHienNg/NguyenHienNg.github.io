const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('turn');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']; // Dữ liệu bảng trò chơi

// Kiểm tra thắng thua
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function handleClick(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        event.target.textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            setTimeout(() => {
                alert(`${winner} thắng!`);
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Lượt chơi: ${currentPlayer}`;
        }
    }
}

// Khởi động lại trò chơi
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    statusText.textContent = `Lượt chơi: X`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);