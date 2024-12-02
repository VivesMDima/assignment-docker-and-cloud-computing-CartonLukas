const express = require('express');
const mongoose = require('mongoose');
const { Instruments, seedInstruments } = require('./Models/InstrumentsModel'); // Destructure both exports
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3001;


//docker run --rm -ti -p 27017:27017 mongo
let connectWithRetry = function() {
  return mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/instrumentsdb')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => {
      console.error('Failed to connect to mongo on startup - retrying in 1 sec', error);
      setTimeout(connectWithRetry, 1000);
    });
};
connectWithRetry();

// Wait 1.5 seconds and seed the MongoDB with the placeholder instruments
setTimeout(seedInstruments, 1500); // Pass function reference

// The / endpoint to get instruments
app.get("/", async (req, res) => {
  try {
    const instruments = await Instruments.find(); 
    res.send(instruments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instruments", error });
  }
});



app.post("/add-instrument", async (req, res) => {
  const { name } = req.body; 
  

  if (!name) {
    return res.status(400).json({ message: "Instrument name is required" });
  }

  try {
    
    const existingInstrument = await Instruments.findOne({ name });
    if (existingInstrument) {
      return res.status(400).json({ message: "Instrument already exists" });
    }

   
    const newInstrument = new Instruments({ name });
    await newInstrument.save();

    
    res.status(201).json({ message: "Instrument added successfully", instrument: newInstrument });
  } catch (error) {
    res.status(500).json({ message: "Error adding instrument", error });
  }
});


// Start Node server and listen on the specified port
app.listen(port, () => {
  console.log(`Instruments API listening on port ${port}`);
});


