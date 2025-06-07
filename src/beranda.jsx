"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./ACCtransaksi.css"

const ACCtransaksi = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {}
  const username = user.name || "Nama Akun"

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/api/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // hapus jika tidak perlu
          },
          // credentials: "include", // tambahkan jika backend pakai session cookies
        })

        if (!response.ok) {
          throw new Error("Failed to fetch transactions")
        }

        const data = await response.json()
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
        // fallback dummy data
        const dummyData = [
          {
            name: "Pear Phone",
            contact: "08889888988",
            bank: "BCA",
            total: "Rp 1.900.000,-",
            status: "Paid",
          },
          // ... bisa tambah dummy data lain
        ]
        setTransactions(dummyData)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "paid":
        return "paid"
      case "not paid":
        return "not-paid"
      case "pending":
        return "pending"
      default:
        return ""
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
              style={{ background: "none", border: "none", textAlign: "left", width: "100%" }}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="content">
          <input className="search-bar" placeholder="Search..." />

          {loading ? (
            <p style={{ color: "white" }}>Loading...</p>
          ) : transactions.length === 0 ? (
            <p style={{ color: "white" }}>No transactions found.</p>
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
                  {transactions.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <Link to="/viewTransaksi/1">{item.name}</Link>
                      </td>
                      <td>{item.contact}</td>
                      <td>{item.bank}</td>
                      <td>{item.total}</td>
                      <td>
                        <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
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
