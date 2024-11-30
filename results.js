const express = require('express');
const router = express.Router();
const Result = require('../models/Result'); // MongoDB model for results

// GET route to return election results
router.get('/voter/results', async (req, res) => {
    try {
        const results = await Result.find(); // Fetch results from the MongoDB database
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Error fetching results' });
    }
});

module.exports = router;
