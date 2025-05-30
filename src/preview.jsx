"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./preview.css"

const Preview = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state || {}

  const [activeThumb, setActiveThumb] = useState(0)

  // Sample related products data
  const relatedProducts = [
    { id: 1, name: "Nama Barang", price: "xxx.xxx" },
    { id: 2, name: "Nama Barang", price: "xxx.xxx" },
    { id: 3, name: "Nama Barang", price: "xxx.xxx" },
  ]

  const handleClose = () => {
    navigate(-1)
  }

  const handleFinishPreview = () => {
    // Here you could submit the data or navigate to a success page
    alert("Preview selesai! Data akan disimpan.")
    navigate("/beranda_login")
  }

  const formatPrice = (price) => {
    if (!price) return "Rp xxx.xxx,-"
    return `Rp ${price.toLocaleString("id-ID")},-`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "12 Desember 2102, 00:00:01"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="preview-page">
      <div className="preview-modal">
        <button className="close-preview" onClick={handleClose}>
          ×
        </button>

        {/* Left Section - Image and Description */}
        <div className="preview-left">
          <div className="main-image-container">
            {data.imagePreview ? (
              <img src={data.imagePreview || "/placeholder.svg"} alt="Product Preview" className="main-preview-image" />
            ) : (
              <div className="preview-placeholder">No Image Available</div>
            )}
          </div>

          <div className="thumbnail-section">
            <button className="thumbnail-nav-btn">‹</button>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`preview-thumbnail ${activeThumb === index ? "active" : ""}`}
                onClick={() => setActiveThumb(index)}
              />
            ))}
            <button className="thumbnail-nav-btn">›</button>
          </div>

          <div className="preview-stats">
            <div className="stat-item">
              <span>👁</span>
              <span>100+</span>
            </div>
            <div className="stat-item">
              <span>📤</span>
              <span>100+</span>
            </div>
          </div>

          <div className="preview-description">
            <h3>Deskripsi</h3>
            <p>{data.deskripsi || "blablablablablabla"}</p>
          </div>
        </div>

        {/* Center Section - Product Details */}
        <div className="preview-center">
          <div className="status-section">
            <div className="status-label">Status</div>
          </div>

          <h2 className="product-name">{data.namaBarang || "Nama Barang"}</h2>

          <div className="price-section">
            <div className="price-label">Harga Dasar</div>
            <div className="price-value">{formatPrice(data.hargaAwal)}</div>
          </div>

          <div className="contact-section">
            <div className="contact-label">Contact Person</div>
            <div className="contact-value">08xxxxxxxxxx</div>
          </div>

          <div className="auction-info">
            <div className="info-item">
              <div className="info-label">Tanggal Mulai Lelang</div>
              <div className="info-value">{formatDate(data.mulaiLelang)}</div>
            </div>

            <div className="info-item">
              <div className="info-label">Tanggal Berakhir Lelang</div>
              <div className="info-value">{formatDate(data.akhirLelang)}</div>
            </div>

            <div className="info-item">
              <div className="info-label">Kelipatan Lelang</div>
              <div className="info-value">{formatPrice(data.kelipatanLelang)}</div>
            </div>
          </div>
        </div>

        {/* Right Section - Related Products */}
        <div className="preview-right">
          <div className="related-products">
            <h3 className="related-header">Produk Terkait</h3>
            {relatedProducts.map((product) => (
              <div key={product.id} className="related-item">
                <div className="related-image" />
                <div className="related-info">
                  <div className="related-name">{product.name}</div>
                  <div className="related-price">Rp {product.price},-</div>
                </div>
              </div>
            ))}
          </div>

          <button className="finish-preview-btn" onClick={handleFinishPreview}>
            Selesai Preview
          </button>
        </div>
      </div>
    </div>
  )
}

export default Preview
