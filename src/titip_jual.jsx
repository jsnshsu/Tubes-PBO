"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import "./titip_jual.css"

const Titipjual = () => {
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    namaBarang: "",
    kategori: "",
    hargaAwal: "",
    kelipatanLelang: "",
    mulaiLelang: "",
    akhirLelang: "",
    deskripsi: "",
    status: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setError("Ukuran file terlalu besar. Maksimal 5MB.")
        return
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        setError("Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.")
        return
      }

      setImagePreview(URL.createObjectURL(file))
      setImageFile(file)
      setError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      // Create FormData for file upload
      const data = new FormData()

      // Append form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
      })

      // Append image file if exists
      if (imageFile) {
        data.append("image", imageFile)
      }

      const response = await apiClient.uploadFile(API_ENDPOINTS.LISTINGS, data)

      if (response.success) {
        alert("Barang berhasil dititipkan!")
        navigate("/listBarang")
      } else {
        setError(response.message || "Gagal mengirim data")
      }
    } catch (error) {
      console.error("Error submitting listing:", error)
      setError(error.message || "Terjadi kesalahan saat mengirim data")
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    // Pass form data to preview page
    navigate("/preview", {
      state: {
        ...formData,
        imagePreview,
      },
    })
  }

  return (
    <div className="titip-jual-page">
      <header>
        <Link to="#" className="logo">
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
          <div className="auth">
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

      <main>
        <h2 className="form-title">Form Titip Jual Barang</h2>
        <div className="form-container">
          {error && <div style={{ color: "#ff6666", marginBottom: "20px", textAlign: "center" }}>{error}</div>}

          <form className="titip-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Barang *</label>
              <input
                type="text"
                name="namaBarang"
                className="form-input"
                placeholder="Nama barang"
                value={formData.namaBarang}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Kategori Barang *</label>
              <select
                name="kategori"
                className="form-input"
                value={formData.kategori}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Fashion">Fashion</option>
                <option value="Gaming">Gaming</option>
                <option value="Audio">Audio</option>
                <option value="Aksesoris">Aksesoris</option>
              </select>
            </div>

            <div className="form-group">
              <label>Harga Awal *</label>
              <input
                type="number"
                name="hargaAwal"
                className="form-input"
                placeholder="Harga Awal"
                value={formData.hargaAwal}
                onChange={handleChange}
                min="0"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Kelipatan Lelang *</label>
              <input
                type="number"
                name="kelipatanLelang"
                className="form-input"
                placeholder="Kelipatan Lelang"
                value={formData.kelipatanLelang}
                onChange={handleChange}
                min="0"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Mulai Lelang *</label>
              <input
                type="datetime-local"
                name="mulaiLelang"
                className="form-input"
                value={formData.mulaiLelang}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Tanggal & Waktu Akhir Lelang *</label>
              <input
                type="datetime-local"
                name="akhirLelang"
                className="form-input"
                value={formData.akhirLelang}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Deskripsi / Detail Barang</label>
              <textarea
                name="deskripsi"
                className="form-input"
                placeholder="Detail Barang"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="4"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Foto Barang</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="form-input"
                disabled={loading}
              />
              {imagePreview && (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="preview-image"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </div>

            <div className="form-group">
              <label>Status Barang *</label>
              <select
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Pilih Status</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="button" className="preview-btn" onClick={handlePreview} disabled={loading}>
                Preview
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Titipjual
