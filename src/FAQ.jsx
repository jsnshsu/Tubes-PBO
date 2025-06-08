import React from 'react';
import './FAQ.css'; 
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className="faq-page">
      <header>
        <Link to="#" className='logo'>EZBID</Link>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda_login" className="menu-item">Beranda</Link>
            <Link to="/titip_jual" className="menu-item">Titip Jual</Link>
            <Link to="/FAQ" className="menu-item">FAQ</Link>
          </div>
          <div className="auth">
            <Link to="#" ><img src='/Bell.svg' alt="Notifikasi" className='notif' /></Link>
            <Link to="/ProfileSettings" ><img src='/account_circle.svg' alt="Profil" className='profil' /></Link>
          </div>
        </nav>
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <main>
        <h2>Frequently Asked Question.</h2>
        <div className="container"> 
          {/* Konten FAQ */}
          <div className='faq-title'>
            <h3>Cari Objek Lelang</h3>
          <div className='faq-section'>
            <details>
                <summary>
                  1. Bagaimana mendapatkan informasi terkait objek lelang terkini?
                </summary>
                    <p>
                      Anda bisa mengunjungi halam utama dan meilhat jadwal lelang terbaru.
                    </p>
              </details>
              <details>
                <summary>
                  2. Bagaimana jika objek lelang yang anda cari tersedia pada jadwal lelang yang tercantum di website? 
                </summary>
                  <p>
                    Silahkan cek kembali secara berkala atau aktitifkan notifikasi pada akun anda.
                  </p>
              </details>
              <details>
                <summary>
                  3. Apa langkah selanjutnya setelah anda menemukan objek lelang yang sedang dicari di website?
                </summary>
                  <p>
                    Silakan daftar dan ikuri lelang sesuai petunjuk yang tersedia
                  </p>
              </details>
            </div>
            <br />
            <div className='faq-title'>
            <h3>Unit dan Dokumen Lelang</h3>
            <div className='faq-section'>
              <details>
                <summary>
                  1. Bagaimana dengan kondisi objek lelang?
                </summary>
                <p>
                  Kondisi objek lelang dapat dilihat melalui foto atau deskripsi yang telah disediakan.
                </p>
              </details>
              <details>
                <summary>
                  2. Bagaimana dengan kelengkapan dokumen objek lelang?
                </summary>
                <p>
                  Informasi dokumen dapat Anda lihat pada detail lelang masing-masing unit.
                </p>
              </details>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default FAQ;
