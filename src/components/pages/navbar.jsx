import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div className="w-auto rounded-md absolute lg:relative my-3 ml-5 lg:my-5 lg:ml-0 z-50">
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden h-auto p-2 flex">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="text-3xl text-black"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <div
        className={`hidden lg:flex flex-none w-full h-full bg-CC rounded-md p-5 ${isOpen ? 'block' : 'hidden'} lg:space-y-4`}
      >
        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/Weather" className="block w-full h-full">Home</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/Maps" className="block w-full h-full">Maps</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/About" className="block w-full h-full">About</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md  w-full">
            <Link to="/Contact" className="block w-full h-full">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Mobile View */}
      <div
        ref={menuRef}
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'} p-5 bg-white z-50 rounded-md flex`}
      >
        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/Weather" className="block w-full h-full">Home</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/Maps" className="block w-full h-full">Maps</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/About" className="block w-full h-full">About</Link>
          </li>
          <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-md w-full">
            <Link to="/Contact" className="block w-full h-full">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
