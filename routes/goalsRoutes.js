const express = require('express');
const cors = require('cors');
const Goal = require('../models/Goal');

const router = express.Router();
router.use(cors());

router.get('/goals', async (req, res) => {
  try {
    const goal = await Goal.findOne();
    res.json(goal || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

router.post('/goals', async (req, res) => {
  const { type, value } = req.body;
  if (!type || !value) {
    return res.status(400).json({ error: 'Type and value are required' });
  }

  try {
    let goal = await Goal.findOne();
    if (goal) {
      goal.type = type;
      goal.value = value;
      await goal.save();
    } else {
      goal = new Goal({ type, value });
      await goal.save();
    }
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save goal' });
  }
});

module.exports = (app) => {
  app.use('/', router);
};
