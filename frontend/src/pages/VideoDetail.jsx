import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`https://scoutverse-zkbd.onrender.com/api/videos/specific/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setVideo(res.data);
      })
      .catch(err => {
        console.error("Video detayları çekilemedi:", err);
        if (err.response?.status === 401) {
          alert("Unauthorized access or session expired. Please login again.");
        }
      });
  }, [id]);

  if (!video) return <div className="text-white text-center mt-20 font-black">LOADING VIDEO...</div>;

  const serverBaseUrl = "https://scoutverse-zkbd.onrender.com"; 
  const videoSource = `${serverBaseUrl.replace(/\/$/, '')}/${video.videoUrl.replace(/^\//, '')}`;
  console.log("TAM VİDEO LİNKİ:", videoSource);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#0f172a] min-h-screen">
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-black">
        {}
        <video 
          key={videoSource}
          controls 
          className="w-full h-full object-contain aspect-video"
          controlsList="nodownload"
        >
          <source src={videoSource} />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-12 p-10 bg-gray-900/60 backdrop-blur-xl rounded-[3rem] border border-gray-800 shadow-2xl">
        <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">
          {video.player}
        </h1>
        <div className="mt-6 p-8 bg-black/40 rounded-2xl border border-gray-800">
          <h3 className="text-[#34d399] font-bold uppercase tracking-widest mb-4">Tactical Analysis</h3>
          <p className="text-gray-300 text-xl leading-relaxed italic">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;