import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './beranda_login.css';

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

const BerandaLogin = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulasi fetch data dari backend
    const fetchData = () => {
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
      <header>
        <h1 className="logo">EZBID</h1>

        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda_login" className="menu-item">Beranda</Link>
            <Link to="#" className="menu-item">Titip Jual</Link>
            <Link to="/FAQ" className="menu-item">FAQ</Link>
          </div>
          <div className="logo">
            <Link to="#" ><img src='/Bell.svg' alt="Notifikasi" className='notif' /></Link>
            <Link to="#" ><img src='/account_circle.svg' alt="Profil" className='profil' /></Link>
          </div>
        </nav>

        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <div className="beranda-content">
        <div className="filter-section">
          <select className="filter-dropdown">
            <option>Kategori</option>
            <option>Elektronik</option>
            <option>Fashion</option>
            <option>Animasi</option>
          </select>
          <select className="filter-dropdown">
            <option>Range Harga</option>
            <option>&lt; Rp 1.000.000</option>
            <option>Rp 1.000.000 - Rp 3.000.000</option>
            <option>&gt; Rp 3.000.000</option>
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
};

export default BerandaLogin;
