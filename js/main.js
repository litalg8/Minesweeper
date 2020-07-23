'use strict';
var MINE = '💣';
const XLIFE = '💜';
const HINT = '🔮';
const DEAD = '🤕';
const COOL = '😎';
var HAPPY = '🙂';
var EMPTY = '';
var FLAG = '🚩';

var gBoard;
var gTime;
var timeInterval;
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

// function restartsmiley() {
//     var elSmiley = document.querySelector('.smiley')
//     elSmiley.innerText = HAPPY; 
//     var elTimer = document.querySelector('.timelog')
//     elTimer.style.visibility = 'hidden';
//     gStartTimer = 0;
//     gTimeInterval = 0;
//     gFirstClick = true;

// }

function init() {
    // restartsmiley();
    gBoard = buildBoard();
    renderMines(gBoard)
    renderBoard();
    setMinesNegsCount(gBoard)
    gGame.isOn = true;
    // gLevel.size = 4;
    // gLevel.mines = 2;
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
            // var contentMine = cell.isMine ? MINE : EMPTY;
            var cellClass = `hide cell-${i}-${j}`;
            strHtml += `<td class="cell ${cellClass}" onclick="cellClicked(this,${i},${j})"oncontextmenu="cellFlagged(this,${i},${j})">`
            strHtml += `</td>`

        }
        strHtml += '</tr>'
    }

    var elBoardCells = document.querySelector('.board-cells');
    elBoardCells.innerHTML = strHtml;
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if (!cell.isShown && !cell.isMine ||
                cell.isMine && !cell.isMarked) return;
        }
    }
    checkGameOver(true);
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    var negsSum = cell.minesAroundCount
    if (!gGame.isOn) return;
    if (cell.isMarked) return;
    if (gFirstClick) {
        startTheFun()
        if (cell.isMine) {
            var currCell = { i, j };
            gBoard = buildBoard(gBoard);
            renderMines(gBoard, currCell)
            setMinesNegsCount(gBoard)
            renderBoard()
            elCell = document.querySelector(`.cell${i}-${j}`)
        }
    }
    gFirstClick = false;
    if (cell.isShown = true) {
        elCell.classList.add('show')
        elCell.classList.remove('hide')
        if (cell.isMine) {
            elCell.innerText = MINE;
            alert('you lost!');
            //need to create this function 
            checkGameOver();
        } else {
            elCell.innerText = negsSum;
        }
    }
    else elCell.innerText = EMPTY
}



function cellFlagged(elCell, i, j) {

    if (!gBoard[i][j].isShown) {
        var cell = gBoard[i][j];
        if (!cell.isMarked) {
            elCell.classList.add('flag')
            cell.isMarked = true;
            elCell.innerText = FLAG;
        } else {
            elCell.classList.remove('unflag')
            elCell.classList.add('hide')
            cell.isMarked = false;
            elCell.innerText = cell.minesAroundCount;
            elCell.innerText = EMPTY;
        }

    }
    checkGameOver()
}

// function expandShown(board, elCell, i, j) {
//     var currCell = board[i][j];
//     currCell.isShown = true;
//     elCell.innerText = (currCell.minesAroundCount) ? currCell.minesAroundCount : EMPTY;
//     elCell.classList.add('hide')
//     // if the neighbors have mines start over
//     if (currCell.minesAroundCount) return;
//     else {
//         for (var i = i - 1; i <= i + 1; i++) {
//             for (var j = j - 1; j <= j + 1; j++) {
//                 if (i < 0 || i >= board.length ||
//                     j < 0 || j >= board[i].length ||
//                     i === i && j === j ||
//                     board[i][j].isMine ||
//                     board[i][j].isShown) continue;
//                 var elNegCell = document.querySelector('.cell-' + i + '-' + j);
//                 expandShown(board, elNegCell, i, j);
//             }
//         }
//         return;
//     }
// }



function playEasyLevel() {
    gLevel.mines = 2;
    gLevel.size = 4;
    init();
}
function playMediumLevel() {
    gLevel.mines = 12;
    gLevel.size = 8;
    init();
}
function playHardLevel() {
    gLevel.mines = 30;
    gLevel.size = 12;
    init();
}

function renderMines(board) {
    var numOfMines = gLevel.mines;
    for (var i = 0; i < numOfMines; i++) {
        var randomRow = getRandomInt(0, gLevel.size);
        var randomCol = getRandomInt(0, gLevel.size);
        var cell = board[randomRow][randomCol];
        if (cell.isMine) numOfMines++;
        cell.isMine = true;
        cell.minesAroundCount = MINE
        // console.log(cell)
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var negsSum = checkNeighbors(i, j, board);
            var cell = board[i][j];
            cell.minesAroundCount = (negsSum === 0) ? '' : negsSum;

        }
    }
    return board;
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
    gGame.secsPassed = (timePassed / 1000).toFixed(0)
    elLogTime.innerText = `${gGame.secsPassed}`
}

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);


function checkNeighbors(rowsI, colsJ, mat) {
    var neighborsCount = 0
    for (var i = rowsI - 1; i <= rowsI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colsJ - 1; j <= colsJ + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (j === colsJ && i === rowsI) continue
            if (mat[i][j].isMine) neighborsCount++
        }
    }
    // console.log(neighborsCount);
    return neighborsCount;
}


function firstClickisFun() {
    gTime = Date.now();
    gTimeInterval = setInterval(gameTimer, 10);
    gBoard = buildBoard();
    var cell = gBoard[gFirstPos.i][gFirstPos.j]
    if (cell.isMine) gameOver(false);
    setMinesNegsCount()
}
