import React, { useState } from 'react';
import './titip_jual.css';
import { Link } from 'react-router-dom';

const Titipjual = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    hargaAwal: '',
    kelipatanLelang: '',
    mulaiLelang: '',
    akhirLelang: '',
    deskripsi: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form fields
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append image file
    if (imageFile) {
      data.append('foto', imageFile);
    }

    try {
      const response = await fetch('http://localhost:8080/nama-aplikasi/titipjual', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Barang berhasil dititipkan!');
      } else {
        alert('Gagal mengirim data.');
      }
    } catch (error) {
      console.error('Error saat mengirim data:', error);
      alert('Terjadi kesalahan saat mengirim data.');
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
          <form className="titip-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Barang</label>
              <input type="text" name="namaBarang" className="form-input" placeholder="Nama barang" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Kategori Barang</label>
              <select name="kategori" className="form-input" onChange={handleChange}>
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Pakaian">Pakaian</option>
                <option value="Aksesoris">Aksesoris</option>
              </select>
            </div>

            <div className="form-group">
              <label>Harga Awal</label>
              <input type="number" name="hargaAwal" className="form-input" placeholder="Harga Awal" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Kelipatan Lelang</label>
              <input type="number" name="kelipatanLelang" className="form-input" placeholder="Kelipatan Lelang" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Mulai Lelang</label>
              <input type="datetime-local" name="mulaiLelang" className="form-input" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Akhir Lelang</label>
              <input type="datetime-local" name="akhirLelang" className="form-input" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Deskripsi / Detail Barang</label>
              <textarea name="deskripsi" className="form-input" placeholder="Detail Barang" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Foto Barang</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="preview-image" />}
            </div>

            <div className="form-group">
              <label>Status Barang</label>
              <select name="status" className="form-input" onChange={handleChange}>
                <option value="">Pilih Status</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </div>

            <div className="form-buttons">
              <Link to='/preview' type='button' className='preview-btn'>Preview</Link>
              <button type='submit' className='submit-button'>Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Titipjual;
