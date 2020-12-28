'use strict';
function setMinesNegsCount(board,row,col) {
    var negsCount = 0; 
    for (var i = row -1 ; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col-1; j <= col + 1; j++) {
            var currCell = board[i][j]
            if (j < 0 || j >= board[0].length) continue;
            if(i === row && j === col)continue; 
            if(currCell.isMine) negsCount++   
        }
    }
    return negsCount;
}

function checkMinesAroundCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var neighborsSum = setMinesNegsCount(board,i,j)
            var cell= board[i][j]; 
            cell.minesAroundCount = (neighborsSum === 0) ? EMPTY : neighborsSum;
        }  
    } 
}

function expandShown(row, col) {
    // console.log('entered expandShown');
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (i === row && j === col) continue
            if (j < 0 || j >= gBoard[0].length) continue
            showCells(i, j);
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



