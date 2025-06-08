"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { authUtils } from "./utils/auth"
import "./login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError("")

      const response = await apiClient.post(API_ENDPOINTS.LOGIN, formData)

      if (response.success) {
        // Save user data and token
        authUtils.setAuth(response.data.user, response.data.token)

        // Redirect to dashboard
        navigate("/beranda_login")
      } else {
        setError(response.message || "Login gagal")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Terjadi kesalahan saat login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-modal">
        <h2>Login</h2>

        {error && <div style={{ color: "#ff6666", marginBottom: "15px", textAlign: "center" }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <br />

        <p>
          Belum punya akun?{" "}
          <Link to="/signin" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
