var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./views'));
app.use(express.static('./views/controllers'));

app.get('/homepage', function (req, res) {
    res.render('homepage');

});

app.post('/start', function (req, resp) {
    var reqBody = req.body;
    resp.render('./partials/gameboard', { nbOfCol: reqBody.nbOfCols, nbOfLines: reqBody.nbOfRows, player1Color: reqBody.player1Color, player2Color: reqBody.player2Color, player1Nickname: reqBody.player1Nickname, player2Nickname: reqBody.player2Nickname });
})


app.listen(3000);