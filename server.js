const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  //communication between backend and frontend
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');

const app = express();   //set up middleware and handle routes
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/onlineVoting', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(err));

// Routes
app.use('/admin', adminRoutes);
app.use('/voter', voterRoutes);

app.get('/', (req, res) => {
    res.send('College Voting System API');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
