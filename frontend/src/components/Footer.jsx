import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {}
          <div>
            <h2 className="text-2xl font-black text-[#0f172a] italic tracking-tighter" 
                style={{ textShadow: "0 0 10px #22c55e", color: "#22c55e" }}>
              ScoutVerse
            </h2>
            <p className="mt-2 text-sm">Discover the stars of the future today.</p>
          </div>

          {}
          <div>
            <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Communication</h3>
            <ul className="text-sm space-y-2">
              <li>📍 Lefke, Kuzey Kıbrıs</li>
              <li>📧 catkaralibatuhan@gmail.com</li>
              <li>📞 +90 (507) 625 36 00</li>
            </ul>
          </div>

          {}
          <div>
            <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Follow</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-900 mt-8 pt-4 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} ScoutVerse. All rights reserved. | Developed by Yaşar Batuhan Çatkaralı.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;