"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { authUtils } from "./utils/auth"
import { formatUtils } from "./utils/format"
import "./ACCtransaksi.css"

const ACCtransaksi = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const user = authUtils.getCurrentUser()
  const username = user?.name || "Nama Akun"

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS)
      setTransactions(response.data || [])
    } catch (error) {
      console.error("Error fetching transactions:", error)
      setError("Gagal memuat data transaksi")
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "paid":
      case "lunas":
        return "paid"
      case "not paid":
      case "belum lunas":
        return "not-paid"
      case "pending":
        return "pending"
      default:
        return ""
    }
  }

  const handleLogout = () => {
    authUtils.logout()
  }

  const filteredTransactions = transactions.filter((item) =>
    (item.productName || item.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <Link to="/ACCtransaksi" className="sidebar-item active">
              Transaksi
            </Link>
            <Link to="/listBarang" className="sidebar-item">
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
            placeholder="Cari transaksi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <div style={{ color: "white", textAlign: "center", padding: "50px" }}>Loading transaksi...</div>
          ) : error ? (
            <div style={{ color: "#ff6666", textAlign: "center", padding: "50px" }}>{error}</div>
          ) : (
            <div className="table-container">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Kontak</th>
                    <th>Bank</th>
                    <th>Total Transaksi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "50px" }}>
                        {searchTerm ? "Tidak ada transaksi yang sesuai pencarian" : "Belum ada transaksi"}
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <Link to={`/viewTransaksi/${item.id}`} style={{ color: "#f4c13d", textDecoration: "none" }}>
                            {item.productName || item.name}
                          </Link>
                        </td>
                        <td>{item.contact || item.contactPerson}</td>
                        <td>{item.bank}</td>
                        <td>{formatUtils.formatPrice(item.totalAmount || item.total)}</td>
                        <td>
                          <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))
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

export default ACCtransaksi
