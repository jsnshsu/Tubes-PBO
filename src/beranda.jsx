import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './beranda.css';

const Card = ({ title, category, price, dateRange }) => (
  <div className="card">
    <div className="card-image"></div>
    <div className="card-indicators">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="indicator"></div>
      ))}
    </div>
    <h3 className="card-title">{title}</h3>
    <p className="card-category">{category}</p>
    <p className="card-price">{`Rp ${price.toLocaleString('id-ID')},-`}</p>
    <p className="card-date">🗓️ {dateRange}</p>
  </div>
);

export default function Beranda() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/items');
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="beranda-wrapper">
      <header>
        <h1 className="logo">EZBID</h1>

        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda" className="menu-item">Beranda</Link>
            <Link to="#" className="menu-item">Titip Jual</Link>
            <Link to="/FAQ" className="menu-item">FAQ</Link>
          </div>
          <div className="auth">
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/signin" className="btn signup">Sign Up</Link>
          </div>
        </nav>

        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <div className="beranda-content">
        <div className="filter-section">
          <select className="filter-dropdown">
            <option>Kategori</option>
          </select>
          <select className="filter-dropdown">
            <option>Range Harga</option>
          </select>
        </div>

        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="card-grid">
            {items.map(item => (
              <Card
                key={item.id}
                title={item.title}
                category={item.category}
                price={item.price}
                dateRange={item.dateRange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
