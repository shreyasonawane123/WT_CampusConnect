// routes/counselling.js
const express = require('express');
const router = express.Router();
const Counselling = require('../models/CounsellingDetails'); // Import the counselling model

// Get counselling by ID
router.get('/:id', async (req, res) => {
    try {
        const counselling = await Counselling.findById(req.params.id);
        if (!counselling) {
            return res.status(404).send('Counselling not found');
        }
        res.json(counselling);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Post a comment on a counselling video
router.post('/:id/comment', async (req, res) => {
    const { username, email, text } = req.body;
    try {
        const counselling = await Counselling.findById(req.params.id);
        if (!counselling) {
            return res.status(404).send('Counselling not found');
        }

        counselling.comments.push({ username, email, text });
        await counselling.save();
        res.json(counselling.comments[counselling.comments.length - 1]); // Return the newly added comment
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
