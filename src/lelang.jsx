"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { formatUtils } from "./utils/format"
import "./lelang.css"

const Lelang = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get("productId")

  const [bidAmount, setBidAmount] = useState(0)
  const [currentBids, setCurrentBids] = useState([])
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [submittingBid, setSubmittingBid] = useState(false)

  useEffect(() => {
    if (productId) {
      fetchAuctionData()
    }
  }, [productId])

  const fetchAuctionData = async () => {
    try {
      setLoading(true)
      setError("")

      // Fetch product details
      const productResponse = await apiClient.get(API_ENDPOINTS.PRODUCT_DETAIL(productId))
      const product = productResponse.data
      setProductData(product)
      setBidAmount(product.basePrice + product.increment)

      // Fetch current bids
      const bidsResponse = await apiClient.get(API_ENDPOINTS.AUCTION_BIDS(productId))
      setCurrentBids(bidsResponse.data || [])
    } catch (error) {
      console.error("Error fetching auction data:", error)
      setError("Gagal memuat data lelang")
    } finally {
      setLoading(false)
    }
  }

  const handleBidIncrease = () => {
    if (productData) {
      setBidAmount((prev) => prev + productData.increment)
    }
  }

  const handleBidDecrease = () => {
    if (productData) {
      const minBid =
        currentBids.length > 0
          ? currentBids[0].amount + productData.increment
          : productData.basePrice + productData.increment
      setBidAmount((prev) => Math.max(prev - productData.increment, minBid))
    }
  }

  const handleBidSubmit = async () => {
    if (!productData || submittingBid) return

    try {
      setSubmittingBid(true)

      const response = await apiClient.post(API_ENDPOINTS.PLACE_BID(productId), {
        amount: bidAmount,
      })

      if (response.success) {
        alert(`Bid berhasil: ${formatUtils.formatPrice(bidAmount)}`)
        // Refresh bids
        fetchAuctionData()
      } else {
        alert(response.message || "Gagal memasang bid")
      }
    } catch (error) {
      console.error("Error submitting bid:", error)
      alert(error.message || "Terjadi kesalahan saat memasang bid")
    } finally {
      setSubmittingBid(false)
    }
  }

  if (loading) {
    return (
      <div className="lelang-page">
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
        <div style={{ textAlign: "center", padding: "100px", color: "white" }}>Loading auction data...</div>
      </div>
    )
  }

  if (error || !productData) {
    return (
      <div className="lelang-page">
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
        <div style={{ textAlign: "center", padding: "100px", color: "#ff6666" }}>{error || "Auction not found"}</div>
      </div>
    )
  }

  const currentHighestBid = currentBids.length > 0 ? currentBids[0].amount : productData.basePrice

  return (
    <div className="lelang-page">
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

      <div className="auction-container">
        {/* Product Section */}
        <div className="product-section">
          <div className="product-image-container">
            {productData.nickname && <div className="product-title">"{productData.nickname}"</div>}
            <img
              src={productData.images?.[0] || "/placeholder.svg?height=300&width=300"}
              alt={productData.name}
              className="main-product-image"
            />
          </div>

          {productData.images && productData.images.length > 1 && (
            <div className="thumbnail-container">
              <button className="thumbnail-nav">‹</button>
              {productData.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${productData.name} ${index + 1}`}
                  className="thumbnail"
                />
              ))}
              <button className="thumbnail-nav">›</button>
            </div>
          )}

          <div className="stats-container">
            <div className="stat-item">
              <span>👁</span>
              <span>{productData.views || 0}</span>
            </div>
            <div className="stat-item">
              <span>📤</span>
              <span>{productData.shares || 0}</span>
            </div>
          </div>

          <div className="description-section">
            <h3>Deskripsi</h3>
            <p>{productData.description || "Tidak ada deskripsi"}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="status-badge">{productData.status}</div>

          <h2 className="product-name">{productData.name}</h2>

          <div className="price-info">
            <div className="price-label">Harga Dasar</div>
            <div className="price-value">{formatUtils.formatPrice(productData.basePrice)}</div>
          </div>

          <div className="contact-info">
            <div className="contact-label">Contact Person</div>
            <div className="contact-value">{productData.contactPerson || "-"}</div>
          </div>

          <div className="auction-details">
            <div className="detail-item">
              <div className="detail-label">Tanggal Mulai Lelang</div>
              <div className="detail-value">{formatUtils.formatDateTime(productData.startDate)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Tanggal Berakhir Lelang</div>
              <div className="detail-value">{formatUtils.formatDateTime(productData.endDate)}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Kelipatan Lelang</div>
              <div className="detail-value">{formatUtils.formatPrice(productData.increment)}</div>
            </div>
          </div>
        </div>

        {/* Bidding Section */}
        <div className="bidding-section">
          <div className="current-price-header">Harga Terkini: {formatUtils.formatPrice(currentHighestBid)}</div>

          <div className="bid-list">
            {currentBids.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#ccc" }}>Belum ada bid</div>
            ) : (
              currentBids.map((bid, index) => (
                <div key={bid.id} className="bid-item">
                  <div>
                    <span className="bid-rank">{index + 1}.</span>
                    <span className="bid-price">{formatUtils.formatPrice(bid.amount)}</span>
                  </div>
                  <div className="bid-time">{formatUtils.formatDateTime(bid.createdAt)}</div>
                </div>
              ))
            )}
          </div>

          <div className="bid-input-section">
            <div className="bid-controls">
              <button className="bid-button" onClick={handleBidDecrease}>
                −
              </button>
              <input
                type="text"
                value={formatUtils.formatPrice(bidAmount).replace("Rp ", "").replace(",-", "")}
                onChange={(e) => {
                  const value = formatUtils.parsePrice(e.target.value)
                  setBidAmount(value)
                }}
                className="bid-input"
              />
              <button className="bid-button" onClick={handleBidIncrease}>
                +
              </button>
            </div>

            <button
              className="submit-bid-button"
              onClick={handleBidSubmit}
              disabled={submittingBid || bidAmount <= currentHighestBid}
            >
              {submittingBid ? "Submitting..." : "Bid Harga"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lelang
