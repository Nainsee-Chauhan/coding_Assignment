import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cyan-700 text-white p-6 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Transport Guide. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
