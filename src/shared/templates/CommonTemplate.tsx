import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CommonTemplate: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonTemplate;
