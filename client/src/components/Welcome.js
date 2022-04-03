import React, {useState, useEffect, useRef} from 'react';
import { renderMatches } from 'react-router';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const [name, setName] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome to Draw & Guess!</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={ (event) => setName(event.target.value)} /> </div>

                <Link onClick={event => (!name) ? event.preventDefault() : null } to={`/drawingRoom?name=${name}`}>
                    <button className="button mt-20 signIn" type="submit">Join</button>
                </Link>
                
            </div>
        </div>
        
    );
};

export default Welcome;