"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./beranda.css"

const Beranda = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [categoryFilter, priceFilter])

  const fetchProducts = async () => {
    try {
      setLoading(true)

      // Fetch products from API (public endpoint)
      let url = "http://localhost:3001/api/products"
      const params = new URLSearchParams()

      if (categoryFilter) params.append("category", categoryFilter)
      if (priceFilter) params.append("priceRange", priceFilter)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.content || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (!price) return "Rp xxx.xxx,-"
    return `Rp ${price.toLocaleString("id-ID")},-`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "12 Desember 2024"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="beranda-wrapper">
      <header>
        <Link to="/" className="logo">
          EZBID
        </Link>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda" className="menu-item">
              Beranda
            </Link>
            <Link to="/FAQ" className="menu-item">
              FAQ
            </Link>
          </div>
          <div className="auth">
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/signin" className="btn signup">
              Sign Up
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
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>Tidak ada produk ditemukan</div>
        ) : (
          <div className="card-grid">
            {products.map((product) => (
              <div key={product.id} className="card">
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
                <div className="card-price">{formatPrice(product.basePrice)}</div>
                <div className="card-date">Berakhir: {formatDate(product.endDate)}</div>

                {/* Pesan untuk login */}
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  <Link to="/login" style={{ color: "#f4c13d", textDecoration: "none" }}>
                    Login untuk melihat detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Beranda
