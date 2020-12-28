'use strict';
function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    var cell = gBoard[i][j];
    if (cell.isMarked) return;
    if (gFirstClick) {
        setGameTimer();
        if (cell.isMine) {
            console.log('entered first click-isMine');
            var currCell = { i, j }
            gBoard = buildBoard();
            addMines(gBoard, currCell);
            checkMinesAroundCount(gBoard);
            renderBoard(gBoard)
            elCell = document.querySelector(`.cell-${i}-${j}`)
            cell.isMine = false;
        } else {
            showCells(i, j)
        }
    }
    if (gIsHint && gHints) {
        console.log('cell clicked for hint');
        checkNegsForHint(i, j, gBoard)
        return;
    }
    gFirstClick = false;
    showCells(i, j)
    if (cell.isMine) isGameOver(false)
    checkGameOver()
}

// marks flag with right click 
function cellFlagged(elCell, i, j) {
    var elBoard = document.querySelector('.board')
    elBoard.addEventListener('contextmenu', ev => {
        ev.preventDefault()
    })
    var cell = gBoard[i][j];
    gFirstClick = false;
    if (!cell.isShown) {
        if (!cell.isMarked) {
            cell.isMarked = true;
            elCell.innerText = FLAG;
            elCell.classList.add('flag')
            gGame.flaggedCount++
            // console.log(cell.isMarked)
        } else {
            elCell.classList.remove('unflag')
            elCell.classList.add('hide')
            cell.isMarked = false;
            elCell.innerText = EMPTY;
        }
    }
    checkGameOver()
}

function gameTimer() {
    var currTime = Date.now();
    var elLogTime = document.querySelector('.time-log');
    var timePassed = currTime - gTime;
    gGame.secsPassed = (timePassed / 1000).toFixed(0)
    elLogTime.innerText = `${gGame.secsPassed}`
}


function setGameTimer() {
    gTime = Date.now();
    gTimeInterval = setInterval(gameTimer, 10);
    var elLogSc = document.querySelector('.time-log')
    elLogSc.style.fontSize = '20px'
}

function showCell(i, j) {
    // console.log('entered show cell', i, j);
    var cell = gBoard[i][j];
    cell.isShown = true;
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.classList.remove('hide')
    elCell.classList.add('show')
    elCell.innerText = cell.isMine ? MINE : (cell.minesAroundCount ? cell.minesAroundCount : EMPTY);
}

function showCells(i, j) {
    // console.log('entered show cells');
    var cell = gBoard[i][j];
    if (!cell.isShown && !cell.isMarked) {
        // console.log('entered first condition');
        showCell(i, j);
        if (!cell.isMine) gGame.shownCount++;
        if (cell.minesAroundCount === EMPTY) expandShown(i, j);
    }
}

function isGameOver(isWin) {
    gGame.isOn = false;
    clearInterval(gTimeInterval);
    if (!isWin) {
        showMines(gBoard);
        var elSmiley = document.querySelector('.restart');
        elSmiley.innerText = DEAD;
        console.log('you lose!');
    } else if (isWin) {
        var elSmiley = document.querySelector('.restart');
        elSmiley.innerText = COOL;
        console.log('You win!')

    }
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j];
            if (!cell.isMine && !cell.isShown || cell.isMine && !cell.isMarked) return
        }
    }
    isGameOver(true)
}

function createHints() {
    var hints = 3;
    for (var i = 0; i < hints; i++) {
        gHints.push(i)
    }
    renderHints(hints)
}

function renderHints(hints) {
    var strHTML = '';
    for (var i = 0; i < hints; i++) {
        strHTML += `<button class="hints${i}" onclick="getHints(this,${i})">${HINT}</button>`
    }
    var elHint = document.querySelector('.hints')
    elHint.innerHTML = strHTML;
}


function getHints(elHint, i) {
    console.log('entered gethints');
    if (!gHints.includes(i)) return;
    gHints.splice(i, 1);
    gIsHint = true;
    elHint.style.opacity = '50%';
    elHint.onclick = '';
}

function checkNegsForHint(cellI, cellJ, board) {
    console.log('entered check negs for hint');
    // debugger
    var shownHints = [];
    var hintCell = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            hintCell++
            var currCell = board[i][j];
            if (currCell.isShown === true) {
                console.log('currcell is shown', currCell);
                shownHints.push(currCell)
                continue;
            }
            currCell.isShown = true;
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.remove('hide')
            elCell.classList.add('show')
            elCell.innerText = currCell.isMine ? MINE : (currCell.minesAroundCount ? currCell.minesAroundCount : EMPTY)
        }
    }
    console.log('shownHints', shownHints)
    setTimeout(removeHint, 2000, cellI, cellJ, board, shownHints)
}

function removeHint(cellI, cellJ, board, shownHints) {
    console.log('entered removeHint');
    var hintCell = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            hintCell++;
            var currCell = board[i][j];
            if (shownHints.includes(currCell)) continue;
            currCell.isShown = false;
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            elCell.classList.add('hide')
            elCell.classList.remove('show')
            elCell.innerText = '';
        }
    }
    gIsHint = false;
}