/**
 * Runs a game of connect-4, and generating the moves for player 2
 *
 * @author: Reese J Bunker
 */

//Global Variables 


/** 0<---------( x )---------6
 *  0   6   12  18  24  30  36   0
 *  1   7   13  19  25  31  37   ^
 *  2   8   14  20  26  32  38 ( y )
 *  3   9   15  21  27  33  39   |
 *  4   10  16  22  28  34  40   V
 *  5   11  17  24  29  35  41   5
 */
const board = new Array(42);    //Game Board

var gameOver = false;           //Global Variable for if the game is over

//When four.js is first run
initializeBoard();       
drawBoard();
 
/**
 * Returns board index for an x and y pair
 *
 * @param {number} x The x coordinate on board
 * @param {number} y The y coordinate on board
 * @return {number} corresponding array location
 */
function boardIndex(x, y)
{
    return (x * 7) + y;
}

/**
 * Draws the connect 4 board on the canvas
 */
function drawBoard()
{
    const canvas = document.getElementById("connect4");  
    var pieceSize = .375;
    
    if (canvas.getContext) {                                    //If the canvas exists
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);       //clean the canvas
        ctx.fillStyle = "#230007";                    //Blue color
        ctx.fillRect(0, 0, canvas.width, (canvas.width/7) * 6); //Draw's blue board       
        var diameter = canvas.width/7;                          //Diameter of the circle given board width

        for (let y = 0; y < 6; y++)         //Each space on the board
        {
            for (let x = 0; x < 7; x++)
            {
                ctx.beginPath();
                        //(center.x, center y, size, start angle, end angle)
                ctx.arc((x * diameter) + (diameter/2), (y * diameter)+(diameter/2), diameter*pieceSize, 0, 2 * Math.PI)  //Draw a circle 

                if (board[boardIndex(x, y)] == 1)                      //Player one is yellow
                {
                    ctx.fillStyle = "#FFEC51";   
                }
                else if (board[boardIndex(x, y)] == 2)                 //Player 2 is red
                {
                    ctx.fillStyle = "#D10000";
                }
                else                                                    //empty space
                {
                    ctx.fillStyle = "#7C6354";
                }
                ctx.fill();
            }
        }
    }
}

/**
 * Initializes board to the starting position 
 */
function initializeBoard()
{
    for (let x = 0; x < 7; x++)
    {
        for (let y = 0; y < 6; y++)
        {
            board[boardIndex(x, y)] = 0;
        }
    }
}

/**
 * This function is called when a player presses a button to play
 *
 * @param {number} x the row the player would like to play
 */
function doTurn(x)
{
    if (gameOver == 1)
    {
        document.getElementById("Score").innerHTML = "winner: p" + turn;
        return -1;
    }
    while (makeMove(x, board, 1) == -1)
    {
    }
    if (checkBoard(board) == 1)
    {
        document.getElementById("Score").innerHTML = "winner: p" + 1;
        gameOver = 1;
        return 1;
    }
    turn = 2
    makeMove(opponentMove(), board, 2);
    if (checkBoard(board) == 2)
    {
        document.getElementById("Score").innerHTML = "winner: p" + 2;
        gameOver = 1;
        return 1;
    }
    turn = 1;
    document.getElementById("Score").innerHTML = "score: " + score(board);
}

/**
 * Place
 *
 * @param {number} x The column to place the piece
 * @param {array} inBoard the board to place the piece
 * @param {number} turn who's piece to place.
 * @return {number} 0: Success, 1: Illegal move
 */
function makeMove(x, inBoard, turn)
{
    if (inBoard[boardIndex(x, 0)] != 0 || gameOver == 1)
    {
        return -1;
    }
    for (let y = 5; y >= 0; y--)
    {
        if (inBoard[boardIndex(x, y)] == 0)
        {
            inBoard[boardIndex(x, y)] = turn;
            drawBoard();
            return 0;
        }
    }
}
function opponentMove()
{
    bestScore = 100; // This score is definitely not possible
    bestRow = -1;
    var tempBoard = new Array(42);
    for (let x = 0; x < 7; x++) //Checking each possible move
    {
        tempBoard = board.slice();
        if (makeMove(x, tempBoard, 2) != -1)
        {
            var val = minMax(tempBoard, 4, true, 1);
            if (val < bestScore)
            {
                bestScore = val;
                bestRow = x;
            }
            console.log(x + ": " + val);
        }
        else 
        {
            console.log(x + " is not a valid move");
        }
        
    }
    
    return bestRow;
}
function minMax(inBoard, depth, maximize, turn)
{
    var max = -42;
    var min = 42;
    var tempBoard = inBoard.slice();
    var currentScore = score(inBoard)
    if (depth == 0 || currentScore == 42 || currentScore == -42)
    {
        return score(inBoard);
    }
    if (maximize)
    {
        for (let x = 0; x < 7; x++) //Checking each possible move
        {
            tempBoard = inBoard.slice();
            makeMove(x, tempBoard, turn);
            var tempMax = minMax(tempBoard, depth - 1, false, 2);
            if (tempMax > max)
            {
                max = tempMax;
            }
        }
        return max;
    }
    else
    {
        for (let x = 0; x < 7; x++) //Checking each possible move
        {
            tempBoard = inBoard.slice();
            makeMove(x, tempBoard, turn);
            var tempMin = minMax(tempBoard, depth - 1, true, 1);
            if (tempMin < min)
            {
                min = tempMin;
            }
        }
        return min;
    }
}
function drawWinner()
{
    ctx.beginPath();
    ctx.arc((x * diameter) + (diameter/2), (y * diameter)+(diameter/2), diameter*.375, 0, 2 * Math.PI)
    if (board[boardIndex(x, y)] == 1)
    {
        ctx.fillStyle = "rgb(249, 219, 109)";
    }
    else if (board[boardIndex(x, y)] == 2)
    {
        ctx.fillStyle = "rgb(232, 49, 81)";
    }
    else
    {
        ctx.fillStyle = "rgb(225, 242, 254)";
    }
    ctx.fill();
}

function score(testBoard)
{
    var score = 0;
    var winner = checkBoard(testBoard);
    if (winner == 1)
    {
        return 42;
    }
    else if (winner == 2)
    {
        return -42;
    }
    for (let x = 0; x < 42; x++)
    {
        if(testBoard[x] == 0)
        {           //Initializing the winning square array
            testBoard[x] = 1;
            if(checkBoard(testBoard) == 1)
            {
                score++;
            }
            testBoard[x] = 2;
            if(checkBoard(testBoard) == 2)
            {
                score--;
            }
            testBoard[x] = 0;
        }
        
    }
    return score;
}
function checkBoard(inBoard)
{
    var winner = 0;
    for (let x = 0; x < 7; x++)
    {
        for(let y = 0; y < 6; y++)
        {
            winner = inBoard[boardIndex(x, y)];
            if (winner != 0)
            {
                if (x < 4)
                {
                    if (inBoard[boardIndex(x+1, y)] == winner && inBoard[boardIndex(x+2, y)] == winner && inBoard[boardIndex(x+3, y)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3)
                {
                    if (inBoard[boardIndex(x, y+1)] == winner && inBoard[boardIndex(x, y+2)] == winner && inBoard[boardIndex(x, y+3)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3 && x < 4)
                {
                    if (inBoard[boardIndex(x+1, y+1)] == winner && inBoard[boardIndex(x+2, y+2)] == winner && inBoard[boardIndex(x+3, y+3)] == winner)
                    {
                        return winner;
                    }
                }
                if (y < 3 && x > 2)
                {
                    if (inBoard[boardIndex(x-1, y+1)] == winner && inBoard[boardIndex(x-2, y+2)] == winner && inBoard[boardIndex(x-3, y+3)] == winner)
                    {
                        return winner;
                    }
                }
            }
        }
    }
    return -1;
}