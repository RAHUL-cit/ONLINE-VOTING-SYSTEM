const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        required: true,
    },
});

const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;
