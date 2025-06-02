import React, { useEffect, useState } from 'react';
import './ProfileSettings.css';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bank: '',
    accountName: '',
    accountNumber: '',
  });

  useEffect(() => {
    // Gantilah URL di bawah ini dengan endpoint API backend kamu
    fetch('http://localhost:3001/api/user/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.error('Gagal fetch data profil:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Ganti URL dengan endpoint update profil milikmu
    fetch('http://localhost:3001/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Profil berhasil disimpan!');
      })
      .catch((err) => console.error('Gagal menyimpan profil:', err));
  };

  return (
    <div className="beranda-wrapper">
      <header>
        <h1 className="logo">EZBID</h1>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda_login" className="menu-item">Beranda</Link>
            <Link to="#" className="menu-item">Titip Jual</Link>
            <Link to="/FAQ" className="menu-item">FAQ</Link>
          </div>
          <div className="logo">
            <Link to="#"><img src='/Bell.svg' alt="Notifikasi" className='notif' /></Link>
            <Link to="ProfileSettings"><img src='/account_circle.svg' alt="Profil" className='profil' /></Link>
          </div>
        </nav>
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <div className="profile-page">
        <div className="sidebar">
          <Link to='/ProfileSettings'className='sidebar-item'>Pengaturan Profil</Link>
          <Link to='/ACCtransaksi' className='sidebar-item'> Transaksi</Link>
          <Link to='#' className='sidebar-item'>Listing</Link>
          <Link to='#' className='sidebar-item'>Logout</Link>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" />
              <h2>{profile.name}</h2>
            </div>

            <div className="form-sections">
              <div className="form-section">
                <h3>Detail Informasi Akun</h3>
                <label>Nama</label>
                <input type="text" name="name" value={profile.name} onChange={handleChange} />
                <label>Email</label>
                <input type="email" name="email" value={profile.email} onChange={handleChange} />
                <label>No. Telepon</label>
                <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
                <label>Alamat</label>
                <input type="text" name="address" value={profile.address} onChange={handleChange} />
              </div>

              <div className="form-section">
                <h3>Detail Informasi Bank</h3>
                <label>Bank</label>
                <select name="bank" value={profile.bank} onChange={handleChange}>
                  <option value="">Pilih bank...</option>
                  <option value="BCA">BCA</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                  <option value="Mandiri">Mandiri</option>
                </select>
                <label>Rekening</label>
                <input type="text" name="accountName" value={profile.accountName} onChange={handleChange} placeholder="Nama Pemilik Rekening" />
                <label>No. Rekening</label>
                <input type="text" name="accountNumber" value={profile.accountNumber} onChange={handleChange} placeholder="Nomor Rekening" />
              </div>
            </div>

            <button className="save-button" onClick={handleSave}>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
