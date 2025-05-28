const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const Activity = require('./models/Activity');

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require('./routes/activityRoutes')(app);
require('./routes/goalsRoutes')(app);

app.use(bodyParser.json());

async function connect() {
    try {
        await mongoose.connect(keys.mongoURI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log(error)
    }
}

connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});