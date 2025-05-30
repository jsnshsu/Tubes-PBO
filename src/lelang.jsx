"use client"

import { useState } from "react"
import "./lelang.css"
import { Link } from "react-router-dom"

const Lelang = () => {
  const [bidAmount, setBidAmount] = useState(1000000)
  const [currentBids] = useState([
    { rank: 1, price: 1900000, time: "15 Desember 2025, 23:08:30" },
    { rank: 2, price: 1800000, time: "15 Desember 2025, 23:08:30" },
    { rank: 3, price: 1700000, time: "15 Desember 2025, 23:08:30" },
    { rank: 4, price: 1500000, time: "15 Desember 2025, 23:08:30" },
    { rank: 5, price: 1400000, time: "15 Desember 2025, 23:08:30" },
  ])

  const [productData] = useState({
    name: "Pear Phone",
    status: "Active",
    basePrice: 900000,
    contact: "08889889888",
    startDate: "12 Desember 2025, 14:00:00",
    endDate: "15 Desember 2025, 23:59:59",
    increment: 100000,
    description:
      "Hadirilah kesempatan langka untuk memiliki Pear Phone, mahakarya teknologi yang memadukan keindahan dan performa. Desainnya yang elegan, kamera revolusioner, dan prosesor tercepat di kelasnya menjadikan Pear Phone bukan sekadar ponsel, melainkan simbol prestise.",
  })

  const handleBidIncrease = () => {
    setBidAmount((prev) => prev + productData.increment)
  }

  const handleBidDecrease = () => {
    setBidAmount((prev) => Math.max(prev - productData.increment, productData.basePrice))
  }

  const handleBidSubmit = () => {
    alert(`Bid submitted: Rp ${bidAmount.toLocaleString("id-ID")}`)
  }

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")},-`
  }

  return (
    <div className="lelang-page">
      <header>
        <Link to="#" className="logo">
          EZBID
        </Link>
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
          <div className="auth">
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

      <div className="auction-container">
        {/* Product Section */}
        <div className="product-section">
          <div className="product-image-container">
            <div className="product-title">"Berry Blue"</div>
            <img src="/placeholder.svg?height=300&width=300" alt="Pear Phone" className="main-product-image" />
          </div>

          <div className="thumbnail-container">
            <button className="thumbnail-nav">‹</button>
            <img src="/placeholder.svg?height=60&width=60" alt="Thumbnail 1" className="thumbnail active" />
            <img src="/placeholder.svg?height=60&width=60" alt="Thumbnail 2" className="thumbnail" />
            <img src="/placeholder.svg?height=60&width=60" alt="Thumbnail 3" className="thumbnail" />
            <button className="thumbnail-nav">›</button>
          </div>

          <div className="stats-container">
            <div className="stat-item">
              <span>👁</span>
              <span>100+</span>
            </div>
            <div className="stat-item">
              <span>📤</span>
              <span>100+</span>
            </div>
          </div>

          <div className="description-section">
            <h3>Deskripsi</h3>
            <p>{productData.description}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="status-badge">{productData.status}</div>

          <h2 className="product-name">{productData.name}</h2>

          <div className="price-info">
            <div className="price-label">Harga Dasar</div>
            <div className="price-value">{formatPrice(productData.basePrice)}</div>
          </div>

          <div className="contact-info">
            <div className="contact-label">Contact Person</div>
            <div className="contact-value">{productData.contact}</div>
          </div>

          <div className="auction-details">
            <div className="detail-item">
              <div className="detail-label">Tanggal Mulai Lelang</div>
              <div className="detail-value">{productData.startDate}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Tanggal Berakhir Lelang</div>
              <div className="detail-value">{productData.endDate}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Kelipatan Lelang</div>
              <div className="detail-value">{formatPrice(productData.increment)}</div>
            </div>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="bidding-section">
          <div className="current-price-header">Harga Terkini</div>

          <div className="bid-list">
            {currentBids.map((bid) => (
              <div key={bid.rank} className="bid-item">
                <div>
                  <span className="bid-rank">{bid.rank}.</span>
                  <span className="bid-price">{formatPrice(bid.price)}</span>
                </div>
                <div className="bid-time">{bid.time}</div>
              </div>
            ))}
          </div>

          <div className="bid-input-section">
            <div className="bid-controls">
              <button className="bid-button" onClick={handleBidDecrease}>
                −
              </button>
              <input
                type="text"
                value={bidAmount.toLocaleString("id-ID")}
                onChange={(e) => setBidAmount(Number.parseInt(e.target.value.replace(/\./g, "")) || 0)}
                className="bid-input"
              />
              <button className="bid-button" onClick={handleBidIncrease}>
                +
              </button>
            </div>

            <button className="submit-bid-button" onClick={handleBidSubmit}>
              Bid Harga
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lelang
