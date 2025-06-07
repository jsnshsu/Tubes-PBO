"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./beranda_login.css"

const Card = ({ id, title, category, price, dateRange }) => (
  <Link to={`/detailBarang/${id}`} className="card-link" style={{ textDecoration: "none", color: "inherit" }}>
    <div className="card">
      <div className="card-image"></div>
      <div className="card-indicators">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="indicator"></div>
        ))}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-category">{category}</p>
      <p className="card-price">{`Rp ${price.toLocaleString("id-ID")},-`}</p>
      <p className="card-date">🗓️ {dateRange}</p>
    </div>
  </Link>
)

const BerandaLogin = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/product/items")
        if (!response.ok) {
          throw new Error("Gagal mengambil data")
        }
        const data = await response.json()
        console.log("Data dari API:", data)
        setItems(data)
      } catch (err) {
        console.error("Error fetch:", err)
        // Dummy data dengan nama produk yang jelas dan berbeda
        const dummyData = [
          {
            id: 1,
            title: "Samsung Galaxy S21",
            category: "Elektronik",
            price: 7500000,
            dateRange: "01 Mei 2025 - 10 Mei 2025",
            status: "Not Active",
          },
          {
            id: 2,
            title: "iPhone 14 Pro Max",
            category: "Elektronik",
            price: 12000000,
            dateRange: "15 Januari 2025 - 25 Januari 2025",
            status: "Active",
          },
          {
            id: 3,
            title: "MacBook Air M2",
            category: "Elektronik",
            price: 15000000,
            dateRange: "20 Februari 2025 - 28 Februari 2025",
            status: "Not Active",
          },
          {
            id: 4,
            title: "PlayStation 5",
            category: "Gaming",
            price: 8000000,
            dateRange: "10 Maret 2025 - 20 Maret 2025",
            status: "Not Active",
          },
          {
            id: 5,
            title: "Nintendo Switch OLED",
            category: "Gaming",
            price: 4500000,
            dateRange: "05 April 2025 - 15 April 2025",
            status: "Not Active",
          },
          {
            id: 6,
            title: "iPad Pro 12.9 inch",
            category: "Elektronik",
            price: 18000000,
            dateRange: "12 Juni 2025 - 22 Juni 2025",
            status: "Not Active",
          },
          {
            id: 7,
            title: "Apple Watch Series 9",
            category: "Elektronik",
            price: 6000000,
            dateRange: "07 Januari 2025 - 15 Januari 2025",
            status: "Active",
          },
          {
            id: 8,
            title: "AirPods Pro 2nd Gen",
            category: "Audio",
            price: 3500000,
            dateRange: "20 Maret 2025 - 30 Maret 2025",
            status: "Not Active",
          },
        ]
        setItems(dummyData)
        setError(err.message)
      }
    }

    fetchItems()
  }, [])

  return (
    <div className="beranda-wrapper">
      <header>
        <h1 className="logo">EZBID</h1>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda_login" className="menu-item">
              Beranda
            </Link>
            <Link to="/titip_jual" className="menu-item">
              Titip Jual
            </Link>
            <Link to="/FAQ" className="menu-item">
              FAQ
            </Link>
          </div>
          <div className="logo">
            <Link to="/notif">
              <img src="/Bell.svg" alt="Notifikasi" className="notif" />
            </Link>
            <Link to="/ProfileSettings">
              <img src="/account_circle.svg" alt="Profil" className="profil" />
            </Link>
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
            <option>Gaming</option>
            <option>Audio</option>
            <option>Fashion</option>
          </select>
          <select className="filter-dropdown">
            <option>Range Harga</option>
            <option>&lt; Rp 5.000.000</option>
            <option>Rp 5.000.000 - Rp 10.000.000</option>
            <option>Rp 10.000.000 - Rp 15.000.000</option>
            <option>&gt; Rp 15.000.000</option>
          </select>
        </div>

        <div className="card-grid">
          {items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              price={item.price}
              dateRange={item.dateRange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BerandaLogin
