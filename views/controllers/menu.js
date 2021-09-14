var colorPicker1 = document.getElementById('color-picker1');
var colorPicker2 = document.getElementById('color-picker2');
var game;

/* COLOR PICKERS */

colorPicker1.addEventListener('input', function () {
    document.querySelector('.preview1 .cell-content').style.boxShadow = ('var(--inner-shadow-dark)');
    document.querySelector('.preview1 .cell-content').style.background = `${colorPicker1.value}`;
});
colorPicker2.addEventListener('input', function () {
    document.querySelector('.preview2 .cell-content').style.boxShadow = ('var(--inner-shadow-dark)');
    document.querySelector('.preview2 .cell-content').style.background = `${colorPicker2.value}`;
});

/* SLIDERS FOR GRID */

document.getElementById('col-slider').addEventListener('change', function () {
    adjustTemplateGrid(this);
})
document.getElementById('row-slider').addEventListener('change', function () {
    adjustTemplateGrid(this);
})

/* CHANGE GRID PREVIEW */

function adjustTemplateGrid(slider) {
    if (slider.id === 'col-slider') {
        document.querySelector('.gameboard-preview').style.setProperty('--template-columns', slider.value);
    }
    else {
        document.querySelector('.gameboard-preview').style.setProperty('--template-rows', slider.value);
    }
    document.querySelector('.gameboard-preview').textContent = '';
    for (let i = 1; i <= document.getElementById('col-slider').value * document.getElementById('row-slider').value; i++) {
        let e = createTemplateCell();
        e.firstChild.innerHTML = i;
        document.querySelector('.gameboard-preview').appendChild(e);
    }
}
adjustTemplateGrid(document.getElementById('row-slider'));
adjustTemplateGrid(document.getElementById('col-slider'));

/* GENERATE CELLS FOR PREVIEW GRID */

function createTemplateCell() {
    const e = document.createElement('div');
    const e_content = document.createElement('div');
    e.classList.add('gameboard-cell');
    e_content.classList.add('cell-content');
    e.appendChild(e_content);
    return e;
}
/* PARTIAL MODAL */
document.querySelector('#modal-menu a.modal-menu-btn').addEventListener('click', function () {
    document.location.reload(false);
})
document.querySelector('#modal-menu a.modal-playAgain-btn').addEventListener('click', function () {

})
/* PLAY */

document.querySelector('.play-btn').addEventListener('click', async function () {
    if (validateSetup()) {
        const datas = formatSetup();
        root.style.setProperty('--player-1-color', datas.player1Color);
        root.style.setProperty('--player-2-color', datas.player2Color);
        await $.ajax({
            type: 'POST',
            url: '/start',
            data: datas,
            dataType: 'html',
            beforeSend: function () {

            },
            complete: function () {
            },
            success: function (resp) {
                $('#page-content').html(resp);
            }

        });
        game = new Game(datas.nbOfRows, datas.nbOfCols);
    }
})

/* VALIDATE INPUTS */

function validateSetup() {
    var letters = /^[0-9a-zA-Z]+$/;
    if ($('.player1-name').val().match(letters) || $('.player2-name').val().match(letters) || !$('.player1-name').val() || !$('.player1-name').val()) {
        return true;
    }
    else {
        alert('Please input alphanumeric characters only');
        return false;
    }
}

/* FORMAT DATAS */

function formatSetup() {
    var player1Nickname = $('.player1-name').val();
    var player1Color = document.getElementById('color-picker1').value;
    var player2Nickname = $('.player2-name').val();
    var player2Color = document.getElementById('color-picker2').value;
    if (!player1Nickname) {
        player1Nickname = 'Player 1';
    }
    if (!player2Nickname){
        player2Nickname = 'Player 2';
    }
    if (player1Color == "#000000") {
        player1Color = getRandomColor();
    }
    if (player2Color == "#000000") {
        player2Color = getRandomColor();
        while (player1Color == player2Color) {
            player2Color = getRandomColor();
        }
    }
    return { player1Color: player1Color, player1Nickname: player1Nickname, player2Color: player2Color, player2Nickname: player2Nickname, nbOfRows: document.getElementById('row-slider').value, nbOfCols: document.getElementById('col-slider').value}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}