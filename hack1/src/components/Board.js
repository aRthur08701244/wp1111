/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React, { useEffect, useState, useRef } from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {

    // console.log(curGuess.length)

    const [guessLength, setGuessLength] = useState(0)
    const [guessID, setGuessID] = useState(0)

    const refContainer = useRef()

    useEffect(() => {
        setGuessLength(6 - guesses.map(row => row === undefined).filter(Boolean).length)
        console.log(guesses.filter(function( element ) {
            return element !== undefined;
         }))
        // console.log(guesses)
        // guesses.map(row => console.log(guesses.indexOf(row)))
    })

    // useEffect(() => {
    //     if (guessID < 5) { setGuessID(guessID+1) }
    //     console.log(guessID)
    //     console.log(refContainer.current)
    //     console.log(guessID === guessLength)
    // }, [refContainer.current])

    // guesses = ['abcde', '12345', '67890', 'abcde', '12345', '67890']
    return (
        <div className="Board-container" ref={refContainer}>
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}

            {/* <CurRow id={`row_${guessLength}`} key={`row_${guessLength}`} rowIdx={guessLength} curGuess={curGuess}/> */}
            
            {guesses.map((row, i) => ( i === (guessLength) ?
                <CurRow id={'row_'+i} key={'row_'+i} rowIdx={i} curGuess={curGuess} /> :
                <Row id={'row_'+i} key={'row_'+i} rowIdx={i} guess={row} />))}
            
            {/* {0===guessLength ? <CurRow id='row_0' key='row_0' rowIdx='0' curGuess={curGuess}/> : <Row id='row_0' key='row_0' rowIdx='0' guess={guesses[0]}/>}
            {1===guessLength ? <CurRow id='row_1' key='row_1' rowIdx='1' curGuess={curGuess}/> : <Row id='row_1' key='row_1' rowIdx='1' guess={guesses[1]}/>}
            {2===guessLength ? <CurRow id='row_2' key='row_2' rowIdx='2' curGuess={curGuess}/> : <Row id='row_2' key='row_2' rowIdx='2' guess={guesses[2]}/>}
            {3===guessLength ? <CurRow id='row_3' key='row_3' rowIdx='3' curGuess={curGuess}/> : <Row id='row_3' key='row_3' rowIdx='3' guess={guesses[3]}/>}
            {4===guessLength ? <CurRow id='row_4' key='row_4' rowIdx='4' curGuess={curGuess}/> : <Row id='row_4' key='row_4' rowIdx='4' guess={guesses[4]}/>}
            {5===guessLength ? <CurRow id='row_5' key='row_5' rowIdx='5' curGuess={curGuess}/> : <Row id='row_5' key='row_5' rowIdx='5' guess={guesses[5]}/>} */}
            
        </div>
    )
};
export default Board;
