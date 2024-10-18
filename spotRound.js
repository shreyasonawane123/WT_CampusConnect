const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a model for your spot rounds
const SpotRound = mongoose.model('SpotRound', new mongoose.Schema({
    name: String,
    date: String,
    details: String,
}));

// Endpoint to fetch spot round data
app.get('/api/spot-rounds', async (req, res) => {
    try {
        const spotRounds = await SpotRound.find();
        res.json(spotRounds);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
