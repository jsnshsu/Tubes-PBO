import React, { useEffect, useState } from 'react';
import './lelang.css';
import { Link } from 'react-router-dom';

const Lelang = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/product/items');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data = await response.json();
        console.log('Data dari API (lelang.jsx):', data);
        setItems(data);
      } catch (err) {
  console.error('Error fetch di lelang.jsx:', err);
  const dummyData = [
    {
      id: 1,
      title: 'Smartphone Samsung Galaxy S21',
      category: 'Elektronik',
      price: 7500000,
      dateRange: '01 Mei 2025 - 10 Mei 2025',
    },
  ];
  setItems(dummyData);
  setError(''); // kosong supaya tidak muncul pesan error di UI
}
    };

    fetchItems();
  }, []);

  return (
    <div className="lelang-container">
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

      <div className="lelang-content">
        <h2>Daftar Lelang</h2>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div className="lelang-grid">
          {items.map(item => (
            <div key={item.id} className="lelang-card">
              <h3>{item.title}</h3>
              <p>Kategori: {item.category}</p>
              <p>Harga Awal: Rp {item.price.toLocaleString('id-ID')},-</p>
              <p>Periode: {item.dateRange}</p>
              <Link to={`/lelang/${item.id}`} className="lelang-link">
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lelang;
