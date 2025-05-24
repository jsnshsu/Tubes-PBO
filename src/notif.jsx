import React from 'react';
import { Link } from 'react-router-dom';
import './notif.css'; // Pastikan file CSS dibuat dan di-import

const Notif = ({ notifications }) => {
  return (
    <div className="notif-container">
      <header>
              <h1 className="logo">EZBID</h1>
              <nav className="right-side">
                <div className="menu">
                  <Link to="/beranda_login" className="menu-item">Beranda</Link>
                  <Link to="/titip_jual" className="menu-item">Titip Jual</Link>
                  <Link to="/FAQ" className="menu-item">FAQ</Link>
                </div>
                <div className="logo">
                  <Link to="/notif"><img src='/Bell.svg' alt="Notifikasi" className='notif' /></Link>
                  <Link to="/ProfileSettings"><img src='/account_circle.svg' alt="Profil" className='profil' /></Link>
                </div>
              </nav>
              <div className="header-bg"></div>
              <div className="header-bg-black"></div>
        </header>

      <main className="notification-page">
        <aside className="sidebar">
          <h2 className="sidebar-title">Notifikasi</h2>
          <div className="filter-buttons">
            <button className="filter-btn">Semua</button>
            <button className="filter-btn">Info</button>
            <button className="filter-btn">Transaksi</button>
          </div>
        </aside>

        <section className="notifications">
          <div className="mark-all">Tandai Semua Sudah Dibaca</div>

          {notifications && notifications.length > 0 ? (
            notifications.map((notif, index) => (
                <div key={index} className="notif-card">
                <span className={`notif-tag ${notif.type.toLowerCase()}`}>{notif.type}</span>
                <p className="notif-message">{notif.message}</p>
                <span className="notif-time">{notif.time}</span>
                </div>
            ))
            ) : (
            <p>Tidak ada notifikasi.</p>
            )}

        </section>
      </main>
    </div>
  );
};

export default Notif;
