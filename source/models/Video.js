const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: false
  },
  description: { 
    type: String 
  },
  videoUrl: { 
    type: String, 
    required: true 
  },
  thumbnail: { 
    type: String 
  }, 
  player: { 
    type: String, 
    required: true 
  }, 
  category: { 
    type: String 
  }, 
  uploader: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, 
  uploadDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Video', videoSchema);