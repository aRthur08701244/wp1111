import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import Message from "../components/Message";
import { useChat } from "./hooks/useChat"
import { Tabs, Input } from "antd";
import ChatModal from "../components/ChatModal";
import {CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION} from "../graphql"

const makeName = (name, to) => { return String([name, to].sort().join('_')); };

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
    const { status, me, messages, setMessages, activeKey, setActiveKey, sendMessage, startChat, displayStatus, getChatBox, subscribeToMore, data } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]) // {label, children, key}
    // const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false) // ?
    const [modalOpen, setModalOpen] = useState(false)

    const msgRef = useRef(null) // ?
    const msgFooter = useRef(null) // ?

    const displayMessages = () => (
        messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
            ):(
            messages.map(({ name, body }, i) => ( // map 重要技巧
                <Message name={name} isMe={name===me} message={body} key={i} />
            )))
    )

    const scrollToBottom = () => {
      msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
    } // google查詢\?.

    const createChatBox = (activeKey) => {
      if (chatBoxes.some(({key}) => key === activeKey)) {
          console.log(chatBoxes.some(({key}) => key === activeKey))
          throw new Error(activeKey + "'s chat box has already opened.");
      }

      getChatBox({
        variables: {
          name1: me,
          name2: activeKey
        }
      });

      setMsgSent(true);
      return activeKey;
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
      scrollToBottom();
      setMsgSent(false)
    }, [msgSent])

    useEffect(() => {
      displayStatus(status)
    }, [status])

    useEffect( () => {
      if ((data) && (activeKey != '')) {
        const nameList = data.chatbox.name.split('_')
        const boxIndex = ((me == nameList[0]) ? (chatBoxes.findIndex(({key}) => key === nameList[1]))
                                              : (chatBoxes.findIndex(({key}) => key === nameList[0])))
        const boxName = ((me == nameList[0]) ? (nameList[1]) : (nameList[0]))

        setChatBoxes(chatBoxes => (
          chatBoxes.length == 0
          ?
          [{ label: activeKey, children: data.chatbox.messages.length === 0
            ?
            <ChatBoxWrapper>
              <p style={{ color: '#ccc' }}> No messages... </p>
              <FootRef ref={msgFooter} />
            </ChatBoxWrapper>
            :
            <ChatBoxWrapper>
              {data.chatbox.messages.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
              <FootRef ref={msgFooter} />
            </ChatBoxWrapper>
          , key: activeKey }]
          : (boxIndex == -1) 
            ?
            [...chatBoxes, { label: activeKey, children: data.chatbox.messages.length === 0
              ?
              <ChatBoxWrapper>
                <p style={{ color: '#ccc' }}> No messages... </p>
                <FootRef ref={msgFooter} />
              </ChatBoxWrapper>
              :
              <ChatBoxWrapper>
                {data.chatbox.messages.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
                <FootRef ref={msgFooter} />
              </ChatBoxWrapper>
              , key: activeKey }]
              :
              chatBoxes.map(({ label, children, key }) => {
                return {
                    label,
                    children: boxName === label 
                    ? (data.chatbox.messages.length === 0
                      ?
                      <ChatBoxWrapper>
                        <p style={{ color: '#ccc' }}> No messages... </p>
                        <FootRef ref={msgFooter} />
                      </ChatBoxWrapper>
                      :
                      <ChatBoxWrapper>
                        {data.chatbox.messages.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
                        <FootRef ref={msgFooter} />
                      </ChatBoxWrapper>) 
                    : children,
                    key,
                };
              })

        ))
      }

    }, [data] )

    const alterMessage = () => {
      sendMessage({variables: { name: me, to: activeKey, body: msg }}).then(() => {
        getChatBox({variables: {name1: me, name2: activeKey}})
      })
    }

    useEffect(() => {
      try {
        subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { from: me, to: activeKey },
            updateQuery: (prev, { subscriptionData }) => {
                // console.log(prev)
                if (!subscriptionData.data.chatbox) return prev;
                const newMessage = subscriptionData.data.chatbox.messages
                // console.log(prev)
                return {
                    chatBox: {
                        // name: makeName(me, activeKey),
                        messages: [...prev.chatbox.messages, newMessage],
                    }
                };
            }
        });
    } 
    catch (e) {}
    }, [data])

  
    return (
      <>
        <Title name={me} />
        <ChatBoxesWrapper
          tabPosition={'left'}
          tabBarStyle={{height: "150px", width: "110px"}}
          type="editable-card"
          activeKey={activeKey}
          items={chatBoxes}
          // items={[{label: 'Steven', children:[<Message name={'fds'} isMe={'fds'===me} message={'Hi'} key={0} />]}]}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        ></ChatBoxesWrapper>


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
  
        <Input.Search
          ref={msgRef}
          value={msg} // 這行
          onChange={(e) => setMsg(e.target.value)} // 跟這行“或許”可以省略
          enterButton="Send" // button 樣式
          placeholder="Type a message here..."
          onSearch={async (msg) => {
            if (!msg || !me) {
              displayStatus({
                type: 'error',
                msg: 'Please enter a message body.'
              })
            return
            }
            // sendMessage({variables: { name: me, to: activeKey, body: msg }})
            alterMessage()
            setMsg('')
            setMsgSent(true)
          }}
        ></Input.Search>
      </>
    )
}

export default ChatRoom;