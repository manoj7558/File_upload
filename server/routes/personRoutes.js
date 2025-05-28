var express = require('express');
var router = express.Router();
const Person = require('../models/personModel');
const multer = require('multer');
// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// POST API to Save User
router.post('/create', upload.single('profile'), async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const profile = req.file ? req.file.path : null;

    if (!name || !age || !email || !profile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = new Person({ name, age, email, profile });
    await user.save();

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});


// View all 
router.get("/view", async (req, res) => {
    try {
        const person = await Person.find();
        res.json(person);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE API to delete a user by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;