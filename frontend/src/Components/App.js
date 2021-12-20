import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Gateways from './Gateways.js';
import Gateway from './Gateway.js';
import './../App.css';

function App() {
    return (
      <Routes>
        <Route path='/' element={<Gateways />} />
        <Route path='/gateways' element={<Gateways />} />
        <Route path='/gateways/:id' element={<Gateway />} />
      </Routes>
    );
}

export default App;
