const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const whiteWinsDisplay = document.getElementById("whiteWins");
const blackWinsDisplay = document.getElementById("blackWins");

let whiteWins = 0;
let blackWins = 0;

// Tạo bàn cờ
function createBoard() {
    board.innerHTML = ""; // Xóa bàn cờ cũ
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 0 ? "white" : "black");

            // Thêm quân cờ mặc định
            if (row === 0 || row === 1 || row === 6 || row === 7) {
                const piece = document.createElement("span");
                if (row === 1) piece.textContent = "♙"; // Tốt trắng
                if (row === 6) piece.textContent = "♟"; // Tốt đen
                if (row === 0 || row === 7) {
                    const pieces = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];
                    piece.textContent = row === 0 ? pieces[col] : pieces[col].toLowerCase();
                }
                square.appendChild(piece);
            }

            board.appendChild(square);
        }
    }
}

// Reset bàn cờ
restartButton.addEventListener("click", () => {
    createBoard();
});

// Khởi tạo ban đầu
createBoard();
