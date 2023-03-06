/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState, useRef } from 'react';

const HomePage = ({ mineNumOnChange, boardSizeOnChange, mineNum, boardSize, setStartGame /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}

  const ShowPanel = () => {
    if (showPanel === false) setShowPanel(true)
    if (showPanel === true) setShowPanel(false)
  }

  const mineInput = useRef()
  const sizeInput = useRef()

  const onChange = () => {
      mineNumOnChange(mineInput.current.value)
      boardSizeOnChange(sizeInput.current.value)
  }

  const startGameOnClick = () => {
    setStartGame(true)
  }

  useEffect(() => {
    if (mineNum > boardSize*boardSize) {
      setError(() => true)
    }
    else {
      setError(() => false)
    }
  })


  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      { !error ? <button className='btn' onClick={startGameOnClick} >Start Game</button> : <button className='btn' >Start Game</button> }

      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>

        <button className='btn' onClick={ShowPanel}>
          Difficulty Adjustment
        </button>

        {showPanel ? 
            <div className='controlWrapper'>
              {error ? <div className='error' color='red' >ERROR: Mines number and board are invalid!</div> : <></>}
              <div className='controlPanel'>
        
                <div className='controlCol'>
                  <p className='controlTitle'>Mines number</p>
                  <input type="range" step="1" min = '1' max = '20' defaultValue = '10' ref={mineInput} onClick={onChange} />
                  <p className='controlNum' style={error ? {color: '#880000'} : {color: '#0f0f4b'} } >{mineNum}</p>
                </div>
        
                <div className='controlCol'>
                  <p className='controlTitle'>Board Size (nxn)</p>
                  <input type="range" step="1" min = '3' max = '13' defaultValue = '8' ref={sizeInput} onClick={onChange} />
                  <p className='controlNum' style={error ? {color: '#880000'} : {color: '#0f0f4b'} } >{boardSize}</p>
                </div>
        
              </div>
            </div>
        : <></>}

      </div>
      

    </div>
  );


}
export default HomePage;   