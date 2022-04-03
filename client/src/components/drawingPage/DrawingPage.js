import React, {useState, useEffect, useRef} from 'react';
import querystring from 'query-string';
import socket from '../socketConfig'

import Chat from './chat/Chat';
import Users from './users/Users'
import Canvas from './canvas/Canvas';

import './DrawingPage.css';
import InfoBar from './infoBar/InfoBar';
import { useLocation } from 'react-router';

const DrawingPage = ({ location }) => {
    location  = useLocation();
    const [name, setName] = useState('');

    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  

    useEffect( () => {
        const data = querystring.parse(location.search);
        const {name} = data;
        setName(name);
      
        socket.emit('join', {name}, (error) => {
            if(error){
                alert(error);
            }
        })

    }, [location.search]);


    useEffect(()=>{
        socket.on('message', (message) => {

            setMessages(messages => [...messages, message])
        });

        socket.on('usersList', ({ tempUsers }) => {
            setUsers(tempUsers);
        });

        return () => { 
            socket.close();
        }
        
    }, [])


    // Sending Messages function
    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    
    return (
        
        <div>
            <InfoBar className="infoBar"/>
            <Users className="users" users={users}/>
            <div className="outer-canvas">
                <Canvas name={name} socket={socket}/>
            </div>
            <Chat className="chat" name={name} setMessage={setMessage} message= {message} messages={messages} setMessages={setMessages} sendMessage={sendMessage} />
        </div>
    );
};

export default DrawingPage;