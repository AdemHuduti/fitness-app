const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

// MODELS
require('./models/Activity');
require('./models/Goal');

// ROUTES
require('./routes/activityRoutes')(app);
require('./routes/goalsRoutes')(app);


async function connect() {
    try {
        await mongoose.connect(keys.mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
