const mongoose = require('mongoose');

// Define the schema for the College model
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // College name
    location: { type: String, required: true }, // City where the college is located
    location_url: { type: String, required: false }, // Optional URL related to the college
    naac_ranking: { type: String, required: false }, // NAAC ranking
    courses_offered: { type: [String], required: false }, // Array of courses offered
    fees: { type: Number, required: false }, // College fees
    mht_cet_cutoff: { type: Number, required: false }, // MHT-CET cutoff score
    spot_round_available: { type: Boolean, required: false } // Spot round availability
});

// Create the College model from the schema
const College = mongoose.model('College', collegeSchema);

// Export the College model
module.exports = College;
