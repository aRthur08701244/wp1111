import { useState, useEffect, createContext, useContext } from "react";
import { message } from 'antd'

const LOCALSTORAGE_KEY = "save-me";
const saveMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    setMe: () => {},
    setSignedIn: () => {},
    setMessages: () => {},
    displayStatus: () => {}
})

const client = new WebSocket("ws://localhost:4001")
client.onopen = () => console.log("Backend socket server connected")

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(saveMe || '');
    const [signedIn, setSignedIn] = useState(false);

    const startChat = ({ name, to }) => {
        if (!name || !to) throw new Error("Name or to required.");
        sendData({
            type: 'chat',
            payload: {name, to}
        });
    };

    const sendData = async (data) => { // 用來跟後端溝通 這裡的 sendData 是 client.send()
        await client.send(
          JSON.stringify(data)); // stringfy() <=> parse() 送到 wsConnect.js 的 byteString 裡面
      };

    const sendMessage = ({name, to, body}) => {
    // update messages and status
        // setMessages([...messages, payload]);
        // setStatus({
        //     type: "success",
        //     msg: "Message sent." });
        if (!name || !to || !body) throw new Error("Name or to or body required.")
        sendData({type: "input", payload: {name, to, body}})
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [type, payload] = JSON.parse(data);
        
        switch (type) {
            case "init": {
                setMessages(payload);
                break;
            }
            case "output": {
                // console.log(type, payload)
                // setMessages((messages) =>
                // [...messages, ...payload]);
                // console.log(payload)
                setMessages(payload);
                break;
            }
            case "status": {
                setStatus(payload); break;
            }
            case "clear": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

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

     
    const clearMessages = () => { sendData(["clear"]); };

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);

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
                startChat,
                sendMessage,
                clearMessages,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext)

export {ChatProvider, useChat};