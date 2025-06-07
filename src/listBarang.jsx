"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./listBarang.css"

const ListBarang = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {}
  const username = user.name || "Nama Akun"

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/api/user/listings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch listings")
        }

        const data = await response.json()
        setListings(data)
      } catch (error) {
        console.error("Error fetching listings:", error)
        // fallback dummy data to match the design
        const dummyData = [
          {
            id: 1,
            name: "Pear Phone",
            currentPrice: "Rp 1.900.000,-",
            startDate: "12/12/2025",
            endDate: "15/12/2025",
            status: "Active",
          },
          {
            id: 2,
            name: "Papaya Phone",
            currentPrice: "Rp 2.000.000,-",
            startDate: "16/12/2025",
            endDate: "17/12/2025",
            status: "Not Active",
          },
        ]
        setListings(dummyData)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "active":
        return "active"
      case "not active":
        return "not-active"
      default:
        return ""
    }
  }

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Show confirmation message
    alert("Anda telah berhasil logout!")

    // Redirect to dashboard
    window.location.href = "/"
  }

  const filteredListings = listings.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <p style={{ color: "white" }}>Loading...</p>
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
                    // Show empty rows when no data, matching the design
                    <>
                      {[...Array(8)].map((_, index) => (
                        <tr key={`empty-${index}`}>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
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
                          <td>{item.currentPrice}</td>
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                          <td>
                            <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                          </td>
                        </tr>
                      ))}
                      {/* Fill remaining rows to match design */}
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
