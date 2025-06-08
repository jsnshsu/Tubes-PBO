"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./viewTransaksi.css"

const ViewTransaksi = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [paymentProof, setPaymentProof] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      fetchTransaction()
    }
  }, [id])

  const fetchTransaction = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await apiClient.get(API_ENDPOINTS.TRANSACTION_DETAIL(id))
      setTransaction(response.data)
    } catch (error) {
      console.error("Error fetching transaction:", error)
      setError("Gagal memuat detail transaksi")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPayment = async () => {
    if (!paymentProof.trim()) {
      alert("Mohon masukkan bukti pembayaran")
      return
    }

    try {
      setSubmitting(true)

      const response = await apiClient.post(API_ENDPOINTS.PAYMENT_PROOF(id), {
        paymentProof: paymentProof.trim(),
      })

      if (response.success) {
        alert("Bukti pembayaran berhasil dikirim!")
        navigate("/ACCtransaksi")
      } else {
        alert(response.message || "Gagal mengirim bukti pembayaran")
      }
    } catch (error) {
      console.error("Error submitting payment:", error)
      alert(error.message || "Terjadi kesalahan saat mengirim bukti pembayaran")
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    navigate("/ACCtransaksi")
  }

  if (loading) {
    return (
      <div className="transaction-modal-overlay">
        <div className="transaction-modal">
          <div className="loading" style={{ textAlign: "center", padding: "50px" }}>
            Loading transaction details...
          </div>
        </div>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className="transaction-modal-overlay">
        <div className="transaction-modal">
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
          <div className="error" style={{ textAlign: "center", padding: "50px", color: "#ff6666" }}>
            {error || "Transaction not found"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="transaction-modal-overlay">
      <div className="transaction-modal">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>

        <div className="transaction-content">
          <div className="product-section">
            <div className="main-image">
              <img
                src={transaction.product?.images?.[0] || "/placeholder.svg?height=300&width=300"}
                alt={transaction.productName}
              />
            </div>

            {transaction.product?.images && transaction.product.images.length > 1 && (
              <div className="thumbnail-navigation">
                <button className="nav-button prev">‹</button>
                <div className="thumbnails">
                  {transaction.product.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${transaction.productName} ${index + 1}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
                <button className="nav-button next">›</button>
              </div>
            )}
          </div>

          <div className="transaction-details">
            <div className={`status-badge ${transaction.status?.toLowerCase().replace(" ", "-")}`}>
              {transaction.status}
            </div>

            <h2 className="product-name">{transaction.productName}</h2>

            <div className="transaction-info">
              <div className="info-item">
                <span className="label">Total Transaksi</span>
                <span className="value">{formatUtils.formatPrice(transaction.totalAmount)}</span>
              </div>

              <div className="info-item">
                <span className="label">Contact Person</span>
                <span className="value">{transaction.contactPerson || "-"}</span>
              </div>
            </div>

            {transaction.seller && (
              <div className="seller-info">
                <div className="seller-detail">
                  <span className="seller-label">Nama Seller</span>
                  <span className="seller-value">{transaction.seller.name}</span>
                </div>

                <div className="seller-detail">
                  <span className="seller-label">Nomor Rekening Seller</span>
                  <span className="seller-value">{transaction.seller.accountNumber}</span>
                </div>

                <div className="seller-detail">
                  <span className="seller-label">Bank Seller</span>
                  <span className="seller-value">{transaction.seller.bank}</span>
                </div>
              </div>
            )}

            {transaction.status?.toLowerCase() !== "paid" && (
              <div className="payment-section">
                <input
                  type="text"
                  className="payment-input"
                  placeholder="Masukkan bukti pembayaran"
                  value={paymentProof}
                  onChange={(e) => setPaymentProof(e.target.value)}
                  disabled={submitting}
                />
                <button
                  className="submit-button"
                  onClick={handleSubmitPayment}
                  disabled={submitting || !paymentProof.trim()}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransaksi
