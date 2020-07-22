'use strict';
var MINE = '💣';
const XLIFE = '💜';
const HINT = '🔮';
const HAPPY = '🙂';
const DEAD = '🤕';
const COOL = '😎';
var EMPTY = '';
var FLAG = '🚩';

var gBoard;
var gLevel;
var gLevel = {
    SIZE: 4,
    MINE: 2
}
var gFirstClick;

var gGame = {
    isOn: false,
    shownCount: 0,
    flaggedCount: 0,
    secsPassed: 0,
}
var gMinesPos;


function init() {
    gFirstClick = true;
    gBoard = buildBoard();
    renderBoard();
    gGame.isOn = true;

}


function buildBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {

            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell; 

        }
    }
    console.table(board);
    return board;


}


function renderBoard() {
    var board = gBoard;
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]; 
            var cellClass = `hide cell-${i}-${j}`;
            strHtml += `<td class="${cellClass}" onclick="cellClicked(this,${i},${j})"oncontextmenu="cellFlagged(this,${i},${j})">${MINE}`
            strHtml += `</td>`

        }
        strHtml += '</tr>'
    }

    var elBoardCells = document.querySelector('.board-cells');
    elBoardCells.innerHTML = strHtml;

}
function cellClicked(elCell, i, j) {
    if (gGame.isOn) {
        var cell = gBoard[i][j];
        
        cell.isShown = true;
        elCell.classList.remove('hide')
        elCell.classList.add('show')
        if (cell.isMine) {
            elCell.innerText = MINE;
            gameOver();
            return;

        }
    } 

}

// function cellReveal(i, j) {


// }


function renderMines() {
    for (var i = 0; i < gBoard.length - 1; i++) {
        var coord = minesCoords[i];
        board[coord.i][coord.j].isMine = true;
    }
}


function startTheFun() {
    gTime = Date.now();
    timeInterval = setInterval(gameTimer, 10);
    var elLogSc = document.querySelector('.time-log')
    elLogSc.style.fontSize = '20px'

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function gameTimer() {
    var currTime = Date.now();
    var elLogTime = document.querySelector('.time-log');
    var timePassed = currTime - gTime;
    var timePassedSecs = (timePassed / 1000).toFixed(3)
    elLogTime.innerText = `${timePassedSecs}`
}

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);


        // var clickedNum = cellNum.innerHTML;
        // if (gNextCell === 1 && clickedNum === 1) {
        //     startTheFun()
        // }
        // if (gNextCell > 1 || clickedNum === 1) {
        //     if (cell.isShown === false) {
        //         cell.style = MINE;

        //     }
        // }
        // console.log(gNextCell)