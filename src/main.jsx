// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard.jsx';
import './dashboard.css';
import Login from './login.jsx';
import './login.css';
import Signin from './signin.jsx'; 
import Beranda from './beranda.jsx';
import './beranda.css';
import BerandaLogin from './beranda_login.jsx';
import './beranda_login.css';
import FAQ from'./FAQ.jsx';
import './FAQ.css';
import Titipjual from './titip_jual.jsx';
import './titip_jual.css';
import ProfileSettings from './ProfileSettings.jsx';
import './ProfileSettings.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Beranda" element={<Beranda/>}/>
        <Route path="/beranda_login" element={<BerandaLogin />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/titip_jual" element={<Titipjual />} />
        <Route path="/ProfileSettings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
