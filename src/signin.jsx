"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { apiClient, API_ENDPOINTS } from "./config/api"
import { authUtils } from "./utils/auth"
import "./signin.css"

const Signin = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sama")
      return
    }

    try {
      setLoading(true)
      setError("")

      const { confirmPassword, ...registerData } = formData
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, registerData)

      if (response.success) {
        // Save user data and token
        authUtils.setAuth(response.data.user, response.data.token)

        // Redirect to dashboard
        navigate("/beranda_login")
      } else {
        setError(response.message || "Registrasi gagal")
      }
    } catch (err) {
      console.error("Registration error:", err)
      setError(err.message || "Terjadi kesalahan saat registrasi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-page">
      <div className="signin-modal">
        <h2>Sign Up</h2>

        {error && <div style={{ color: "#ff6666", marginBottom: "15px", textAlign: "center" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Nomor Telepon"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Verifikasi Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Loading..." : "Daftar"}
          </button>
        </form>

        <p className="login-link">
          Sudah memiliki akun?{" "}
          <Link to="/login" className="login-color">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
