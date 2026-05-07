const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Video = require('../models/Video');
const auth = require('../middleware/auth'); 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only video files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } 
});

router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, player, category, description } = req.body;

    const newVideo = new Video({
      title: title,
      player: player,
      category: category,
      description: description,
      videoUrl: `/uploads/${req.file.filename}`,
      uploadDate: new Date()
    });

    const savedVideo = await newVideo.save();
    res.status(201).json({
      message: "Video uploaded successfully to ScoutVerse!",
      video: savedVideo
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Internal server error during upload." });
  }
});

router.get('/all', async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadDate: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/specific/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Scout profile not found." });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving video details." });
  }
});

module.exports = router;