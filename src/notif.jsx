"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./notif.css"

const Notif = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS)
      setNotifications(response.data || [])
    } catch (error) {
      console.error("Error fetching notifications:", error)
      setError("Gagal memuat notifikasi")
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const markAllAsRead = async () => {
    try {
      await apiClient.post(`${API_ENDPOINTS.NOTIFICATIONS}/mark-all-read`)
      // Update local state to mark all as read
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
    } catch (error) {
      console.error("Error marking notifications as read:", error)
      alert("Gagal menandai notifikasi sebagai sudah dibaca")
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    return notif.type.toLowerCase() === filter
  })

  return (
    <div className="notif-container">
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

      <main className="notification-page">
        <aside className="sidebar">
          <h2 className="sidebar-title">Notifikasi</h2>
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
              Semua
            </button>
            <button className={`filter-btn ${filter === "info" ? "active" : ""}`} onClick={() => setFilter("info")}>
              Info
            </button>
            <button
              className={`filter-btn ${filter === "transaksi" ? "active" : ""}`}
              onClick={() => setFilter("transaksi")}
            >
              Transaksi
            </button>
          </div>
        </aside>

        <section className="notifications">
          <button className="mark-all" onClick={markAllAsRead}>
            Tandai Semua Sudah Dibaca
          </button>

          {loading ? (
            <div style={{ textAlign: "center", padding: "50px", color: "white" }}>Loading notifications...</div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "50px", color: "#ff6666" }}>{error}</div>
          ) : filteredNotifications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", color: "#ccc" }}>
              {filter === "all" ? "Tidak ada notifikasi" : `Tidak ada notifikasi ${filter}`}
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div key={notif.id} className={`notif-card ${notif.isRead ? "read" : "unread"}`}>
                <span className={`notif-tag ${notif.type.toLowerCase()}`}>{notif.type}</span>
                <p className="notif-message">{notif.message}</p>
                <span className="notif-time">{formatUtils.formatDateTime(notif.createdAt)}</span>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default Notif
