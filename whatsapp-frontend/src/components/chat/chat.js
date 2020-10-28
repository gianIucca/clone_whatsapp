import React, { useState } from 'react';
import './chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import {
  SearchOutlined,
  MoreVert,
  AttachFile,
  SettingsInputAntenna,
} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../../axios';

function Chat({ messages }) {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: 'Amigo',
      timestamp: '11:50',
      received: true,
    });

    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat--header'>
        <Avatar className='chat--emoticon' />

        <div className='chat--headerInfo'>
          <h3>Nome da Pessoa</h3>
          <p>Ultima vez visto: ...</p>
        </div>

        <div className='chat--headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className='chat--body'>
        {messages.map((message) => (
          <p
            className={`chat--message ${message.received && 'chat--receiver'}`}
          >
            <span className='chat--name'>{message.name}</span>
            {message.message}
            <span className='chat--timestamp'>{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className='chat--footer'>
        <InsertEmoticonIcon className='chat--emoticon' />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Digite a sua mensagem'
          />
          <button onClick={sendMessage} type='submit'>
            Envie a mensagem
          </button>
        </form>
        <MicIcon className='chat--emoticon' />
      </div>
    </div>
  );
}

export default Chat;
