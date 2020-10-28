import React from 'react';
import './sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './sidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar--header'>
        <Avatar
          src='../../../public/avatar-icon.png'
          className='chat--emoticon'
        />
        <div className='sidebar--headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar--search'>
        <div className='sidebar--searchContainer'>
          <SearchOutlined />
          <input placeholder='Procure uma conversa' type='text' />
        </div>
      </div>
      <div className='sidebar--chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
