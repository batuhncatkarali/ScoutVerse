const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/Auth.js');
const videoRoutes = require('./routes/videos.js');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes); 

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ DATABASE CONNECTED SUCCESSFULLY!'))
.catch(err => {
  console.error('❌ CONNECTION ERROR:', err.message);
});

app.get('/', (req, res) => {
  res.send('ScoutVerse API is running smoothly...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});