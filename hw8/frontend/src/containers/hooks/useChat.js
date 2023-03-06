import { useState, useEffect, createContext, useContext } from "react";
import { message } from 'antd'
import {useQuery, useMutation, useLazyQuery} from "@apollo/client"
import {CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION} from "../../graphql"

const LOCALSTORAGE_KEY = "save-me";
const saveMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},

    me: "",
    setMe: () => {},

    signedIn: false,
    setSignedIn: () => {},

    messages: [],
    setMessages: () => {},

    activeKey: "",
    setActiveKey: () => {},

    sendMessage: () => {},
    startChat: () => {},
    displayStatus: () => {},
    getChatBox: () => {},
    subscribeToMore: () => {},
    data: {}
})

// const client = new WebSocket("ws://localhost:4001")
// client.onopen = () => console.log("Backend socket server connected")

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(saveMe || '');
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const [activeKey, setActiveKey] = useState('')

    const [getChatBox, { data, loading, subscribeToMore }] = useLazyQuery(CHATBOX_QUERY, {fetchPolicy: 'cache-and-network'});
    // const [getChatBox, { data, loading, subscribeToMore }] = useLazyQuery(CHATBOX_QUERY);

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const displayStatus = (payload) => {
        if (payload.msg) {
            const {type, msg} = payload;
            const content = { content: msg, duration: 0.5
        }
        switch (type) {
            case 'success':
                message.success(content)
                break
            case 'error':
            // default:
                message.error(content)
                break
        }}
      }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);

    // useEffect(() => {
    //     console.log('subs')
    //     try {
    //         subscribeToMore({
    //             document: MESSAGE_SUBSCRIPTION,
    //             variables: { from: me, to: activeKey },
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 if (!subscriptionData.data) return prev;
    //                 const newMessage = subscriptionData.data.chatbox.messages
    //                 return {
    //                     chatBox: {
    //                         // name: 'Arthur_Steven',
    //                         messages: [...prev.chatbox.messages, newMessage],
    //                     }
    //                 };
    //             }
    //         });
    //     } 
    //     catch (e) {}
    // }, [subscribeToMore])

    return (
        <ChatContext.Provider
            value={{
                status,

                me,
                setMe,

                signedIn,
                setSignedIn,

                messages,
                setMessages,

                activeKey,
                setActiveKey,

                sendMessage,
                startChat,
                displayStatus,
                getChatBox,
                subscribeToMore,
                data
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext)

export {ChatProvider, useChat};