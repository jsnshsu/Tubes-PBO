// Mengimpor React dan useState hook dari library React
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambah useNavigate untuk navigasi
import './login.css';

// Membuat komponen fungsional bernama Login
const Login = () => {
  const [email, setEmail] = useState('');       // State untuk menyimpan email/username
  const [password, setPassword] = useState(''); // State untuk menyimpan password
  const navigate = useNavigate();               // Hook untuk navigasi ke halaman lain

  // Fungsi yang dipanggil ketika form login disubmit
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit

    // Simulasi proses login — nanti bisa diganti dengan pemanggilan API
    console.log("Logging in with:", { email, password });

    // Arahkan ke halaman beranda_login setelah login sukses
    navigate("/beranda_login");
  };

  return (
    <div className="login-page">
      <div className="login-modal">
        <h2>Login</h2>

        {/* Form login, ketika disubmit akan memanggil handleLogin */}
        <form onSubmit={handleLogin}>
          {/* Input untuk email atau username */}
          <input
            type="text"
            placeholder="Masukkan username atau email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Input untuk password */}
          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Tombol submit */}
          <button type="submit" className="btn-login">Login</button>
        </form>

        <br />

        {/* Link untuk daftar akun */}
        <p>Belum punya akun? <Link to="/signin" className="signup-link">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
