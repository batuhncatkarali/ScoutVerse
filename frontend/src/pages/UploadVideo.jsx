import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: '',
    player: '',
    category: '',
    description: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select a video file!");
      return;
    }

    try {
      const token = localStorage.getItem('token'); 

      const data = new FormData();
      data.append('player', formData.player);
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('video', selectedFile);

      await axios.post('http://localhost:5000/api/videos/upload', data, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('✅ Player successfully uploaded to the system!');
      navigate('/'); 
    } catch (err) {
      console.error("Upload error details:", err.response?.data);
      alert('❌ Upload failed: ' + (err.response?.data?.message || 'Server Error'));
    }
  };

  return (
    <div className="upload-container" style={{ padding: '2rem', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h2 style={{ color: '#2ecc71', marginBottom: '1.5rem' }}>Add New Future Star (Local Upload)</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '600px' }}>
        
        <div style={fieldStyle}>
          <label>Player Name</label>
          <input 
            type="text" 
            placeholder="e.g. Arda Güler" 
            onChange={(e) => setFormData({...formData, player: e.target.value})}
            required 
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label>Video Title</label>
          <input 
            type="text" 
            placeholder="e.g. Training Session Highlights" 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
            style={inputStyle}
          />
        </div>

        {}
        <div style={fieldStyle}>
          <label style={{ color: '#34d399', fontWeight: 'bold' }}>Select Video File (.mp4, .mov, etc.)</label>
          <input 
            type="file" 
            accept="video/*" 
            onChange={(e) => setSelectedFile(e.target.files[0])}
            required 
            style={{...inputStyle, padding: '0.5rem', cursor: 'pointer'}}
          />
        </div>

        <div style={fieldStyle}>
          <label>Position / Category</label>
          <select 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={inputStyle}
            required
          >
            <option value="">Select Position</option>
            <option value="Forward">Forward</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Defender">Defender</option>
            <option value="Goalkeeper">Goalkeeper</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label>Scout Notes & Description</label>
          <textarea 
            placeholder="Provide technical analysis..." 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{...inputStyle, height: '120px', resize: 'vertical'}}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Upload to ScoutVerse (+)
        </button>
      </form>
    </div>
  );
};

const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' };
const inputStyle = { 
  padding: '0.8rem', 
  borderRadius: '8px', 
  border: '1px solid #334155', 
  background: '#1e293b', 
  color: 'white',
  outline: 'none'
};
const buttonStyle = { 
  padding: '1rem', 
  borderRadius: '8px', 
  border: 'none', 
  background: '#2ecc71', 
  color: '#0f172a', 
  fontWeight: 'bold', 
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem',
  transition: '0.3s opacity'
};

export default UploadVideo;