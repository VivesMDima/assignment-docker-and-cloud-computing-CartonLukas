import React, { useState } from 'react';
import './AddInstrument.css';  

function AddInstrument() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  
    setError('');

    try {
      
      const response = await fetch('http://localhost:3001/add-instrument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

     
      if (!response.ok) {
        
        const data = await response.json();
        throw new Error(data.message);
      }

      
      const data = await response.json();
      setMessage(data.message);
      setName('');  
    } catch (error) {
     
      setError(error.message);  
    }
  };

  return (
    <div className="add-instrument-container">
      <h2>Add New Instrument</h2>
      <form className="add-instrument-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Instrument Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Instrument</button>
      </form>

    
      {message && <p className="success-message">{message}</p>}

     
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddInstrument;
