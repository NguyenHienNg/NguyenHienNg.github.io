let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let gameMode = "twoPlayers"; // Mặc định

function startTwoPlayers() {
    gameMode = "twoPlayers";
    document.getElementById("game-mode").innerText = "CHẾ ĐỘ CHƠI HAI NGƯỜI";
    initGame();
}

function startWithAI() {
    gameMode = "AI";
    document.getElementById("game-mode").innerText = "CHẾ ĐỘ CHƠI VỚI MÁY";
    initGame();
}

function initGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    renderBoard();
}

function renderBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell) cellElement.classList.add("taken");
        cellElement.innerText = cell;
        cellElement.onclick = () => makeMove(index);
        boardContainer.appendChild(cellElement);
    });
    document.getElementById("next-player").innerText = `Người tiếp theo: ${currentPlayer}`;
}

function makeMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} thắng!`);
            updateScore();
            resetBoard();
        } else if (board.every(cell => cell)) {
            alert("Hòa!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            renderBoard();
            if (gameMode === "AI" && currentPlayer === "O") {
                setTimeout(aiMove, 500);
            }
        }
    }
}

function aiMove() {
    let available = board.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
    let randomMove = available[Math.floor(Math.random() * available.length)];
    makeMove(randomMove);
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function updateScore() {
    if (currentPlayer === "X") scoreX++;
    else scoreO++;
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
}

function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    renderBoard();
}

function resetGame() {
    scoreX = 0;
    scoreO = 0;
    resetBoard();
    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
}

function backToMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("game-container").style.display = "none";
    resetGame();
            }
