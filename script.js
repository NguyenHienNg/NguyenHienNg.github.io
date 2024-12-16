const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameState[index]) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`Player ${gameState[a]} wins!`);
            resetGame();
            return;
        }
    }

    if (!gameState.includes(null)) {
        alert("It's a draw!");
        resetGame();
    }
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}
