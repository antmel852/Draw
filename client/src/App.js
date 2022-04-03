import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Welcome from './components/Welcomee';
import DrawingPage from './components/drawingPage/DrawingPage';
import { Routes } from 'react-router';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Welcome />} />
                <Route path="/drawingRoom" element={<DrawingPage />}/>    
            </Routes>

        </Router>
    );
};

export default App;