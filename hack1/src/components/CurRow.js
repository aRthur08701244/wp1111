/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = ['', '', '', '', '']
    let lettersLength = 0
    if (curGuess) {
        // letters.slice(0, curGuess.length) = curGuess.split('');
        let curGuessLetters = curGuess.split('');
        for (let i = 0; i < curGuess.length; i++) {
            letters[i] = curGuessLetters[i]
        }
        lettersLength = curGuess.length
    }

    return (
        <div className='Row-container' id={rowIdx}>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {/* <div id={`${rowIdx}-0`} key={`${rowIdx}-0`} className='Row-wordbox'>{letters[0]}</div>
                <div id={`${rowIdx}-1`} key={`${rowIdx}-1`} className='Row-wordbox'>{letters[1]}</div>
                <div id={`${rowIdx}-2`} key={`${rowIdx}-2`} className='Row-wordbox'>{letters[2]}</div>
                <div id={`${rowIdx}-3`} key={`${rowIdx}-3`} className='Row-wordbox'>{letters[3]}</div>
                <div id={`${rowIdx}-4`} key={`${rowIdx}-4`} className='Row-wordbox'>{letters[4]}</div> */}
                {letters.map((letter, i) => ((i < lettersLength) ?
                    <div id={`${rowIdx}-${i}`} key={`${rowIdx}-${i}`} className='Row-wordbox filled'>{letter}</div> :
                    <div id={`${rowIdx}-${i}`} key={`${rowIdx}-${i}`} className='Row-wordbox'>{letter}</div>
                ))}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
