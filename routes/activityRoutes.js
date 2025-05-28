const express = require('express');
const cors = require('cors');

const Activity = require('../models/Activity');

const router = express.Router();
router.use(cors());

router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/activities', async (req, res) => {
  const { title, description, activityType, date, duration } = req.body;

  const newActivity = new Activity({ title, description, activityType, date, duration });

  try {
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/activities/:id', async (req, res) => {
  const { title, description, activityType, duration, date } = req.body;

  if (!title || !description || !activityType || !duration || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    activity.title = title;
    activity.description = description;
    activity.activityType = activityType;
    activity.duration = duration;
    activity.date = date;

    await activity.save();
    res.status(200).json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = (app) => {
  app.use('/', router);
};
