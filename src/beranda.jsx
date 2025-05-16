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
    <p className="card-price">{price}</p>
    <p className="card-date">🗓️ {dateRange}</p>
  </div>
);

export default function Beranda() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulasi ambil data dari backend
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          title: "Skibidi",
          category: "Animasi",
          price: "Rp 500.000,-",
          dateRange: "12/05/2025 - 14/05/2025",
        },
        {
          id: 2,
          title: "Camera Canon EOS",
          category: "Elektronik",
          price: "Rp 3.200.000,-",
          dateRange: "10/05/2025 - 12/05/2025",
        },
        {
          id: 3,
          title: "Sepatu Nike Jordan",
          category: "Fashion",
          price: "Rp 1.500.000,-",
          dateRange: "11/05/2025 - 13/05/2025",
        }
      ];

      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <div className="beranda-wrapper">
      {/* Header Sama Seperti Dashboard */}
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

      {/* Konten Utama */}
      <div className="beranda-content">
        <div className="filter-section">
          <select className="filter-dropdown">
            <option>Kategori</option>
          </select>
          <select className="filter-dropdown">
            <option>Range Harga</option>
          </select>
        </div>

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
      </div>
    </div>
  );
}
