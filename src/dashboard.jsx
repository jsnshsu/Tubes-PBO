import './dashboard.css';
import Ilustrasi from "./assets/dashboard.png";
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <header>
        <h1 className="logo">EZBID</h1>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda" className='menu-item'>Beranda</Link> 
            <Link to="/titip_jual" className='menu-item'>Titip Jual</Link>
            <Link to="/FAQ" className='menu-item'>FAQ</Link>
          </div>
          <div className="auth">
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/signin" className="btn signup">Sign Up</Link>
          </div>
        </nav>
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <main>
        <div className="container">
          <div className="dashboard-container">
            <div className='dashboard-image'>
              <img src={Ilustrasi} alt="Ilustrasi" className="dashboard-image" />
            </div>
            <div className="dashboard-text">
              <h1>
                Lelang Online Lebih <br />
                Mudah <span className="gold">dan Aman</span>
              </h1>
              <br />
              <p>
                82% Pengguna EzBid berhasil <br />
                memenangkan lelang pertamanya dalam
                <span className="underline"> 3 hari</span> berkat sistem kami.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
