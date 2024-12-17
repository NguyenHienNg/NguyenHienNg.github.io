const board = document.getElementById('board');
const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let selectedPiece = null;
let selectedCell = null;
let isWhiteTurn = true;

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            const isDark = (row + col) % 2 === 1;
            cell.classList.add(isDark ? 'dark' : 'light');

            const piece = initialBoard[row][col];
            if (piece) {
                const pieceElement = document.createElement('span');
                pieceElement.classList.add('piece');
                pieceElement.textContent = piece;
                pieceElement.dataset.row = row;
                pieceElement.dataset.col = col;
                pieceElement.addEventListener('click', () => selectPiece(row, col));
                cell.appendChild(pieceElement);
            }

            if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
                cell.classList.add('selected');
            }

            board.appendChild(cell);
        }
    }
}

function selectPiece(row, col) {
    if (selectedPiece) {
        // Di chuyển quân cờ
        if (isValidMove(selectedPiece, row, col)) {
            movePiece(selectedPiece, row, col);
            isWhiteTurn = !isWhiteTurn;
        }
        // Bỏ chọn quân cờ
        selectedPiece = null;
        selectedCell = null;
    } else {
        // Chọn quân cờ
        const piece = initialBoard[row][col];
        if (piece && isCorrectTurn(piece)) {
            selectedPiece = piece;
            selectedCell = { row, col };
        }
    }
    renderBoard();
}

function isCorrectTurn(piece) {
    if (isWhiteTurn && piece === piece.toUpperCase()) return true;
    if (!isWhiteTurn && piece === piece.toLowerCase()) return true;
    return false;
}

function isValidMove(piece, row, col) {
    const [startRow, startCol] = [selectedCell.row, selectedCell.col];
    // Logic đơn giản để kiểm tra nước đi hợp lệ của các quân cờ cơ bản
    const deltaRow = Math.abs(startRow - row);
    const deltaCol = Math.abs(startCol - col);

    // Ví dụ: Kiểm tra quân tốt di chuyển 1 ô
    if (piece.toLowerCase() === 'p') {
        return (deltaRow === 1 && deltaCol === 0); // Chỉ có thể di chuyển 1 ô về phía trước
    }
    // Thêm các điều kiện cho các quân cờ khác ở đây...
    
    return true; // Mặc định cho phép di chuyển
}

function movePiece(piece, row, col) {
    const [startRow, startCol] = [selectedCell.row, selectedCell.col];
    initialBoard[row][col] = piece;
    initialBoard[startRow][startCol] = '';
    selectedPiece = null;
    selectedCell = null;
    renderBoard();
}

renderBoard();