/******* User Schema *******/
import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM

const MessageSchema1 = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    to: {
        type: String,
        required: [true, 'Name field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
})
const Message = mongoose.model('message', MessageSchema1)


/******* User Schema 可省略此 Schema *******/
const UserSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    // chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }], // ref: foreign key
})
const UserModel = mongoose.model('User', UserSchema);

/******* ChatBox Schema *******/
const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

/******* Message Schema *******/
const MessageSchema = new Schema({
    // chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' }, /* 可省略 */
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: [true, 'Body field is required.'] },
});
const MessageModel = mongoose.model('Message', MessageSchema);

export {MessageModel, UserModel, ChatBoxModel, Message}