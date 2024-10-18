const express = require('express');
const router = express.Router();
const City = require('../models/City'); // Ensure the path and file name are correct

// Example route to get all cities
router.get('/', async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add other routes as needed

module.exports = router;
