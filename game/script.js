const board = document.getElementById("board");
const turnIndicator = document.getElementById("turn-indicator");
const restartButton = document.getElementById("restart-button");
let currentTurn = "white";

// Tạo bàn cờ
function createChessBoard() {
    const pieces = {
        white: ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"],
        black: ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟"],
    };

    board.innerHTML = ""; // Làm trống bàn cờ

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;

            // Thêm quân cờ
            if (row === 0) square.textContent = pieces.black[col];
            if (row === 1) square.textContent = pieces.black[8];
            if (row === 6) square.textContent = pieces.white[8];
            if (row === 7) square.textContent = pieces.white[col];

            board.appendChild(square);
        }
    }
}

// Xử lý lượt chơi
board.addEventListener("click", (e) => {
    const square = e.target;
    if (!square.classList.contains("square")) return;

    if (square.textContent) {
        alert(`Chọn quân cờ ${square.textContent} của bạn để di chuyển!`);
    } else {
        alert("Vui lòng chọn quân cờ trước!");
    }
});

// Khởi động lại
restartButton.addEventListener("click", () => {
    createChessBoard();
    currentTurn = "white";
    turnIndicator.textContent = "Lượt chơi của đội trắng";
});

// Tạo bàn cờ ban đầu
createChessBoard();