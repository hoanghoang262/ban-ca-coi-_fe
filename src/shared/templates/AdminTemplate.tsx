import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminTemplate: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminTemplate;
