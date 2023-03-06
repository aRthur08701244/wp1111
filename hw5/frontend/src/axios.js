import axios from 'axios';

  const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
  
  const startGame = async(setHasStarted, setHasError) => {
    try{
        const {
            data: { msg }
        } = await instance.post('/start')

        if (msg == 'The game has started.') {setHasStarted(true)}
        else if (msg == '500 Internal Server Error (Not Able to Start)') {setHasError(true)}
        setHasError(false)

        return msg
    } catch (error) {
      setHasError(true)
      return '500 Internal Server Error (Not Able to Start)'}

  }
  
  const guess = async (number, tryy, setTryy, setHasError) => {
    try{
        const {
            data: { A, B }
        } = await instance.get('/guess', { params: {number} })
        
        setTryy(() => tryy+1)
        setHasError(false)
        return [A, B]
    } catch (e) {
        console.log(e)
        let error = e['message']
        if (error[error.length-3] == 4){
          let msg = 'ERROR: "' + String(number) + '" is NOT a valid number.'
          return msg
        }
        else if (error == 'Network Error'){
          setHasError(true)
          return '500 Internal Server Error (Not Able to Guess)'
        }
    }
  }

  const restart = async (setHasWon, setHasLost, setHasEnd, setStatus, setTryy, setHasError) => {
    try{
        const {
            data: { msg }
        } = await instance.post('/start')
        // console.log(msg)

        if (msg == 'The game has started.') {
            setHasEnd(false)
            setHasWon(false)
            setHasLost(false)
            setHasEnd(false)
            setTryy(0)

            setStatus('')
        }
        else if (msg == '500 Internal Server Error (Not Able to Start)') {setHasError(true)}

        return msg
    } catch (error) {return error}
  }

export { startGame, guess, restart }