const express = require('express');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Admin login credentials
const adminUsername = "rahul1104";
const adminPassword = "rahul1104";

// Admin login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        res.status(200).json({ message: "Admin login successful" });
    } else {
        res.status(401).json({ message: "Invalid admin credentials" });
    }
});

// Add candidate route
router.post('/addCandidate', (req, res) => {
    const { name, photo, symbol, department, rollNo } = req.body;
    const candidate = new Candidate({ name, photo, symbol, department, rollNo });
    candidate.save()
        .then(() => res.status(200).json({ message: 'Candidate added successfully!' }))
        .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all candidates route
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get results route
router.get('/results', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        const winner = candidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);
        res.json({ winner });
    } catch (error) {
        res.status(500).send('Error fetching results');
    }
});

module.exports = router;
