import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { guess, startGame, restart } from './axios';



function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hasEnd, setHasEnd] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  const [tryy, setTryy] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // const insertRef = useRef();
  
  useEffect(() => {
    if (tryy === 10){
      setHasLost(true)
    }
  }, [tryy])

  useEffect(() => {
    if ((hasWon) || (hasLost)){
      setHasEnd(true)
    }
  }, [hasWon, hasLost])

  const startMenu = () => {
    return(
      <div className='startMenu'>
        <p className='gameTitle'> Game: 1A2B </p>
        <p className='gameRule'> Rule: You Only Have 10 Chances to guess a 4-digit number !  </p>
        <button className='startMenuBtn' onClick={detectStart}> {/* 很重要！！！ */}
          Start Game
        </button>
      </div>
    )
  }

  const errorMode = () => {
    return(
      <div className='errorMode'>
        <p className='errorMsg'>{errorMsg}</p>
      </div>
    )
  }

  const startMode = () => {
    return(
      <div className='startMode'>
        {hasError ? errorMode() : startMenu() }
      </div>
    ) 
  }

  const gameMode = () => {
    return(
      <div className='gameMode'>
        <p className='gameTitle'> Game: 1A2B </p>
        <p> Try: {tryy}/10 </p>

        <input
          onChange={detectText}
        ></input>

        <button
          onClick={handleGuess}
          disabled={!number}
        > Guess! </button>

        {(status.length == 2) 
        ? <p>A: {status[0]} | B: {status[1]}</p>
        : <p>{status}</p>}

      </div>
    )
  }

  const winningMode = () => {
    return(
      <div className='winningMode'>
        <p className='resultTitle'> You won! The number was {number} </p>
        <button className='startMenuBtn' onClick={async () => await restart(setHasWon, setHasLost, setHasEnd, setStatus, setTryy, setHasError)}> Restart </button> {/* 很重要！！！ */}
      </div>
    )
  }

  const losingMode = () => {
    return(
      <div className='losingMode'>
        <p className='resultTitle'> You lost! </p>
        <button className='startMenuBtn' onClick={async () => await restart(setHasWon, setHasLost, setHasEnd, setStatus, setTryy, setHasError)}> Restart </button> {/* 很重要！！！ */}
      </div>
    )
  }

  const endMode = () => {
    return(
      <div className='endMode'>
        {hasWon ? winningMode() : losingMode()}
      </div>
    )
  }

  const game = () => {
    if (hasError == true) {
      return(
        <div>
          {errorMode()}
        </div>
      )
    }
    else {
      return(
        <div>
          {hasEnd ? endMode() : gameMode()}
        </div>
      )
    }
    
  }

  const detectStart = async() => {
      const response = await startGame(setHasStarted, setHasError) // 重要！！！要等資料回來再下去，不然就會直接下去！！！
      if (response === '500 Internal Server Error (Not Able to Start)') {
        setHasError(true)
        setErrorMsg(response)
      }
      else {
        setHasError(false)
        clearInterval(detectStart)
      }
    }

  const detectText = (i) => {
    // console.log(i.currentTarget.value)
    setNumber(i.currentTarget.value)
  }

  const handleGuess = async() => {
    // console.log(i.currentTarget.value)
    const response = await guess(number, tryy, setTryy, setHasError) // 重要！！！要等資料回來再下去，不然就會直接下去！！！

    // const detectServer = setInterval(async() => {
    //   const response = await guess(number, tryy, setTryy, setHasError)
    //   if (response === '500 Internal Server Error (Not Able to Guess)') {
    //     setHasError(true)
    //     setErrorMsg(response)
    //   }
    //   else{
    //     setHasError(false)
    //     clearInterval(detectServer)
    //   }
    // }, 1000)

    // detectServer()
    if (response === '500 Internal Server Error (Not Able to Guess)') {
      setHasError(true)
      setErrorMsg(response)
    }

    if(response[0] === 4) setHasWon(true)
    else{
      setStatus(response)
      setNumber('')
    }
  }

  return (
    <div className='App'>
      {hasStarted ? game() : startMode() }
    </div>
  );
}

export default App;


