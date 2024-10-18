// models/CounsellingDetails.js
const mongoose = require('mongoose');

const CounsellingDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    youtubeVideoId: {
        type: String,
        required: true
    },
    comments: [{
        username: String,
        email: String,
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('CounsellingDetails', CounsellingDetailsSchema);
