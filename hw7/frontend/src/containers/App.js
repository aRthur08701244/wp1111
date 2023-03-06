import './App.css'
import { useEffect } from 'react'
import { useChat } from './hooks/useChat'
import styled from "styled-components";
import ChatRoom from './ChatRoom';
import SignIn from './Signin';

const Wrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 600px;
  margin: auto;
`;

const App = () => {
  const { signedIn } = useChat()

  return (
    <Wrapper>
      {signedIn ? <ChatRoom /> : <SignIn />}
    </Wrapper>
  )
}

export default App
