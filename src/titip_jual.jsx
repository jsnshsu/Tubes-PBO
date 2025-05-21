import React, { useState } from 'react';
import './titip_jual.css';
import { Link } from 'react-router-dom';

const Titipjual = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="titip-jual-page">
      {/* Header */}
      <header>
        <Link to="#" className="logo">EZBID</Link>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda_login" className="menu-item">Beranda</Link>
            <Link to="#" className="menu-item">Titip Jual</Link>
            <Link to="/FAQ" className="menu-item">FAQ</Link>
          </div>
          <div className="auth">
            <Link to="#"><img src='/Bell.svg' alt="Notifikasi" className='notif' /></Link>
            <Link to="/ProfileSettings"><img src='/account_circle.svg' alt="Profil" className='profil' /></Link>
          </div>
        </nav>
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      {/* Form Section */}
      <main>
        <h2 className="form-title">Form Titip Jual Barang</h2>
        <div className="form-container">
          <form className="titip-form">
            <div className="form-group">
              <label>Nama Barang</label>
              <input type="text" className="form-input" placeholder="Nama barang" />
            </div>

            <div className="form-group">
              <label>Kategori Barang</label>
              <select className="form-input">
                <option>Pilih Kategori</option>
                {/* Tambahkan opsi kategori lainnya */}
              </select>
            </div>

            <div className="form-group">
              <label>Harga Awal</label>
              <input type="number" className="form-input" placeholder="Harga Awal" />
            </div>

            <div className="form-group">
              <label>Kelipatan Lelang</label>
              <input type="number" className="form-input" placeholder="Kelipatan Lelang" />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Mulai Lelang</label>
              <input type="datetime-local" className="form-input" />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Akhir Lelang</label>
              <input type="datetime-local" className="form-input" />
            </div>

            <div className="form-group">
              <label>Deskripsi / Detail Barang</label>
              <textarea className="form-input" placeholder="Detail Barang"></textarea>
            </div>

            <div className="form-group">
              <label>Foto Barang</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
              {image && <img src={image} alt="Preview" className="preview-image" />}
            </div>

            <div className="form-group">
              <label>Status Barang</label>
              <select className="form-input">
                <option>Pilih Status</option>
                {/* Tambahkan opsi status lainnya */}
              </select>
            </div>

            <div className="form-buttons">
              <button type="button" className="preview-btn">Preview</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Titipjual;
