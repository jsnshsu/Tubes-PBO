import React, { useEffect, useState } from "react";
import "./ACCtransaksi.css";

const ACCtransaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ganti URL ini dengan endpoint API Anda
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="acc-container">
      <div className="sidebar">
        <div className="account-name">Nama Akun</div>
        <button className="menu-button">Pengaturan Profil</button>
        <button className="menu-button active">Transaksi</button>
        <button className="menu-button">Listing</button>
        <button className="menu-button logout">Log out</button>
      </div>
      <div className="content">
        <input className="search-bar" placeholder="Search..." />
        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Kontak</th>
                <th>Bank</th>
                <th>Total Transaksi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.bank}</td>
                  <td>{item.total}</td>
                  <td className={`status ${item.status.replace(" ", "-").toLowerCase()}`}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ACCtransaksi;
