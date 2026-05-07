import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import VideoDetail from './pages/VideoDetail'
import UploadVideo from './pages/UploadVideo';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  useEffect(() => {
    // API endpoint corrected to /all
    axios.get('http://localhost:5000/api/videos/all') 
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);

  return (
     <Router>
       <div className="min-h-screen bg-[#030712] text-white p-8">
        
         <header className="flex justify-between items-center pb-8 border-b border-gray-800 mb-10 max-w-7xl mx-auto gap-8">
  {}
  <Link to="/">
    <h1 className="text-4xl font-black text-[#34d399] tracking-tighter italic cursor-pointer shrink-0">
      ScoutVerse
    </h1>
  </Link>

  {}
  <div className="flex-grow max-w-xl relative">
    <input 
      type="text"
      placeholder="Search for a player or position..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-900/40 border border-gray-800 p-3 pl-12 rounded-2xl text-white outline-none focus:border-[#34d399] transition-all text-sm"
    />
    <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
  </div>

  {}
  <div className="flex gap-4 shrink-0">
    {isLoggedIn ? (
      <>
        <span className="text-gray-400 self-center font-medium italic capitalize hidden md:block">
          Welcome Back, {userRole}!
        </span>
        <button 
          onClick={handleLogout}
          className="bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-all cursor-pointer"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <Link to="/login" className="bg-[#059669] px-6 py-2 rounded-full font-bold hover:bg-[#10b981] transition-all cursor-pointer">
          Login
        </Link>
        <Link to="/register" className="text-gray-400 hover:text-white font-medium transition-all cursor-pointer self-center">
          Register
        </Link>
      </>
    )}
  </div>
</header>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadVideo />} />

          <Route path="/" element={
            <main className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-100">Video Feed</h2>
                  <p className="text-gray-500 mt-2 text-lg">Discover the future stars of football.</p>
                </div>

                {isLoggedIn && userRole === 'club' && (
                  <Link to="/upload">
                    <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-[#34d399] hover:text-white transition-all shadow-lg cursor-pointer">
                      Upload Video (+)
                    </button>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {videos.length > 0 ? (
                  videos
                  .filter((video) => {
                const term = searchTerm.toLowerCase();
                const player = video.player ? video.player.toLowerCase() : "";
                const title = video.title ? video.title.toLowerCase() : "";
  
              return player.includes(term) || title.includes(term);
                })
                  .map((video) => (
                    <Link 
                      to={isLoggedIn ? `/video/${video._id}` : "/login"} 
                      key={video._id} 
                      className={`block group ${!isLoggedIn ? 'cursor-not-allowed' : ''}`}
                      onClick={(e) => {
                        if(!isLoggedIn) {
                          alert("Access Denied: Please login to watch player performances!");
                        }
                      }}
                    >
                      <div className={`bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden p-1 h-full transition-all 
                        ${isLoggedIn ? 'hover:border-[#34d399]' : 'opacity-60'}`}>
                        
                        <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative mb-4">
                          {video.thumbnail ? (
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className={`w-full h-full object-cover rounded-xl transition-all ${!isLoggedIn ? 'blur-md' : ''}`} 
                            />
                          ) : (
                            <span className="text-[#34d399] font-mono text-xs z-10 opacity-70">
                              {isLoggedIn ? "VIEW ANALYSIS" : "LOCKED"}
                            </span>
                          )}

                          {}
                          {!isLoggedIn && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-xl">
                              <span className="text-3xl mb-2">🔒</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-white">Member Only</span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all"></div>
                        </div>

                        <div className="px-3 pb-3">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#34d399] transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                            {isLoggedIn ? video.description : "Login to view scout notes and analysis..."}
                          </p>
                          
                          <div className="flex justify-between items-center border-t border-gray-800 pt-3">
                            <span className="text-[#34d399] text-xs font-bold uppercase tracking-wider">
                                {video.category}
                            </span>
                            <span className="text-gray-600 text-[10px]">
                                {new Date(video.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full border-2 border-dashed border-gray-800 rounded-[2rem] flex flex-col items-center justify-center h-[350px] text-gray-600 bg-gray-900/10">
                    <p className="text-xl font-bold text-gray-500">No videos found yet</p>
                  </div>
                )}
              </div>
            </main>
          } />

          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;