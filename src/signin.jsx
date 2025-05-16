import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import './signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    // Simulasi registrasi
    console.log('Data pendaftaran:', formData);

    // Arahkan ke halaman beranda_login setelah signup
    navigate('/beranda_login');
  };

  return (
    <div className='signin-page'>
      <div className='signin-modal'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Nama'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type='tel'
            name='phone'
            placeholder='Nomor Telepon'
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className='password-field'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className='toggle-password'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className='password-field'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Verifikasi Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className='toggle-password'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type='submit' className='signup-btn'>Daftar</button>
        </form>

        <p className='login-link'>
          Sudah memiliki akun? <Link to="/login" className='login-color'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
