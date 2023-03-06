import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  deleteMessage: () => {},
});

const makeMessage = (message, color) => { // from array(or two object) to dictionary
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message) => {
    setMessages((messages) => ([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]));
    // console.log(messages)
  };

  const addRegularMessage = (...ms) => {
    setMessages((messages) => ([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]));
    // console.log(messages)
  };

  const addErrorMessage = (message) => {
    setMessages((messages) => ([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]));
  };

  const deleteMessage = async (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
    // console.log(messages)
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        deleteMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
