"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { authUtils } from "./utils/auth"
import "./ProfileSettings.css"

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bank: "",
    accountName: "",
    accountNumber: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE)
      setProfile(response.data || {})
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("Gagal memuat data profil")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError("")

      const response = await apiClient.put(API_ENDPOINTS.USER_PROFILE, profile)

      // Update user data in localStorage
      const currentUser = authUtils.getCurrentUser()
      if (currentUser) {
        authUtils.setAuth({ ...currentUser, ...profile }, authUtils.getToken())
      }

      alert("Profil berhasil disimpan!")
    } catch (err) {
      console.error("Error saving profile:", err)
      setError("Gagal menyimpan profil")
      alert("Gagal menyimpan profil. Silakan coba lagi.")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    authUtils.logout()
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
        <div style={{ color: "white", textAlign: "center", padding: "100px" }}>Loading profile...</div>
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

      <div className="profile-page">
        <div className="sidebar">
          <Link to="/ProfileSettings" className="sidebar-item">
            Pengaturan Profil
          </Link>
          <Link to="/ACCtransaksi" className="sidebar-item">
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

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar" />
              <h2>{profile.name || "Nama User"}</h2>
            </div>

            {error && <div style={{ color: "#ff6666", textAlign: "center", marginBottom: "20px" }}>{error}</div>}

            <div className="form-sections">
              <div className="form-section">
                <h3>Detail Informasi Akun</h3>
                <label>Nama</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                />
                <label>No. Telepon</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                />
                <label>Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address || ""}
                  onChange={handleChange}
                  placeholder="Masukkan alamat"
                />
              </div>

              <div className="form-section">
                <h3>Detail Informasi Bank</h3>
                <label>Bank</label>
                <select name="bank" value={profile.bank || ""} onChange={handleChange}>
                  <option value="">Pilih bank...</option>
                  <option value="BCA">BCA</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="CIMB">CIMB Niaga</option>
                  <option value="Danamon">Danamon</option>
                </select>
                <label>Nama Pemilik Rekening</label>
                <input
                  type="text"
                  name="accountName"
                  value={profile.accountName || ""}
                  onChange={handleChange}
                  placeholder="Nama Pemilik Rekening"
                />
                <label>No. Rekening</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={profile.accountNumber || ""}
                  onChange={handleChange}
                  placeholder="Nomor Rekening"
                />
              </div>
            </div>

            <button className="save-button" onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
