const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001; // Use environment variable for port

// MongoDB connection URI from environment variable
const uri = process.env.MONGO_URI; // Ensure this matches your .env file

const client = new MongoClient(uri);
let collegeCollection, spotRoundCollection, spotRoundDetailsCollection, topCollegesCollection, testimonialCollection; // Add testimonialCollection here

// Middleware
app.use(cors());
app.use(express.static('public')); // Serve static files from the "public" directory
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB and initialize collection references
async function connectDB() {
    try {
        await client.connect();
        const database = client.db('campusconnect');
        collegeCollection = database.collection('college');
        spotRoundCollection = database.collection('spot_rounds');
        spotRoundDetailsCollection = database.collection('spot_roundDetails');
        topCollegesCollection = database.collection('Topcolleges');
        testimonialCollection = database.collection('testimonials'); // Initialize testimonialCollection
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if DB connection fails
    }
}

// Fetch colleges based on the provided location
async function fetchColleges(location) {
    const cityCollection = client.db('campusconnect').collection('city');
    try {
        const city = await cityCollection.findOne({ location });
        if (!city) {
            console.log('No cities found for the specified location.');
            return [];
        }

        const collegeIds = city.college_ids.map(id => new ObjectId(id));
        return await collegeCollection.find({ _id: { $in: collegeIds } }).toArray();
    } catch (error) {
        console.error('Error fetching colleges:', error);
        throw new Error('Failed to fetch colleges');
    }
}

// Endpoint to fetch colleges based on location
app.get('/college/:location', async (req, res) => {
    const { location } = req.params;
    try {
        const colleges = await fetchColleges(location);
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to fetch college details by college ID
app.get('/college/details/:collegeId', async (req, res) => {
    const { collegeId } = req.params;
    try {
        const college = await collegeCollection.findOne({ _id: new ObjectId(collegeId) });
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.json(college);
    } catch (error) {
        console.error('Error fetching college data:', error);
        res.status(500).json({ message: 'Error fetching college data' });
    }
});

// Endpoint to fetch detailed spot round info for a specific college
app.get('/spot_rounds/details/:collegeId', async (req, res) => {
    const { collegeId } = req.params;
    
    try {
        const spotRoundDetails = await spotRoundDetailsCollection.findOne({ _id: new ObjectId(collegeId) });

        if (!spotRoundDetails) {
            return res.status(404).json({ message: 'Spot round details not found' });
        }

        res.json(spotRoundDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching college details' });
    }
});

// Fetching only college names from spot_rounds
app.get('/spot_rounds', async (req, res) => {
    try {
        const spotRounds = await spotRoundCollection.find({}).toArray();
        const collegeIds = spotRounds.flatMap(spotRound => spotRound.college_id);

        const collegeDetails = await spotRoundDetailsCollection.find({
            _id: { $in: collegeIds.map(id => new ObjectId(id)) }
        }).toArray();

        const formattedColleges = collegeDetails.map(college => ({
            college_id: college._id,
            college_name: college.college_name
        }));

        res.json(formattedColleges);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Error fetching colleges' });
    }
});

// Endpoint to fetch top colleges
app.get('/getCollegesByIds', async (req, res) => {
    const ids = req.query.ids.split(',').map(id => new ObjectId(id)); // Convert to ObjectId
    try {
        const colleges = await collegeCollection.find({ '_id': { $in: ids } }).toArray(); // Use collegeCollection
        res.json(colleges);
    } catch (err) {
        console.error('Error fetching colleges by IDs:', err);
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to fetch all testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await testimonialCollection.find({}).toArray();
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Error fetching testimonials' });
    }
});

app.post('/api/testimonials', async (req, res) => {
    try {
        const {
            name,
            graduationYear,
            testimonial: content,
            degree,
            major,
            currentPosition,
            company,
            collegeName, // Accept collegeName
            photoUrl
        } = req.body;

        // Check if the testimonial object has the required fields
        if (!name || !content) {
            return res.status(400).json({ error: 'Name and testimonial are required' });
        }

        const testimonial = {
            name,
            graduationYear,
            testimonial: content,
            degree,
            major,
            currentPosition,
            company,
            collegeName, // Include collegeName in the testimonial
            photoUrl
        };

        const result = await testimonialCollection.insertOne(testimonial); // Insert the testimonial into the database
        console.log('Insert Result:', result); // Log the result for debugging

        // Check if the insertion was successful
        if (result && result.insertedId) {
            res.status(201).json({ id: result.insertedId, ...testimonial }); // Respond with the new testimonial and its ID
        } else {
            res.status(500).json({ error: 'Failed to save testimonial', details: result });
        }
    } catch (error) {
        console.error('Error saving testimonial:', error);
        res.status(500).json({ error: 'Error saving testimonial', details: error.message });
    }
});


// Update testimonial by ID
app.put('/api/testimonials/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTestimonial = req.body;

    try {
        const result = await testimonialCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedTestimonial }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Testimonial not found or no changes made' });
        }

        res.json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ message: 'Error updating testimonial' });
    }
});

// Delete testimonial by ID
app.delete('/api/testimonials/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await testimonialCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ message: 'Error deleting testimonial' });
    }
});


// Root route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the College API!');
});

// Start the server and connect to the database
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

// Proper shutdown on termination signals
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed. Server shutting down.');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await client.close();
    console.log('MongoDB connection closed. Server shutting down.');
    process.exit(0);
});
