const express = require('express');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');
const router = express.Router();

// Voter login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const voter = await Voter.findOne({ username, password });
        if (!voter) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (voter.hasVoted) {
            return res.status(403).json({ message: "You have already voted" });
        }
        res.status(200).json({ message: "Voter login successful", voter });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all candidates for voting
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cast a vote
router.post('/vote', async (req, res) => {
    const { voterId, candidateId } = req.body;
    try {
        const voter = await Voter.findById(voterId);
        if (!voter) {
            return res.status(404).json({ message: "Voter not found" });
        }
        if (voter.hasVoted) {
            return res.status(403).json({ message: "You have already voted" });
        }
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        candidate.votes += 1;
        await candidate.save();
        voter.hasVoted = true;
        await voter.save();
        res.status(200).json({ message: "Vote cast successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
