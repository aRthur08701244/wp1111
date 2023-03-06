/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal2';
import createBoard from '../util/createBoard'; // default (boardSize, mineNum)
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // 一個兩個維度的向量，用來儲存板子。 An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(boardSize*boardSize - mineNum);        // 一個用來儲存非'💣'的整數 An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // 一個用來儲存所有'💣'的座標向量 An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // 一個用來剩餘'旗子'的整數An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.

        setBoard(() => newBoard['board'])
        setMineLocations(() => newBoard['mineLocations'])
        setRemainFlagNum(() => mineNum)
        setNonMineCount(() => boardSize*boardSize - mineNum)

    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (e.type === 'contextmenu'){
            // console.log(newBoard, newFlagNum)
            if (board[x][y].revealed) { return }
            else {
                if (board[x][y].flagged) {
                    newBoard[x][y].flagged = false
                    setBoard(() => newBoard)
                    setRemainFlagNum(() => newFlagNum+1)
                }
                else {
                    newBoard[x][y].flagged = true
                    setBoard(() => newBoard)
                    setRemainFlagNum(() => newFlagNum-1)
                }
            }
        }

    };

    const revealCell = (x, y) => {
        console.log(nonMineCount)
        console.log(board)

        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

        let newNonMineCount = nonMineCount;
        let afterRevealed = revealed(newBoard, x, y, newNonMineCount)
        setBoard(() => afterRevealed['board'])
        setNonMineCount(() => afterRevealed['newNonMinesCount'])

        if (board[x][y].value === '💣') { setGameOver(() => true) }
        if (afterRevealed['newNonMinesCount'] == 0) { setWin(true) }
        
    };

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                { (win || gameOver) ? <Modal restartGame={restartGame} backToHome={backToHome} win={win} /> : <></> }

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                {/* <h1>This is the board Page!</h1> */}  {/* This line of code is just for testing. Please delete it if you finish this function. */}
                <div className='boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {board.map(row => 
                        <div className={`row${board.indexOf(row)}`} style={{display:'flex'}} key={board.indexOf(row)}>
                            {row.map(item =>
                                <Cell rowIdx={item['x']} colIdx={item['y']} detail={item} updateFlag={updateFlag} revealCell={revealCell} key={row.indexOf(item)} />)}
                        </div>)}
                </div>

            </div>
        </div>
    );


}

export default Board