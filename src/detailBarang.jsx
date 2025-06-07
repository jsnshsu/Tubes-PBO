"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./detailBarang.css"

const DetailBarang = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {}
  const username = user.name || "Nama Akun"

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Simulate API call - replace with actual API endpoint
        const response = await fetch(`http://localhost:3001/api/products/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        // Fallback dummy data berdasarkan ID
        const dummyProducts = {
          1: {
            id: 1,
            name: "Samsung Galaxy S21",
            nickname: "Galaxy Blue",
            basePrice: "Rp 7.500.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "01 Mei 2025, 14:00:00",
            auctionEnd: "10 Mei 2025, 23:59:59",
            increment: "Rp 100.000,-",
            views: "150+",
            shares: "80+",
            description:
              "Smartphone flagship Samsung dengan kamera canggih dan performa tinggi. Kondisi sangat baik dengan kelengkapan lengkap.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          2: {
            id: 2,
            name: "iPhone 14 Pro Max",
            nickname: "Deep Purple",
            basePrice: "Rp 12.000.000,-",
            contactPerson: "08889889888",
            status: "Active",
            auctionStart: "15 Januari 2025, 14:00:00",
            auctionEnd: "25 Januari 2025, 23:59:59",
            increment: "Rp 200.000,-",
            views: "200+",
            shares: "120+",
            description:
              "iPhone terbaru dengan Dynamic Island dan kamera Pro yang revolusioner. Kondisi mint dengan garansi resmi.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          3: {
            id: 3,
            name: "MacBook Air M2",
            nickname: "Midnight",
            basePrice: "Rp 15.000.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "20 Februari 2025, 14:00:00",
            auctionEnd: "28 Februari 2025, 23:59:59",
            increment: "Rp 300.000,-",
            views: "180+",
            shares: "95+",
            description:
              "MacBook Air dengan chip M2 yang powerful dan efisien. Laptop tipis dan ringan untuk produktivitas maksimal.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          4: {
            id: 4,
            name: "PlayStation 5",
            nickname: "White Edition",
            basePrice: "Rp 8.000.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "10 Maret 2025, 14:00:00",
            auctionEnd: "20 Maret 2025, 23:59:59",
            increment: "Rp 150.000,-",
            views: "300+",
            shares: "200+",
            description:
              "Konsol gaming next-gen dengan performa luar biasa. Dilengkapi dengan controller DualSense dan game eksklusif.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          5: {
            id: 5,
            name: "Nintendo Switch OLED",
            nickname: "Neon Red Blue",
            basePrice: "Rp 4.500.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "05 April 2025, 14:00:00",
            auctionEnd: "15 April 2025, 23:59:59",
            increment: "Rp 100.000,-",
            views: "250+",
            shares: "150+",
            description:
              "Nintendo Switch dengan layar OLED yang vibrant. Konsol hybrid untuk gaming di rumah dan mobile.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          6: {
            id: 6,
            name: "iPad Pro 12.9 inch",
            nickname: "Space Gray",
            basePrice: "Rp 18.000.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "12 Juni 2025, 14:00:00",
            auctionEnd: "22 Juni 2025, 23:59:59",
            increment: "Rp 400.000,-",
            views: "120+",
            shares: "70+",
            description:
              "iPad Pro dengan chip M2 dan layar Liquid Retina XDR. Perfect untuk creative professional dan productivity.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          7: {
            id: 7,
            name: "Apple Watch Series 9",
            nickname: "Midnight Aluminum",
            basePrice: "Rp 6.000.000,-",
            contactPerson: "08889889888",
            status: "Active",
            auctionStart: "07 Januari 2025, 14:00:00",
            auctionEnd: "15 Januari 2025, 23:59:59",
            increment: "Rp 100.000,-",
            views: "400+",
            shares: "250+",
            description:
              "Apple Watch terbaru dengan fitur kesehatan canggih dan performa yang lebih cepat. Smartwatch terbaik untuk gaya hidup aktif.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
          8: {
            id: 8,
            name: "AirPods Pro 2nd Gen",
            nickname: "White",
            basePrice: "Rp 3.500.000,-",
            contactPerson: "08889889888",
            status: "Not Active",
            auctionStart: "20 Maret 2025, 14:00:00",
            auctionEnd: "30 Maret 2025, 23:59:59",
            increment: "Rp 100.000,-",
            views: "180+",
            shares: "90+",
            description:
              "AirPods Pro dengan noise cancellation yang lebih baik dan kualitas suara yang ditingkatkan. Pengalaman audio premium.",
            images: [
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
              "/placeholder.svg?height=400&width=400",
            ],
          },
        }

        setProduct(dummyProducts[id] || dummyProducts[1])
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedProducts = async () => {
      try {
        // Simulate API call for related products
        const response = await fetch("http://localhost:3001/api/products/related")

        if (!response.ok) {
          throw new Error("Failed to fetch related products")
        }

        const data = await response.json()
        setRelatedProducts(data)
      } catch (error) {
        console.error("Error fetching related products:", error)
        // Fallback dummy data
        setRelatedProducts([
          { id: 1, name: "Samsung Galaxy S21", price: "Rp 7.500.000,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 3, name: "MacBook Air M2", price: "Rp 15.000.000,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 4, name: "PlayStation 5", price: "Rp 8.000.000,-", image: "/placeholder.svg?height=80&width=80" },
          {
            id: 5,
            name: "Nintendo Switch OLED",
            price: "Rp 4.500.000,-",
            image: "/placeholder.svg?height=80&width=80",
          },
          { id: 6, name: "iPad Pro 12.9 inch", price: "Rp 18.000.000,-", image: "/placeholder.svg?height=80&width=80" },
          {
            id: 7,
            name: "Apple Watch Series 9",
            price: "Rp 6.000.000,-",
            image: "/placeholder.svg?height=80&width=80",
          },
        ])
      }
    }

    fetchProduct()
    fetchRelatedProducts()
  }, [id])

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }
  }

  if (loading) {
    return (
      <div className="detail-wrapper">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="detail-wrapper">
        <div className="error">Product not found</div>
      </div>
    )
  }

  return (
    <div className="detail-wrapper">
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

      <div className="detail-content">
        <div className="product-section">
          <div className="product-gallery">
            <div className="main-product-image">
              <div className="product-nickname">"{product.nickname}"</div>
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="main-image"
              />
            </div>

            <div className="image-navigation">
              <button className="nav-btn prev" onClick={prevImage}>
                ‹
              </button>
              <div className="thumbnails-container">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={nextImage}>
                ›
              </button>
            </div>

            <div className="engagement-stats">
              <div className="stat">
                <span className="icon">👁</span>
                <span>{product.views}</span>
              </div>
              <div className="stat">
                <span className="icon">📤</span>
                <span>{product.shares}</span>
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className={`status-badge ${product.status === "Active" ? "active" : "not-active"}`}>
              {product.status}
            </div>

            <h1 className="product-title">{product.name || "Nama Produk"}</h1>

            <div className="price-info">
              <span className="price-label">Harga Dasar</span>
              <span className="price-value">{product.basePrice}</span>
            </div>

            <div className="contact-info">
              <span className="contact-label">Contact Person</span>
              <span className="contact-value">{product.contactPerson}</span>
            </div>

            <div className="auction-info">
              <div className="auction-item">
                <span className="auction-label">Tanggal Mulai Lelang</span>
                <span className="auction-value">{product.auctionStart}</span>
              </div>

              <div className="auction-item">
                <span className="auction-label">Tanggal Berakhir Lelang</span>
                <span className="auction-value">{product.auctionEnd}</span>
              </div>

              <div className="auction-item">
                <span className="auction-label">Kelipatan Lelang</span>
                <span className="auction-value">{product.increment}</span>
              </div>
            </div>

            {/* Tombol untuk masuk ke halaman lelang jika status Active */}
            {product.status === "Active" && (
              <div className="auction-action">
                <Link to="/lelang" className="join-auction-btn">
                  Ikut Lelang
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="description-section">
          <h2 className="description-title">Deskripsi</h2>
          <p className="description-text">{product.description}</p>
        </div>

        <div className="related-products">
          <h2 className="related-title">Produk Terkait</h2>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <Link to={`/detailBarang/${item.id}`} key={item.id} className="related-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="related-image" />
                <div className="related-info">
                  <span className="related-name">{item.name}</span>
                  <span className="related-price">{item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailBarang
