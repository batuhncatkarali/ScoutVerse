const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Yeni
const cloudinary = require('cloudinary').v2; // Yeni
const Video = require('../models/Video');
const auth = require('../middleware/auth'); 

// Cloudinary Yapılandırması (Buraya Dashboard'daki bilgilerini yaz)
cloudinary.config({
  cloud_name: 'dranu9qid',
  api_key: '398584253298791',
  api_secret: 'fLL1gyJ7-f7Xly_aObJ6_aaRPfQ'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'scoutverse_videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv']
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } 
});

router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, player, category, description } = req.body;

  
    if (!req.file) {
        return res.status(400).json({ message: "Video dosyası seçilmedi." });
    }

    const newVideo = new Video({
      title: title,
      player: player,
      category: category,
      description: description,
      videoUrl: req.file.path,
      uploadDate: new Date()
    });

    const savedVideo = await newVideo.save();
    res.status(201).json({
      message: "Video uploaded successfully to Cloudinary and ScoutVerse!",
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