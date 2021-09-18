const logger = [

]


/* A Backtracking program in
Javascript to solve Sudoku problem */
 
function isSafe(board, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < board.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] === num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < board.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] === num)
        {
            return false;
        }
    }
 
    // Corresponding square has
    // unique number (box-clash)
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
 
    // If there is no clash, it's safe
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
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
    
    // No empty space left
    if (isEmpty)
    {
        return true;
    }
    
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        // const message  = `tentando ${num} na posicao ${row}-${col}`
        // logger.push({type: "LOG", message })
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
                // Replace it
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
         
        // Print solution
        console.info(puzzle)
        return logger
    }
    else
    {
        alert("no solution")
    }
     
}
 