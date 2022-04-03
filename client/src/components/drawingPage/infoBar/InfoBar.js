import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import socket from "../../socketConfig";
import logo from './draw&guessLOGO.png';
import './InfoBar.css';




const InfoBar = () => {
    
    // username drawing

    const [username, setUsername] = useState('');
    let isUserDrawing = false;

    useEffect (() => {
        socket.on('user-drawing-frontend', username => {
            setUsername(username);
        });

    }, []);

    
        if(username != ""){
            isUserDrawing = true;
            
        }
        else{
            isUserDrawing = false;
        }
  

    
    return(
       
            isUserDrawing ? (
                <div className="infoBarContainer">
                    <img src={logo} className="logo"/>
                    <p className="userDrawing">{username} is drawing...</p>
                </div>
            )
            :
            (
           
                <div className="infoBarContainer">
                    <Link to={`/`}>
                        <img src={logo} className="logo"/>
                    </Link>
                </div>
        
         
            )
    )
    
}

export default InfoBar;