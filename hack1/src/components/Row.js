/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let letters = ['', '', '', '', '']
    if (guess) letters = guess;

    return (
        <div className='Row-container' id={rowIdx}>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                {/* <div>{letters}</div> */}
                {/* <div id={`${rowIdx}-0`} key={`${rowIdx}-0`} className='Row-wordbox'>{letters[0]}</div>
                <div id={`${rowIdx}-1`} key={`${rowIdx}-1`} className='Row-wordbox'>{letters[1]}</div>
                <div id={`${rowIdx}-2`} key={`${rowIdx}-2`} className='Row-wordbox'>{letters[2]}</div>
                <div id={`${rowIdx}-3`} key={`${rowIdx}-3`} className='Row-wordbox'>{letters[3]}</div>
                <div id={`${rowIdx}-4`} key={`${rowIdx}-4`} className='Row-wordbox'>{letters[4]}</div> */}
                {letters.map(({char, color}, i) => ( color ?
                    <div id={`${rowIdx}-${i}`} key={`${rowIdx}-${i}`} className={'Row-wordbox '+color}>{char}</div> :
                    <div id={`${rowIdx}-${i}`} key={`${rowIdx}-${i}`} className='Row-wordbox'></div>
                ))}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;