const gameBoard = document.getElementById('gameBoard'); 
const cells = document.querySelectorAll('.cell'); 
const resetButton = document.getElementById('resetButton');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (gameState[clickedCellIndex] !== '' || checkWinner()) {
        return;
    }
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
        setTimeout(() => alert(`${getCurrentPlayerName()} wins!`), 100);
        resetBoard();
        return;
    }

        if (isDraw()) {
        setTimeout(() => alert('Draw!'), 100);
        resetBoard();
        return;
    }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function getCurrentPlayerName() {
    return currentPlayer === 'X' ? playerXNameInput.value || 'Player X' : playerONameInput.value || 'Player O';
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function resetBoard() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);
