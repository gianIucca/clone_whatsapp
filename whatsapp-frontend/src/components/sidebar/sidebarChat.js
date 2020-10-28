import React from 'react';
import './sidebarChat.css';
import { Avatar } from '@material-ui/core';

function sidebarChat() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className='sidebarChat--info'>
        <h2>Nome da Pessoa</h2>
        <p>Última mensagem enviada</p>
      </div>
    </div>
  );
}

export default sidebarChat;
