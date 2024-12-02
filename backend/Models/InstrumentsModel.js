const mongoose = require('mongoose');

const InstrumentsSchema = new mongoose.Schema({
  name: String,
});

// Create Instrument Model
const Instruments = mongoose.model("instruments", InstrumentsSchema);

// Seed Function
async function seedInstruments() {
  const instruments = [
    { name: "Guitar"},
    { name: "Piano"},
    { name: "Violin" },
    { name: "Flute" },
    { name: "Drum"},
  ];

  try {
    await Instruments.deleteMany({});
    await Instruments.insertMany(instruments);
    console.log("Instruments seeded successfully:", instruments);
  } catch (error) {
    console.error("Error seeding instruments:", error);
  }
}

// Export both the model and the seed function
module.exports = { Instruments, seedInstruments };