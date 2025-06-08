"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./beranda_login.css"

const BerandaLogin = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {}

  useEffect(() => {
    fetchProducts()
  }, [categoryFilter, priceFilter])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError("")

      let url = API_ENDPOINTS.PRODUCTS
      const params = new URLSearchParams()

      if (categoryFilter) params.append("category", categoryFilter)
      if (priceFilter) params.append("priceRange", priceFilter)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await apiClient.get(url)
      setProducts(response.data?.content || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Gagal memuat produk")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Redirect to dashboard
    window.location.href = "/"
  }

  return (
    <div className="beranda-wrapper">
      <header>
        <Link to="/beranda_login" className="logo">
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
        {/* Filter Section */}
        <div className="filter-section">
          <select
            className="filter-dropdown"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Fashion">Fashion</option>
            <option value="Gaming">Gaming</option>
            <option value="Audio">Audio</option>
          </select>

          <select className="filter-dropdown" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="">Semua Harga</option>
            <option value="0-1000000">Di bawah 1 Juta</option>
            <option value="1000000-5000000">1 - 5 Juta</option>
            <option value="5000000-10000000">5 - 10 Juta</option>
            <option value="10000000-999999999">Di atas 10 Juta</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>Loading products...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#ff6666" }}>{error}</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>Tidak ada produk ditemukan</div>
        ) : (
          <div className="card-grid">
            {products.map((product) => (
              <Link key={product.id} to={`/detailBarang/${product.id}`} className="card-link">
                <div className="card">
                  <div className="card-image">
                    <img
                      src={product.images?.[0] || "/placeholder.svg?height=150&width=250"}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <div className="card-indicators">
                    {[1, 2, 3].map((dot) => (
                      <div key={dot} className="indicator"></div>
                    ))}
                  </div>

                  <div className="card-title">{product.name}</div>
                  <div className="card-category">{product.category}</div>
                  <div className="card-price">{formatUtils.formatPrice(product.currentPrice || product.basePrice)}</div>
                  <div className="card-date">Berakhir: {formatUtils.formatDate(product.endDate)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BerandaLogin
