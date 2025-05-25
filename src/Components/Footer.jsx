import React from 'react';

function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-800 border-t py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-2">
            <img src="play.svg" className='w-[18px]'/>
            <span className="text-lg">MovieMind</span>
          </div>
          <p>Your personal movie recommendation<br />assistant powered by AI.</p>
          <p className="text-[10px] mt-4">Copyright © 2025 MovieMind. All rights reserved.</p>
        </div>

        {/* Features */}
        <div>
          <h3 className="mb-2">Features</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"> <img src="film.svg" className='w-[18px]'/> Find Movie</li>
            <li className="flex items-center gap-2"><img src="search2.svg" className='w-[18px]'/> Search Movie</li>
            <li className="flex items-center gap-2"><img src="barchart.svg" className='w-[18px]'/>  Analyze Movie</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-2">Contact</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"><img src="mail.svg" className='w-[18px]'/>  MovieMind@gmail.com</li>
            <li className="flex items-center gap-2"><img src="phone.svg" className='w-[18px]'/>  +1 (555) 123-4567</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"><img src="instagrams.svg" className='w-[18px]'/> @MovieMindAI</li>
            <li className="flex items-center gap-2"><img src="facebookk.svg" className='w-[18px]'/>  MovieMind (Official)</li>
            <li className="flex items-center gap-2"><img src="youtube.svg" className='w-[18px]'/> MovieMind</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
