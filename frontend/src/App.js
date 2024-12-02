import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InstrumentList from './Components/InstrumentList/InstrumentList';
import AddInstrument from './Components/AddInstrument/AddInstrument';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Instrument</Link>
        </nav>

        <header className="App-header">
          <Routes>
            <Route path="/" element={<InstrumentList />} />
            <Route path="/add" element={<AddInstrument />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
