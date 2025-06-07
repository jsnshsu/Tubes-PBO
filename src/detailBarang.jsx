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
        // Fallback dummy data
        setProduct({
          id: 1,
          name: "Pear Phone",
          nickname: "Berry Blue",
          basePrice: "Rp 900.000,-",
          contactPerson: "08889889888",
          status: "Not Active",
          auctionStart: "12 Desember 2025, 14:00:00",
          auctionEnd: "15 Desember 2025, 23:59:59",
          increment: "Rp 100.000,-",
          views: "100+",
          shares: "100+",
          description:
            "Hadirilah kesempatan langka untuk memiliki Pear Phone, mahakarya teknologi yang memadukan keindahan dan performa. Desainnya yang elegan, kamera revolusioner, dan prosesor tercepat di kelasnya menjadikan Pear Phone bukan sekadar ponsel, melainkan simbol prestise.",
          images: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
          ],
        })
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
          { id: 2, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 3, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 4, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 5, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 6, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
          { id: 7, name: "Nama Barang", price: "Rp xxx.xxx,-", image: "/placeholder.svg?height=80&width=80" },
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
            <div className="status-badge not-active">{product.status}</div>

            <h1 className="product-title">{product.name}</h1>

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
