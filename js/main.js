'use strict';
var MINE = '💣';
const XLIFE = '💜';
const HINT = '🔮';
var DEAD = '😫';
var COOL = '😎';
var HAPPY = '🙂';
var EMPTY = '';
var FLAG = '🚩';

var gBoard;
var gTime;
var gStartTimer;

var gLevel = {
    size: 4,
    mines: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    flaggedCount: 0,
    secsPassed: 0,
}
var gMinesPos;
var gFirstPos;
var gFirstClick = true;
var gInterval; 
var gTimeInterval;


function init() {
    var elCell = document.querySelector('.time-log');
    elCell.innerText = "0"; 
    gBoard = buildBoard();
    renderBoard(gBoard);
    renderMines(gBoard);
    setMinesNegsCount(gBoard);
    gGame.isOn = true;
    gGame.shownCount = 0; 
}

function buildBoard() {
    var size = gLevel.size;
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    // console.table(board);
    return board;
}

function createCell(i, j) {
    var cell = {
        location: { i, j },
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}
function renderBoard() {
    var board = gBoard;
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var content = cell.isMine ? MINE : (cell.minesAroundCount ? cell.minesAroundCount : '');
            var cellClass = `hide cell-${i}-${j}`;
            strHtml += `<td class="cell ${cellClass}" onclick="cellClicked(this,${i},${j})"oncontextmenu="cellFlagged(this,${i},${j})">`
            strHtml += `</td>`
            
        }
        strHtml += '</tr>'
    }
    var elSmiley= document.querySelector('.restart');
    elSmiley.innerText = HAPPY;
    var elBoardCells = document.querySelector('.board-cells');
    elBoardCells.innerHTML = strHtml;
}


function renderMines(board,Idx) {
    Idx = 0; 
    var numOfMines = gLevel.mines;
    for (var i = 0; i < numOfMines; i++) {
        var randomRow = getRandomInt(0, gLevel.size);
        var randomCol = getRandomInt(0, gLevel.size);
        var cell = board[randomRow][randomCol];
        if(randomRow === Idx.i && randomCol === Idx.j){
            numOfMines ++
            continue; 
        }
        if (cell.isMine) numOfMines++;
        cell.isMine = true;
        console.log(randomRow)
        console.log(randomCol)
        console.log(cell)
        // cell.minesAroundCount = MINE; 
    }

}

function playEasyLevel() {
    gLevel.size = 4;
    gLevel.mines = 2;
  
    resetGame()
}
function playMediumLevel() {
    gLevel.size = 8;
    gLevel.mines = 12;

    resetGame()
}
function playHardLevel() {
    gLevel.size = 12;
    gLevel.mines = 30;
    resetGame()
}


// var elTimer = document.querySelector('.timer');
// elTimer.style.visibility = 'hidden';
// gStartTime = 0;
// gIntervalTimer = 0
// var gIsFirstClick = true; 
// var gIntervalTimer;
// var gStartTime;

// function startTimer() {
//     gStartTime = Date.now();
//     var elTimer = document.querySelector('.timer');
//     elTimer.style.visibility = 'visible';
//     gIntervalTimer = setInterval(setTimer, 20)
// }

// function setTimer() {
//     var currTime = Date.now()
//     var diffTime = new Date(currTime - gStartTime)
//     var printedTime = diffTime.getMinutes() + ':' + diffTime.getSeconds();
//     var elTimer = document.querySelector('.timer');
//     elTimer.innerText = 'Timer:\n' + printedTime;
// }