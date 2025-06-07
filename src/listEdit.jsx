"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./listEdit.css"

const ListEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
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
    const fetchItemData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3001/api/listings/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch item data")
        }

        const data = await response.json()
        setFormData(data)
      } catch (error) {
        console.error("Error fetching item:", error)
        // Fallback dummy data
        setFormData({
          namaBarang: "Papaya Phone",
          kategori: "Elektronik",
          hargaAwal: "2000000",
          kelipatanLelang: "100000",
          mulaiLelang: "2025-12-16T13:00",
          akhirLelang: "2025-12-17T23:59",
          deskripsi: "Just a Papaya Phone!",
          status: "Not Active",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchItemData()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Item berhasil diupdate!")
        navigate("/listBarang")
      } else {
        throw new Error("Failed to update item")
      }
    } catch (error) {
      console.error("Error updating item:", error)
      alert("Gagal mengupdate item. Silakan coba lagi.")
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
          <div className="loading">Loading...</div>
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
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kategori Barang</label>
              <select name="kategori" value={formData.kategori} onChange={handleChange} className="form-select">
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
                type="text"
                name="hargaAwal"
                value={`Rp ${formData.hargaAwal},-`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "")
                  setFormData((prev) => ({ ...prev, hargaAwal: value }))
                }}
                className="form-input"
                placeholder="Rp 0,-"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kelipatan Lelang</label>
              <input
                type="text"
                name="kelipatanLelang"
                value={`Rp ${formData.kelipatanLelang},-`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "")
                  setFormData((prev) => ({ ...prev, kelipatanLelang: value }))
                }}
                className="form-input"
                placeholder="Rp 0,-"
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
              <select name="status" value={formData.status} onChange={handleChange} className="form-select">
                <option value="">Pilih Status</option>
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button className="preview-btn" onClick={handlePreview}>
              Preview
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListEdit
