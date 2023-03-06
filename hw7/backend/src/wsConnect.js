import { Message } from "./models/chatbox"
import { MessageModel, UserModel, ChatBoxModel } from "./models/chatbox";
import mongoose from "mongoose";

const sendData = (data, ws) => { // 這裡的 sendData 是 ws.send()
    ws.send(JSON.stringify(data)); 
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}
const broadcastMessage = (wss, ws, data, status) => {
    console.log(wss)
    // wss.clients.forEach((client) => {
    wss.forEach((client) => {
        sendData(data, client);
    });
    sendStatus(status, ws);
};

const makeName = (name, to) => { return String([name, to].sort().join('_')); };

const validateUser = async (name, to) => {
    let user1 = await UserModel.findOne({ name })
    if (!user1) user1 = await new UserModel({ name }).save();
    let user2 = await UserModel.findOne({ 'name': to })
    if (!user2) user2 = await new UserModel({ name: to }).save();
    return [user1._id, user2._id]
}

const validateChatBox = async (name, participants) => {
    console.log(ChatBoxModel)
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        console.log('New Chatbox Created')
        box = await new ChatBoxModel({ name, users: participants, messages: [] }).save();
    }
    else {
        console.log('Already Existed Chatbox')
    }
    box = await box.populate(["users", {path: 'messages', populate: 'sender' }])
    return { box }
    };

const chatBoxes = {}

export default {
    // initData: (ws) => {
    //     Message.find().sort({ created_at: -1 }).limit(100)
    //         .exec((err, res) => {
    //             if (err) throw err;
    //             // initialize app with existing messages
    //             sendData(["init", res], ws);
    //         });
    // },
    onMessage: (wss, ws) => (
        async (byteString) => {
            // console.log(JSON.parse(JSON.stringify(ws)))

            const { data } = byteString
            const {type, payload} = JSON.parse(data) // parse!!

            const reFresh = async (payload) => {
                // console.log(new mongoose.Types.ObjectId, new mongoose.Types.ObjectId)
                const { name, to } = payload
                // console.log(name)
                let [nameID, toID] = await validateUser(name, to)
                let { box } = await validateChatBox(makeName(name, to), [nameID, toID])
                if (!chatBoxes[makeName(name, to)]) chatBoxes[makeName(name, to)] = new Set();
                chatBoxes[makeName(name, to)].add(ws)
                
                let userDic = {}
                for (let i = 0; i < box['users'].length; i++) {
                    userDic[box['users'][i]['_id']] = box['users'][i]['name']
                }

                let payback = []
                // console.log(box)
                for (let i = 0; i < box['messages'].length; i++) {
                    let senderID = box['messages'][i]['sender']['_id']
                    if (name == userDic[senderID]) payback.push({'name': userDic[senderID], 'to': to, 'body':box['messages'][i]['body']})
                    else payback.push({'name': userDic[senderID], 'to': name, 'body':box['messages'][i]['body']})
                }
                // console.log(payback)
                // console.log(payback) // [{ name: 'Arthur', body: 'fds' } ... ]
                return payback
            }

            switch (type) {
                case 'chat': {
                    const { name, to, body } = payload
                    let payback = await reFresh(payload)
                    broadcastMessage(chatBoxes[makeName(name, to)], ws, ['init', payback], {type: 'success', msg: 'Chatroom created.'})
                    // broadcastMessage(ws, ['init', payback], {type: 'success', msg: 'Chatroom created.'})
                    break
                }
                case 'input': {
                    // console.log(name, to, body)
                    // const message = new Message({ name, to, body })
                    const { name, to, body } = payload
                    const box = await ChatBoxModel.findOne({ name: makeName(name, to)});
                    const sender = await UserModel.findOne({ name })
                    const senderID = sender._id
                    const message = new MessageModel({sender: senderID, body:body})
                    try { 
                        box['messages'].push(message._id)
                        await box.save()
                        await message.save();
                    } catch (e) { 
                        throw new Error ("Message DB save error: " + e);
                    }
                    let payback = await reFresh(payload)
                    broadcastMessage(chatBoxes[makeName(name, to)], ws, ['init', payback], {type: 'success', msg: 'Message sent.'})
                    // broadcastMessage(ws, ['init', payback], {type: 'success', msg: 'Message sent.'})
                    // console.log(payload) // { name: 'Arthur', to: 'Steven', body: 'fd' }
                    // broadcastMessage(wss, ['output', [payload]], {type: 'success', msg: 'Message sent.'})
                    break
                }
                // case 'clear': {
                //     Message.deleteMany({}, () => {

                //         // broadcastMessage(ws, ['cleared'], { type: 'info', msg: 'Message cache cleared.'})
                //     })
                //     break
                // }
                default: break
            }
        }
    )
}