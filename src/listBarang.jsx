"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { authUtils } from "./utils/auth"
import { formatUtils } from "./utils/format"
import "./listBarang.css"

const ListBarang = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const user = authUtils.getCurrentUser()
  const username = user?.name || "Nama Akun"

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.USER_LISTINGS)
      setListings(response.data || [])
    } catch (error) {
      console.error("Error fetching listings:", error)
      setError("Gagal memuat data listing")
      setListings([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "active":
        return "active"
      case "not active":
      case "inactive":
        return "not-active"
      default:
        return ""
    }
  }

  const handleLogout = () => {
    authUtils.logout()
  }

  const filteredListings = listings.filter((item) => (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="beranda-wrapper">
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

      <div className="main-content">
        <div className="sidebar">
          <div className="profile-section">
            <div className="profile-icon">👤</div>
            <div className="profile-name">{username}</div>
          </div>

          <div className="sidebar-menu">
            <Link to="/ProfileSettings" className="sidebar-item">
              Pengaturan Profil
            </Link>
            <Link to="/ACCtransaksi" className="sidebar-item">
              Transaksi
            </Link>
            <Link to="/listBarang" className="sidebar-item active">
              Listing
            </Link>
            <button
              onClick={handleLogout}
              className="sidebar-item logout"
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>🚪</span>
              Log out
            </button>
          </div>
        </div>

        <div className="content">
          <input
            className="search-bar"
            placeholder="Cari listing..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading listings...</div>
          ) : error ? (
            <div style={{ color: "#ff6666", textAlign: "center", padding: "50px" }}>{error}</div>
          ) : (
            <div className="table-container">
              <table className="listing-table">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Harga Terkini</th>
                    <th>Tanggal Mulai</th>
                    <th>Tanggal Berakhir</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.length === 0 ? (
                    <>
                      {[...Array(8)].map((_, index) => (
                        <tr key={`empty-${index}`}>
                          <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                            {index === 0 &&
                              (searchTerm ? "Tidak ada listing yang sesuai pencarian" : "Belum ada listing")}
                            {index > 0 && "\u00A0"}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredListings.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <Link to={`/listEdit/${item.id}`} className="item-name">
                              {item.name}
                            </Link>
                          </td>
                          <td>{formatUtils.formatPrice(item.currentPrice || item.basePrice)}</td>
                          <td>{formatUtils.formatDate(item.startDate)}</td>
                          <td>{formatUtils.formatDate(item.endDate)}</td>
                          <td>
                            <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                          </td>
                        </tr>
                      ))}
                      {[...Array(Math.max(0, 8 - filteredListings.length))].map((_, index) => (
                        <tr key={`fill-${index}`}>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListBarang
