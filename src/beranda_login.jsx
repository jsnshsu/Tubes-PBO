"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./beranda_login.css"

const Card = ({ id, title, category, price, dateRange, image }) => (
  <Link to={`/detailBarang/${id}`} className="card-link" style={{ textDecoration: "none", color: "inherit" }}>
    <div className="card">
      <div className="card-image">
        {image && (
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div className="card-indicators">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="indicator"></div>
        ))}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-category">{category}</p>
      <p className="card-price">{formatUtils.formatPrice(price)}</p>
      <p className="card-date">🗓️ {dateRange}</p>
    </div>
  </Link>
)

const BerandaLogin = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
  })

  useEffect(() => {
    fetchItems()
  }, [filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError("")

      // Build query parameters
      const params = new URLSearchParams()
      if (filters.category) params.append("category", filters.category)
      if (filters.priceRange) params.append("priceRange", filters.priceRange)

      const endpoint = `${API_ENDPOINTS.PRODUCTS}?${params.toString()}`
      const response = await apiClient.get(endpoint)

      setItems(response.data || [])
    } catch (err) {
      console.error("Error fetching items:", err)
      setError("Gagal memuat data produk")
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  if (loading) {
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
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>Loading products...</div>
        </div>
      </div>
    )
  }

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
          <select
            className="filter-dropdown"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Gaming">Gaming</option>
            <option value="Audio">Audio</option>
            <option value="Fashion">Fashion</option>
          </select>
          <select
            className="filter-dropdown"
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          >
            <option value="">Semua Harga</option>
            <option value="0-5000000">&lt; Rp 5.000.000</option>
            <option value="5000000-10000000">Rp 5.000.000 - Rp 10.000.000</option>
            <option value="10000000-15000000">Rp 10.000.000 - Rp 15.000.000</option>
            <option value="15000000-999999999">&gt; Rp 15.000.000</option>
          </select>
        </div>

        {error && <div style={{ textAlign: "center", padding: "20px", color: "#ff6666" }}>{error}</div>}

        {!error && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>Tidak ada produk yang ditemukan</div>
        )}

        <div className="card-grid">
          {items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.name || item.title}
              category={item.category}
              price={item.basePrice || item.price}
              dateRange={`${formatUtils.formatDate(item.startDate)} - ${formatUtils.formatDate(item.endDate)}`}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BerandaLogin
