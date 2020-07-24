'use strict';
function setMinesNegsCount(board,row,col) {
    var negsCount = 0; 
    for (var i = row -1 ; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = col-1; j <= col + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if(i === row && j === col)continue
            if(board[i][j].isMine) negsCount++
            
        }
    }
    return negsCount;
}

function changeMinesAroundCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell= board[i][j]; 
            cell.minesAroundCount = setMinesNegsCount(board,i,j)

        }  
    }     
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}



document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

