import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Message from "../components/Message";
import { useChat } from "./hooks/useChat"
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 400px;
  backgroubd: eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const ChatBoxWrapper = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
    left: 100px;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { me, messages, setMessages, sendMessage, startChat, status, displayStatus } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]) // {label, children, key}
    // const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false) // ?
    const [modalOpen, setModalOpen] = useState(false)
    const [activeKey, setActiveKey] = useState('') // 目前被點選的checkbox

    const msgRef = useRef(null) // ?
    const msgFooter = useRef(null) // ?

    const getDicIndex = (disList, key, value) => {
      for (let i = 0; i < disList.length; i++) {
          if (disList[i][key] === value) {return i;}
      }
    }

    const displayMessages = () => (
        messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
            ):(
            messages.map(({ name, body }, i) => ( // map 重要技巧
                <Message name={name} isMe={name===me} message={body} key={i} />
            )))
    )

    const renderChat = (chat) => {
      return(
      <ChatBoxWrapper>
        {(chat.length === 0)?(
          <p style={{ color: '#ccc' }}> No messages... </p>
        ):(
          chat.map(({ name, to, body }, i) => (<Message name={name} isMe={name===me} message={body} key={i} />)                          )
        )}
        <FootRef ref={msgFooter} />
      </ChatBoxWrapper>
      )
    }

    // const extractChat = (friend) => {
    //   return renderChat(
    //     messages.filter
    //       (({name, msg}) => ((name === friend) || (name === me))));
      // return [<Message name={"Arthur"} isMe={true} message={"body"} key={4} />, <Message name={"Arthur"} isMe={false} message={"body"} key={5} />]
    // }

    const scrollToBottom = () => {
      msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
    } // google查詢\?.

    const createChatBox = async (friend) => {
      if (chatBoxes.some(({key}) => key === friend)) {
          console.log(chatBoxes.some(({key}) => key === friend))
          throw new Error(friend + "'s chat box has already opened.");
      }
      startChat({ name: me, to: friend })
      // const chat = extractChat(friend);

      setChatBoxes([...chatBoxes,
        { label: friend, children: [], // children: chat is an array of DOM nodes)
          key: friend }]);
      setMsgSent(true);
      return friend;
    };
    

    const removeChatBox = (targetKey, activeKey) => {
      const index = chatBoxes.findIndex(({key}) => key === activeKey);
      const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
      
      setChatBoxes(newChatBoxes);
      return(
        activeKey ? 
          (activeKey === targetKey ?
            (index === 0 ?
            '' : chatBoxes[index - 1].key)
          : activeKey)
        : ''
      )
    };

    useEffect(() => {
      // console.log('here')
      // console.log(msgFooter)
      scrollToBottom();
      setMsgSent(false)
    }, [msgSent])

    useEffect(() => {
      displayStatus(status)
    }, [status])

    useEffect( () => {

      if ((activeKey != '') && (chatBoxes.length > 0) && (messages[0])){

        if (me == messages[0]['name']) {
          let boxIndex = getDicIndex(chatBoxes, 'label', messages[0]['to'])
          let children = renderChat(messages)
          chatBoxes[boxIndex]['children'] = children
        }
        else {
          let boxIndex = getDicIndex(chatBoxes, 'label', messages[0]['name'])
          let children = renderChat(messages)
          chatBoxes[boxIndex]['children'] = children
        }
        
      }
    }, [messages])

  
    return (
      <>
        <Title name={me} />
        <ChatBoxesWrapper
          tabBarStyle={{height: "36px"}}
          type="editable-card"
          activeKey={activeKey}
          items={chatBoxes}
          // items={[<Message name={'fds'} isMe={'fds'===me} message={'Hi'} key={0} />]}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        ></ChatBoxesWrapper>
        {/* <ChatBoxWrapper>
            {displayMessages()}
            <FootRef ref={msgFooter} />
        </ChatBoxWrapper> */}


        <ChatModal
          open={modalOpen}
          onCreate={({ name }) => {
            setActiveKey(name)
            createChatBox(name)
            setModalOpen(false)
          }}
          onCancel={() => {
            setModalOpen(false)
          }}
        />
  
        {/* <Input 
          placeholder='Username'
          value={username} // 這行
          onChange={(e) => setUsername(e.target.value)} // 跟這行“或許”可以省略
          style={{ marginBottom: 10 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              msgRef.current.focus()
            }
          }}>
        </Input> */}
  
        <Input.Search
          ref={msgRef}
          value={msg} // 這行
          onChange={(e) => setMsg(e.target.value)} // 跟這行“或許”可以省略
          enterButton="Send" // button 樣式
          placeholder="Type a message here..."
          onSearch={async (msg) => {
            // console.log("What!!!")
            if (!msg || !me) {
              displayStatus({
                type: 'error',
                msg: 'Please enter a message body.'
              })
            return
            }
            // console.log(username, activeKey, msg)
            sendMessage({ name: me, to: activeKey, body: msg })
            setMsg('')
            setMsgSent(true)
          }}
        ></Input.Search>
      </>
    )
}

export default ChatRoom;