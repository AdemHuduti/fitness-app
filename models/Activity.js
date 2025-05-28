
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    activityType: { type: String, enum: ['run', 'walk', 'hike', 'ride', 'swim', 'workout', 'HIIT', 'other'], required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
