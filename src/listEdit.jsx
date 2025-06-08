"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import "./listEdit.css"

const ListEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
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

  useEffect(() => {
    if (id) {
      fetchItemData()
    }
  }, [id])

  const fetchItemData = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.LISTING_DETAIL(id))
      const data = response.data

      // Format data for form
      setFormData({
        namaBarang: data.name || "",
        kategori: data.category || "",
        hargaAwal: data.basePrice || "",
        kelipatanLelang: data.increment || "",
        mulaiLelang: data.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : "",
        akhirLelang: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : "",
        deskripsi: data.description || "",
        status: data.status || "",
      })
    } catch (error) {
      console.error("Error fetching item:", error)
      setError("Gagal memuat data item")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      setSaving(true)
      setError("")

      // Format data for API
      const updateData = {
        name: formData.namaBarang,
        category: formData.kategori,
        basePrice: Number(formData.hargaAwal),
        increment: Number(formData.kelipatanLelang),
        startDate: formData.mulaiLelang,
        endDate: formData.akhirLelang,
        description: formData.deskripsi,
        status: formData.status,
      }

      const response = await apiClient.put(API_ENDPOINTS.LISTING_DETAIL(id), updateData)

      if (response.success) {
        alert("Item berhasil diupdate!")
        navigate("/listBarang")
      } else {
        setError(response.message || "Gagal mengupdate item")
      }
    } catch (error) {
      console.error("Error updating item:", error)
      setError(error.message || "Terjadi kesalahan saat mengupdate item")
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    navigate("/preview", { state: formData })
  }

  const handleClose = () => {
    navigate("/listBarang")
  }

  if (loading) {
    return (
      <div className="edit-overlay">
        <div className="edit-modal">
          <div className="loading" style={{ textAlign: "center", padding: "50px" }}>
            Loading item data...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>

        <h2 className="edit-title">Edit Barang Lelang</h2>

        {error && <div style={{ color: "#ff6666", marginBottom: "20px", textAlign: "center" }}>{error}</div>}

        <div className="edit-content">
          <div className="left-section">
            <div className="form-group">
              <label className="form-label">Nama Barang</label>
              <input
                type="text"
                name="namaBarang"
                value={formData.namaBarang}
                onChange={handleChange}
                className="form-input"
                placeholder="Nama barang"
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategori Barang</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="form-select"
                disabled={saving}
              >
                <option value="">Pilih Kategori</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Fashion">Fashion</option>
                <option value="Gaming">Gaming</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Harga Awal</label>
              <input
                type="number"
                name="hargaAwal"
                value={formData.hargaAwal}
                onChange={handleChange}
                className="form-input"
                placeholder="Harga Awal"
                min="0"
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kelipatan Lelang</label>
              <input
                type="number"
                name="kelipatanLelang"
                value={formData.kelipatanLelang}
                onChange={handleChange}
                className="form-input"
                placeholder="Kelipatan Lelang"
                min="0"
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal & Waktu Mulai Lelang</label>
              <input
                type="datetime-local"
                name="mulaiLelang"
                value={formData.mulaiLelang}
                onChange={handleChange}
                className="form-input"
                disabled={saving}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal & Waktu Akhir Lelang</label>
              <input
                type="datetime-local"
                name="akhirLelang"
                value={formData.akhirLelang}
                onChange={handleChange}
                className="form-input"
                disabled={saving}
              />
            </div>
          </div>

          <div className="right-section">
            <div className="detail-group">
              <label className="form-label">Detail Barang</label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                className="detail-textarea"
                placeholder="Deskripsi detail barang..."
                disabled={saving}
              />
            </div>

            <div className="photo-section">
              <label className="form-label">Foto Barang</label>
              <div className="photo-container">
                <div className="main-photo">
                  <img src="/placeholder.svg?height=120&width=120" alt="Main product" />
                </div>
                <div className="additional-photos">
                  <div className="additional-photo">+3</div>
                </div>
              </div>
            </div>

            <div className="status-group">
              <label className="form-label">Status Barang</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                disabled={saving}
              >
                <option value="">Pilih Status</option>
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button className="preview-btn" onClick={handlePreview} disabled={saving}>
              Preview
            </button>
            <button className="submit-btn" onClick={handleSubmit} disabled={saving}>
              {saving ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEdit
