import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Attempting login...");
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      alert('Login Successful! Welcome back.');
      window.location.href = "/"; // Daha güvenli bir yönlendirme için
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data);
      alert(err.response?.data?.message || 'Invalid Credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-[#111827] border border-gray-800 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-black text-white text-center mb-2">Login</h2>
        <p className="text-gray-500 text-center mb-8 font-medium">Enter your details to access your account</p>
        
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={onChange} 
              className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all placeholder:text-gray-700"
              placeholder="example@mail.com" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={onChange} 
              className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 text-white focus:border-[#34d399] outline-none transition-all placeholder:text-gray-700"
              placeholder="••••••••" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#34d399] text-black font-black py-4 rounded-2xl hover:bg-[#10b981] transition-all shadow-lg mt-4 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account? 
          <Link to="/register" className="text-[#34d399] font-bold hover:underline ml-1">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;