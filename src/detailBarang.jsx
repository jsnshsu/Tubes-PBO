"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./detailBarang.css"

const DetailBarang = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      fetchProduct()
      fetchRelatedProducts()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.PRODUCT_DETAIL(id))
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching product:", error)
      setError("Gagal memuat detail produk")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.RELATED_PRODUCTS}?excludeId=${id}`)
      setRelatedProducts(response.data || [])
    } catch (error) {
      console.error("Error fetching related products:", error)
      setRelatedProducts([])
    }
  }

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }
  }

  if (loading) {
    return (
      <div className="detail-wrapper">
        <header>
          <Link to="/beranda_login" className="logo-header">
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
            <div className="logo-container">
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
        <div className="loading" style={{ textAlign: "center", padding: "100px", color: "white" }}>
          Loading product details...
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="detail-wrapper">
        <header>
          <Link to="/beranda_login" className="logo-header">
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
            <div className="logo-container">
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
        <div className="error" style={{ textAlign: "center", padding: "100px", color: "#ff6666" }}>
          {error || "Product not found"}
        </div>
      </div>
    )
  }

  const currentImage =
    product.images && product.images.length > 0
      ? product.images[currentImageIndex]
      : "/placeholder.svg?height=400&width=400"

  return (
    <div className="detail-wrapper">
      <header>
        <Link to="/beranda_login" className="logo-header">
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
          <div className="logo-container">
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

      <div className="detail-content">
        <div className="product-section">
          <div className="product-gallery">
            <div className="main-product-image">
              {product.nickname && <div className="product-nickname">"{product.nickname}"</div>}
              <img src={currentImage || "/placeholder.svg"} alt={product.name} className="main-image" />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="image-navigation">
                <button className="nav-btn prev" onClick={prevImage}>
                  ‹
                </button>
                <div className="thumbnails-container">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <button className="nav-btn next" onClick={nextImage}>
                  ›
                </button>
              </div>
            )}

            <div className="engagement-stats">
              <div className="stat">
                <span className="icon">👁</span>
                <span>{product.views || 0}</span>
              </div>
              <div className="stat">
                <span className="icon">📤</span>
                <span>{product.shares || 0}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className={`status-badge ${product.status === "Active" ? "active" : "not-active"}`}>
              {product.status || "Not Active"}
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="price-info">
              <span className="price-label">Harga Dasar</span>
              <span className="price-value">{formatUtils.formatPrice(product.basePrice)}</span>
            </div>

            <div className="contact-info">
              <span className="contact-label">Contact Person</span>
              <span className="contact-value">{product.contactPerson || "-"}</span>
            </div>

            <div className="auction-info">
              <div className="auction-item">
                <span className="auction-label">Tanggal Mulai Lelang</span>
                <span className="auction-value">{formatUtils.formatDateTime(product.startDate)}</span>
              </div>

              <div className="auction-item">
                <span className="auction-label">Tanggal Berakhir Lelang</span>
                <span className="auction-value">{formatUtils.formatDateTime(product.endDate)}</span>
              </div>

              <div className="auction-item">
                <span className="auction-label">Kelipatan Lelang</span>
                <span className="auction-value">{formatUtils.formatPrice(product.increment)}</span>
              </div>
            </div>

            {product.status === "Active" && (
              <div className="auction-action">
                <Link to={`/lelang?productId=${product.id}`} className="join-auction-btn">
                  Ikut Lelang
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="description-section">
          <h2 className="description-title">Deskripsi</h2>
          <p className="description-text">{product.description || "Tidak ada deskripsi"}</p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-title">Produk Terkait</h2>
            <div className="related-grid">
              {relatedProducts.map((item) => (
                <Link to={`/detailBarang/${item.id}`} key={item.id} className="related-item">
                  <img
                    src={item.image || "/placeholder.svg?height=80&width=80"}
                    alt={item.name}
                    className="related-image"
                  />
                  <div className="related-info">
                    <span className="related-name">{item.name}</span>
                    <span className="related-price">{formatUtils.formatPrice(item.basePrice)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailBarang
