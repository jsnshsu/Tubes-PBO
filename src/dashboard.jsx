// Mengimpor file CSS untuk styling komponen dashboard
import './dashboard.css';

// Mengimpor gambar ilustrasi dari folder assets
import Ilustrasi from "./assets/dashboard.png";

// Mengimpor React untuk menggunakan JSX dan membuat komponen
import React from 'react';

// Mengimpor Link dari react-router-dom untuk navigasi antar halaman
import { Link } from 'react-router-dom';

// Membuat komponen fungsional bernama Dashboard
const Dashboard = () => {
  return (
    // Elemen utama pembungkus seluruh halaman
    <div>
      {/* Bagian header */}
      <header>
        {/* Logo website */}
        <h1 className="logo">EZBID</h1>

        {/* Navigasi sisi kanan header */}
        <nav className="right-side">
          {/* Menu navigasi utama */}
          <div className="menu">
            <Link to="/beranda" className='menu-item'>Beranda</Link> 
            <Link to="#" className='menu-item'>Titip Jual</Link>
            <Link to="/FAQ" className='menu-item'>FAQ</Link>
          </div>

          {/* Tombol login dan sign up */}
          <div className="auth">
            {/* Link ke halaman login */}
            <Link to="/login" className="btn login">Login</Link>
            {/* Tombol untuk sign up, belum dikaitkan dengan routing */}
            <Link to="/signin" className="btn signup">Sign Up</Link>
          </div>
        </nav>

        {/* Background tambahan untuk efek visual */}
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      {/* Bagian utama isi konten dashboard */}
      <main>
        {/* Kontainer utama halaman */}
        <div className="container">
          {/* Kontainer isi dashboard */}
          <div className="dashboard-container">
            
            {/* Gambar di sisi kiri dashboard */}
            <div className='dashboard-image'>
              {/* Menampilkan gambar ilustrasi */}
              <img src={Ilustrasi} alt="Ilustrasi" className="dashboard-image" />
            </div>

            {/* Teks deskripsi di sisi kanan dashboard */}
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

// Mengekspor komponen Dashboard agar bisa digunakan di file lain
export default Dashboard;
