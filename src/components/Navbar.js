import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-500 p-2 mt-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold"></div>
        <div className="flex-1 text-center">
          <div className="space-x-4 inline-block font-bold underline">
          {/* <a href="/" className="text-white hover:text-green-200 transition duration-300">General</a> */}

            <a href="/professional" className="text-white hover:text-green-200 transition duration-300">Professional</a>
            <a href="/urgent" className="text-white hover:text-green-200 transition duration-300">Urgent</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
