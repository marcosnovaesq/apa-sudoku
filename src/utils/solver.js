const logger = [

]

 
function isSafe(board, row, col, num)
{
     
    // checa a linha (row-clash)
    for(let d = 0; d < board.length; d++)
    {
         
        // checa se o numero ja existe na linha
        // se sim retorna falso
        if (board[row][d] === num)
        {
            return false;
        }
    }
 
    // checa a coluna (column-clash)
    for(let r = 0; r < board.length; r++)
    {
          
        /// checa se o numero ja existe na coluna
        // se sim retorna falso
        if (board[r][col] === num)
        {
            return false;
        }
    }
 
    // checa o quadrado atual (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (board[r][d] === num)
            {
                return false;
            }
        }
    }
 
    // se o numero pode ficar na posicao retorna que esta seguro
    return true;
}
 
function solveSudoku(board, n)
{
    

    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
        {
            if (board[i][j] === 0)
            {
                row = i;
                col = j;
                // ainda tem alguns valores a serem preenchidos
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
    
    // se nao tem mais valores a serem preenchidos
    if (isEmpty)
    {
        return true;
    }
    
    // se ainda tem, backtrack para cada linha
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(board, row, col, num))
        {
            board[row][col] = num;
            const message  = `${num} esta ok na posicao ${row}-${col}`
            logger.push({type: "CHANGE", row, col, value: num, message})
            if (solveSudoku(board, n))
            {
                return true;
            }
            else
            {
                const message  = `${num} nao esta ok, backtrack na posicao ${row}-${col}`
                logger.push({type: "BACKTRACK", row, col, value: 0, message })
                // resetar aquela posiçao
                board[row][col] = 0;
            }
        }
    }
    return false;
}
 
export function solver(board, n){
    let puzzle = [...board]
    if (solveSudoku(puzzle, n))
    {
        return logger
    }
    else
    {
        alert("no solution")
    }
     
}
 