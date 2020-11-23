import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import './Chat.css';
import SelectInput from "@material-ui/core/Select/SelectInput";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from './StateProvider';

const Chat = () => {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [{ user }, dispatch] = useStateValue();
  
    useEffect(() => {
      setSeed(Math.random() * 5000);
    }, []);
  
    useEffect(() => {
      if (roomId) {
        db.collection('rooms')
          .doc(roomId)
          .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
  
        db.collection('rooms')
          .doc(roomId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          );
      }
    }, [roomId]);
  
    const sendMessage = (event) => {
      event.preventDefault();
      db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput('');
    };
  
    return (
      <div className='chat'>
        <div className='chat__header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='chat__header--info'>
            <h2>{roomName}</h2>
            <p>
              last seen at-
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p>
          </div>
          <div className='chat__header--right'>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className='chat__body'>
          {messages.map((message) => (
            <p
              key={Math.random()}
              className={`chat__message ${
                message.name === user.displayName && 'chat__reciever'
              } `}
            >
              <span className='chat__name'>{message.name}</span>
              {message.message}
              <span className='chat__timestamp'>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
        </div>
  
        <div className='chat__footer'>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <form>
            <input
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder='Type a message'
            />
            <button type='submit' onClick={sendMessage}>
              I'm invisible
            </button>
          </form>
          <IconButton>
            <MicIcon />
          </IconButton>
        </div>
      </div>
    );
  };
  
  export default Chat;
  