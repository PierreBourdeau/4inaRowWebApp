
var cols = document.querySelectorAll('.gameboard-col');
var gameCells = document.querySelectorAll('.gameboard-cell');
var player = 1;

function initGame() {
    cols.forEach(col => {
        col.addEventListener('click', function () {
            console.log('play');
            play(this);
        })
    })
}


/* function play(col) {
    let i = nbOfLines-1;
    if (col.children[0].getAttribute('data-filled') == 0) {
        while (col.children[i].getAttribute('data-filled') != 0) {
            i--;
        }
        col.children[i].setAttribute('data-filled', player);
        col.children[i].querySelector('.cell-content').classList.add(`player${player}`);
        endGame();
        if (player == 1) { player = 2 }
        else { player = 1 };
    }

}*/
/*
function endGame() {
    if (win()) {
        console.log(`Player ${player} wins`);
    }
    if (boardfull()) {
        console.log('the board is full');
    }
}
*/

function calcColumn() {
    for (let col = 0; col < nbOfCols - 1; col++) {
        var count = 1;
        for (let row = nbOfLines - 1; row > 0; row--) {
            if (cols[col].children[row].getAttribute('data-filled') == cols[col].children[row - 1].getAttribute('data-filled') && cols[col].children[row].getAttribute('data-filled') != 0) {
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
function calcLine() {
    for (let row = nbOfLines -1 ; row >= 0; row--) {
        var count = 1;
        for (let col = 0; col < nbOfCols - 1; col ++) {
            if (cols[col].children[row].getAttribute('data-filled') == cols[col+1].children[row].getAttribute('data-filled') && cols[col].children[row].getAttribute('data-filled') != 0) {
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

function calcDiagoAsc() {
    for (let row = nbOfLines - 1; row > 0; row--) {
        for (let col = 0; col < nbOfCols - 1; col++) {
            var count = 1;
            while (cols[col].children[row].getAttribute('data-filled') == cols[col + 1].children[row - 1].getAttribute('data-filled') && cols[col].children[row].getAttribute('data-filled') != 0 ) {
                count++;
                if (count == 4) {
                    return true;
                }
                row--;
                col++;
            }
        }
    }
    return false;
}

function calcDiagoDesc() {
    for (let row = 0; row < nbOfLines - 1; row++) {
        for (let col = 0; col < nbOfCols - 1; col++) {
            var count = 1;
            while (cols[col].children[row].getAttribute('data-filled') == cols[col + 1].children[row + 1].getAttribute('data-filled') && cols[col].children[row].getAttribute('data-filled') != 0 ) {
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


function win() {
    return (calcLine() || calcColumn() || calcDiagoAsc() || calcDiagoDesc());
}

function boardfull() {
    return false;
}