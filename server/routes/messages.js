const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send message
router.post('/send', async (req, res) => {
  const { sender, content } = req.body;
  try {
    const newMessage = new Message({ sender, content });
    await newMessage.save();
    res.status(201).send('Message sent');
  } catch (error) {
    res.status(400).send('Error sending message');
  }
});

// Get messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender');
    res.json(messages);
  } catch (error) {
    res.status(400).send('Error fetching messages');
  }
});

module.exports = router;
