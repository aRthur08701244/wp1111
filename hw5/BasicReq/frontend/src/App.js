import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { guess, startGame, restart } from './axios';



function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  // const insertRef = useRef();
  

  useEffect(() => {

  })

  const startMenu = () => {
    return(
      <div>
        <button onClick={async () => await startGame(setHasStarted) }> {/* 很重要！！！ */}
          Start Game
        </button>
      </div>
    )
  }

  const gameMode = () => {
    return(
      <>
        <p> Guess a number between 1 to 100 </p>

        <input
          onChange={detectText}
        ></input>

        <button
          onClick={handleGuess}
          disabled={!number}
        > Guess! </button>

        <p>{status}</p>
      </>
    )
  }

  const winningMode = () => {
    return(
      <>
        <p> You won! The number was {number} </p>
        <button onClick={async () => await restart(setHasWon, setStatus)}> Restart </button> {/* 很重要！！！ */}
      </>
    )
  }

  const game = () => {
    return(
      <div>
        {hasWon ? winningMode() : gameMode()}
      </div>
    )
  }

  const detectText = (i) => {
    // console.log(i.currentTarget.value)
    setNumber(i.currentTarget.value)
  }

  const handleGuess = async(i) => {
    // console.log(i.currentTarget.value)
    const response = await guess(number) // 重要！！！要等資料回來再下去，不然就會直接下去！！！
    if(response === 'Equal') setHasWon(true)
    else{
      setStatus(response)
      setNumber('')
    }

  }

  return (
    <div className='App'>
      {hasStarted ? game() : startMenu() }
    </div>
  );
}

export default App;


