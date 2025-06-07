"use client"

import "./dashboard.css"
import Ilustrasi from "./assets/dashboard.png"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #000000, #3b2b0d)",
          color: "white",
          fontSize: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid #f4c13d",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p>Loading EZBID...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div>
      <header>
        <h1 className="logo">EZBID</h1>
        <nav className="right-side">
          <div className="menu">
            <Link to="/beranda" className="menu-item">
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
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/signin" className="btn signup">
              Sign Up
            </Link>
          </div>
        </nav>
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>

      <main>
        <div className="container">
          <div className="dashboard-container">
            <div className="dashboard-image">
              <img src={Ilustrasi || "/placeholder.svg"} alt="Ilustrasi" className="dashboard-image" />
            </div>
            <div className="dashboard-text">
              <h1>
                Lelang Online Lebih <br />
                Mudah <span className="gold">dan Aman</span>
              </h1>
              <br />
              <p>
                82% Pengguna EzBid berhasil <br />
                memenangkan lelang pertamanya dalam
                <span className="underline"> 3 hari</span> berkat sistem kami.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
