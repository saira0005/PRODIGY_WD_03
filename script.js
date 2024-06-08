const board = document.getElementById('board');
        const cells = board.querySelectorAll('.cell');
        let currentPlayer = 'X';
        let gameActive = true;

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        function handleCellClick(event) {
            const cell = event.target;
            const index = cell.dataset.index; 

            if (cell.textContent || !gameActive) return;

            cell.textContent = currentPlayer;
            cell.classList.add('clicked');

            if (checkWin()) {
                alert(`Player ${currentPlayer} wins!`);
                gameActive = false;
                return;
            }

            if (checkDraw()) {
                alert("It's a draw!");
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        function checkWin() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return cells[a].textContent &&
                       cells[a].textContent === cells[b].textContent &&
                       cells[a].textContent === cells[c].textContent;
            });
        }

        function checkDraw() {
            return Array.from(cells).every(cell => cell.textContent);
        }
