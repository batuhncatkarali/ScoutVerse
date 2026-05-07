import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'scout'
  });
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate();
  const { username, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('role', role);
    data.append('document', file);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Registration Successful! Your document is being reviewed.');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="bg-[#111827] border border-gray-800 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-black text-white text-center mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Join the ScoutVerse network</p>
        
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Full Name / Club Name</label>
            <input type="text" name="username" value={username} onChange={onChange} className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all" placeholder="Enter name" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all" placeholder="example@mail.com" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Account Type</label>
            <select name="role" value={role} onChange={onChange} className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all">
              <option value="scout">🔍 Scout (Talent Hunter)</option>
              <option value="club">⚽ Club Personnel (Uploader)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Verification Document (License/ID)</label>
            <input 
              type="file" 
              onChange={onFileChange} 
              className="w-full bg-[#030712] border-2 border-dashed border-gray-800 rounded-2xl px-5 py-6 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#34d399] file:text-black hover:file:bg-[#10b981] cursor-pointer" 
              required 
            />
            <p className="text-[10px] text-gray-600 mt-2 ml-1">* Please upload a valid document to verify your professional status.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all" placeholder="••••••••" required />
          </div>

          <button type="submit" className="w-full bg-[#34d399] text-black font-black py-4 rounded-2xl hover:bg-[#10b981] transition-all shadow-lg mt-4 cursor-pointer">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account? 
          <Link to="/login" className="text-[#34d399] font-bold hover:underline ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;