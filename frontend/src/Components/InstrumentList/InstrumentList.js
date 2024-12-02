import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './InstrumentList.css';

function InstrumentList() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstruments = async () => {
    try {
      const response = await fetch('http://localhost:3001/');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      setInstruments(data.map(instrument => instrument.name));
    } catch (error) {
      console.error('Error fetching instruments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstruments();
  }, []);

  return (
    <div className="instrument-list-container">
      <h1>Instrument List</h1>

      
      <div className="add-instrument-button-container">
        <Link to="/add" className="add-instrument-button">Add Instrument</Link>
      </div>

      {loading ? (
        <p>Loading instruments...</p>
      ) : (
        <ul className="instrument-list">
          {instruments.map((instrument, index) => (
            <li key={index} className="instrument-item">
              {instrument}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InstrumentList;
