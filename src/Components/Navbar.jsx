import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed  top-0 left-0 w-full bg-white text-black py-4 shadow-md z-50">
      <div className="container mx-auto px-3 md:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="logo-wrapper flex items-center gap-2">
            <img src="play.svg" className="w-6" />
            <a href="#home">
              <h3 className="text-[18px]">MovieMind</h3>
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-base">
            <a href="#home" className="hover:text-[#D2D0D0] hover:underline transition duration-200">Home</a>
            <a href="#about" className="hover:text-[#D2D0D0] hover:underline transition duration-200">About</a>
            <a href="#contact" className="hover:text-[#D2D0D0] hover:underline transition duration-200">Contact</a>
          </nav>

          {/* Profile (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
            <img src="profile.svg" className="w-10" />
            <span>Guest</span>
          </div>

          {/* Hamburger Button (Mobile only) */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <img src='cancel.svg' className='w-6 h-6'/> : <img src="hamburger.svg" className="w-6 h-6"  />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 text-base">
            <a href="#home" className="hover:text-[#D2D0D0] hover:underline transition duration-200">Home</a>
            <a href="#search" className="hover:text-[#D2D0D0] hover:underline transition duration-200">Search</a>
            <a href="#about" className="hover:text-[#D2D0D0] hover:underline transition duration-200">About</a>
            <a href="#contact" className="hover:text-[#D2D0D0] hover:underline transition duration-200">Contact</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

