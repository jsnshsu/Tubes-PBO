import React from 'react'
import './lelang.css'
import { Link } from 'react-router-dom';

const lelang = () => {
  return (
    <div>
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
    </div>
  )
}

export default lelang