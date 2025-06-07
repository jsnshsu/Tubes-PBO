// src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./dashboard.jsx"
import "./dashboard.css"
import Login from "./login.jsx"
import "./login.css"
import Signin from "./signin.jsx"
import Beranda from "./beranda.jsx"
import "./beranda.css"
import BerandaLogin from "./beranda_login.jsx"
import "./beranda_login.css"
import FAQ from "./FAQ.jsx"
import "./FAQ.css"
import Titipjual from "./titip_jual.jsx"
import "./titip_jual.css"
import ProfileSettings from "./ProfileSettings.jsx"
import "./ProfileSettings.css"
import Notif from "./notif.jsx"
import "./notif.css"
import Lelang from "./lelang.jsx"
import "./lelang.css"
import Preview from "./preview.jsx"
import "./preview.css"
import ACCtransaksi from "./ACCtransaksi.jsx"
import "./ACCtransaksi.css"
import DetailBarang from "./detailBarang.jsx"
import "./detailBarang.css"
import ViewTransaksi from "./viewTransaksi.jsx"
import "./viewTransaksi.css"
import ListBarang from "./listBarang.jsx"
import "./listBarang.css"
import ListEdit from "./listEdit.jsx"
import "./listEdit.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/beranda_login" element={<BerandaLogin />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/titip_jual" element={<Titipjual />} />
        <Route path="/ProfileSettings" element={<ProfileSettings />} />
        <Route path="/notif" element={<Notif />} />
        <Route path="/lelang" element={<Lelang />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/ACCtransaksi" element={<ACCtransaksi />} />
        <Route path="/detailBarang/:id" element={<DetailBarang />} />
        <Route path="/viewTransaksi/:id" element={<ViewTransaksi />} />
        <Route path="/listBarang" element={<ListBarang />} />
        <Route path="/listEdit/:id" element={<ListEdit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
