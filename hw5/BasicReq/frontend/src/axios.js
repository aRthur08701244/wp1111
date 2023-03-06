import axios from 'axios';

  const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
  
  const startGame = async(setHasStarted) => {
    try{
        const {
            data: { msg }
        } = await instance.post('/start')
        // console.log(msg)

        if (msg == 'The game has started.') {setHasStarted(true)}

        return msg
    } catch (error) {return error}

  }
  
  const guess = async (number) => {
    try{
        const {
            data: { msg }
        } = await instance.get('/guess', { params: {number} })
        
        return msg
    } catch (error) {
        let msg = 'ERROR: "' + String(number) + '" is Not a valid number.'
        return msg
    }
    
  }

  const restart = async (setHasWon, setStatus) => {
    try{
        const {
            data: { msg }
        } = await instance.post('/start')
        // console.log(msg)

        if (msg == 'The game has started.') {
            setHasWon(false) 
            setStatus('')
        }

        return msg
    } catch (error) {return error}
  }

export { startGame, guess, restart }