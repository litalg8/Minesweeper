'use strict';
var MINE = '💣';
const XLIFE = '💜';
const HINT = '🔮';
const DEAD = '😫';
const COOL = '😎';
const HAPPY = '🙂';
const EMPTY = '';
const FLAG = '🚩';

var gBoard;
var gTime;
var gTimeInterval;
var gFirstClick = true;
var gIsHint = false;
var gHints = [];

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

function init() {
    var elTimer = document.querySelector('.time-log');
    elTimer.innerText = '0';
    gGame.isOn = true;
    gGame.shownCount = 0;
    gBoard = buildBoard();
    addMines(gBoard);
    renderBoard(gBoard);
    checkMinesAroundCount(gBoard)
    createHints()
}

function resetGame() {
    clearInterval(gTimeInterval)
    var elTimer = document.querySelector('.time-log');
    elTimer.innerText = '0';
    gFirstClick = true;
    gBoard = buildBoard();
    gGame.isOn = true;
    addMines(gBoard)
    renderBoard(gBoard);
    checkMinesAroundCount(gBoard)
    createHints()
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var content = (cell.isMine) ? MINE : cell.minesAroundCount;
            var cellClass = `hide  cell-${i}-${j}`;
            strHtml += `<td class="cell ${cellClass}" 
            onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellFlagged(this,${i},${j})">`
            strHtml += `</td>`
        }
        strHtml += '</tr>'
    }
    var elSmiley = document.querySelector('.restart');
    elSmiley.innerText = HAPPY;
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function buildBoard() {
    var board = [];
    var size = gLevel.size;
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    console.table(board);
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

// Mines 

function addMines(board, Idx = 0) {
    var numOfMines = gLevel.mines;
    for (var i = 0; i < numOfMines; i++) {
        var randomRow = getRandomInt(0, gLevel.size);
        var randomCol = getRandomInt(0, gLevel.size);
        var cell = board[randomRow][randomCol];
        if (randomRow === Idx.i && randomCol === Idx.j) {
            numOfMines++
            continue;
        }
        if (cell.isMine) numOfMines++;
        cell.isMine = true;
        cell.minesAroundCount = MINE;
    }

}

function showMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) {
                showCell(i, j);
            }
        }
    }
}

// Game Levels & Reset

function setEasyLevel() {
    gLevel.size = 4;
    gLevel.mines = 2;
    resetGame()
}
function setMediumLevel() {
    gLevel.size = 8;
    gLevel.mines = 12;
    resetGame()
}
function setHardLevel() {
    gLevel.size = 12;
    gLevel.mines = 30;
    resetGame()
}
