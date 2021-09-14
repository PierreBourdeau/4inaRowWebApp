class Game {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.htmlCols = document.querySelectorAll('.gameboard-col');
        this.player = 1;
        this.htmlCells = document.querySelectorAll('.gameboard-cell');
    }

    colHover(col) {
        let i = this.rows - 1;
        if (col.children[0].getAttribute('data-filled') == 0) {
            while (col.children[i].getAttribute('data-filled') != 0) {
                i--;
            }
            $(col.children[i]).setAttribute('data-filled', this.player);
            col.children[i].querySelector('.cell-content').classList.add(`player${this.player}`);

        }
    }

    play(col) {
        let i = this.rows - 1;
        if (col.children[0].getAttribute('data-filled') == 0) {
            while (col.children[i].getAttribute('data-filled') != 0) {
                i--;
            }
            col.children[i].setAttribute('data-filled', this.player);
            col.children[i].querySelector('.cell-content').classList.add(`player${this.player}`);
            this.endGame();
            if (this.player == 1) {this.player = 2 }
            else {this.player = 1 };
        }
    }

    endGame() {
        if (this.win()) {
            console.log(`Player ${this.player} wins`);
            document.getElementById('modal-menu').style.display = 'flex';
            document.querySelector('#modal-menu .modal-menu-title').innerHTML = 'Player ' + this.player + 'wins !';
        }
        if (this.boardfull()) {
            console.log('the board is full');
            document.getElementById('modal-menu').style.display = 'flex';
            document.querySelector('#modal-menu .modal-menu-title').innerHTML = 'DRAW';
        }
    }

    calcColumn() {
        for (let col = 0; col < this.cols - 1; col++) {
            var count = 1;
            for (let row = this.rows - 1; row > 0; row--) {
                if (this.htmlCols[col].children[row].getAttribute('data-filled') == this.htmlCols[col].children[row - 1].getAttribute('data-filled') && this.htmlCols[col].children[row].getAttribute('data-filled') != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                }
                else {
                    count = 1;
                }
            }
        }
        return false;
    }
    calcLine() {
        for (let row = this.rows - 1; row >= 0; row--) {
            var count = 1;
            for (let col = 0; col < this.cols - 1; col++) {
                if (this.htmlCols[col].children[row].getAttribute('data-filled') == this.htmlCols[col + 1].children[row].getAttribute('data-filled') && this.htmlCols[col].children[row].getAttribute('data-filled') != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                }
                else {
                    count = 1;
                }
            }
        }
        return false;
    }
    calcDiagoAsc() {
        for (let row = this.rows - 1; row > 0; row--) {
            for (let col = 0; col < this.cols - 1; col++) {
                var count = 1;
                if (this.player == 2 && this.htmlCols[col].children[row].getAttribute('data-filled') == 2 && (col < this.cols - 1 && row > 0) && this.htmlCols[col].children[row].getAttribute('data-filled') == this.htmlCols[col + 1].children[row - 1].getAttribute('data-filled') && this.htmlCols[col].children[row].getAttribute('data-filled') != 0 ) {
                    console.log('started at : ');
                    console.log(this.htmlCols[col].children[row]);
                    if (this.htmlCols[col].children[row].getAttribute('data-filled') != 0) {
                        console.log('Différent de 0');
                    }
                }
                while ((col < this.cols-1 && row > 0) && this.htmlCols[col].children[row].getAttribute('data-filled') == this.htmlCols[col + 1].children[row - 1].getAttribute('data-filled') && this.htmlCols[col].children[row].getAttribute('data-filled') != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                    row--;
                    col++;
                    if (this.player == 2) {
                        console.log('player : ' + this.player + ' scored : ' + count + ' at row : ' + row + ' col : ' + col);
                        console.log('------');
                    }
                }
            }
        }
        return false;
    }
    calcDiagoDesc() {
        for (let row = 0; row < this.rows - 1; row++) {
            for (let col = 0; col < this.cols - 1; col++) {
                var count = 1;
                while ((col < this.cols-1 && row < this.rows-1) && this.htmlCols[col].children[row].getAttribute('data-filled') == this.htmlCols[col + 1].children[row + 1].getAttribute('data-filled') && this.htmlCols[col].children[row].getAttribute('data-filled') != 0) {
                    count++;
                    if (count == 4) {
                        return true;
                    }
                    row++;
                    col++;
                }
            }
        }
        return false;
    }
    win() {
        return (this.calcLine() || this.calcColumn() || this.calcDiagoAsc() || this.calcDiagoDesc());
    }

    boardfull() {
        if (document.querySelectorAll('.gameboard-cell[data-filled="0"]').length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}