"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./viewTransaksi.css"

const ViewTransaksi = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentProof, setPaymentProof] = useState("")

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        const response = await fetch(`http://localhost:3001/api/transactions/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch transaction")
        }

        const data = await response.json()
        setTransaction(data)
      } catch (error) {
        console.error("Error fetching transaction:", error)
        // Fallback dummy data
        setTransaction({
          id: 1,
          productName: "Papaya Phone",
          productImage: "/placeholder.svg?height=300&width=300",
          totalAmount: "Rp 2.900.000,-",
          contactPerson: "08889889888",
          status: "Paid",
          seller: {
            name: "Asep Asepan",
            accountNumber: "1234 5678 9100",
            bank: "BCA (Bank Central Asia)",
          },
          images: [
            "/placeholder.svg?height=100&width=100",
            "/placeholder.svg?height=100&width=100",
            "/placeholder.svg?height=100&width=100",
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [id])

  const handleSubmitPayment = async () => {
    if (!paymentProof.trim()) {
      alert("Mohon masukkan bukti pembayaran")
      return
    }

    try {
      // Simulate API call to submit payment proof
      const response = await fetch(`http://localhost:3001/api/transactions/${id}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentProof: paymentProof,
        }),
      })

      if (response.ok) {
        alert("Bukti pembayaran berhasil dikirim!")
        navigate("/ACCtransaksi")
      } else {
        throw new Error("Failed to submit payment proof")
      }
    } catch (error) {
      console.error("Error submitting payment:", error)
      alert("Gagal mengirim bukti pembayaran. Silakan coba lagi.")
    }
  }

  const handleClose = () => {
    navigate("/ACCtransaksi")
  }

  if (loading) {
    return (
      <div className="transaction-modal-overlay">
        <div className="transaction-modal">
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="transaction-modal-overlay">
        <div className="transaction-modal">
          <div className="error">Transaction not found</div>
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
              <img src={transaction.productImage || "/placeholder.svg"} alt={transaction.productName} />
            </div>

            <div className="thumbnail-navigation">
              <button className="nav-button prev">‹</button>
              <div className="thumbnails">
                {transaction.images?.map((image, index) => (
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
          </div>

          <div className="transaction-details">
            <div className="status-badge not-paid">{transaction.status}</div>

            <h2 className="product-name">{transaction.productName}</h2>

            <div className="transaction-info">
              <div className="info-item">
                <span className="label">Total Transaksi</span>
                <span className="value">{transaction.totalAmount}</span>
              </div>

              <div className="info-item">
                <span className="label">Contact Person</span>
                <span className="value">{transaction.contactPerson}</span>
              </div>
            </div>

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

            <div className="payment-section">
              <input
                type="text"
                className="payment-input"
                placeholder="Masukkan bukti pembayaran"
                value={paymentProof}
                onChange={(e) => setPaymentProof(e.target.value)}
              />
              <button className="submit-button" onClick={handleSubmitPayment}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTransaksi
