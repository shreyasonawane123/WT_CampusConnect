const mongoose = require('mongoose');

// Define the schema for the City model
const citySchema = new mongoose.Schema({
    location: { type: String, required: true }, // City name
    college_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }], // Array of college IDs
    location_url: { type: String, required: false } // Optional URL related to the city
});

// Create the City model from the schema
const City = mongoose.model('City', citySchema);

// Export the City model
module.exports = City;
