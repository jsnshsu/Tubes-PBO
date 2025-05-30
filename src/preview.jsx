import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './preview.css';

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <p>Data tidak tersedia. Silakan kembali ke form.</p>;
  }

  return (
    <div className="preview-page">
      <div className="preview-container">
        <div className="left-preview">
          <div className="main-image">
            {data.imagePreview ? (
              <img src={data.imagePreview} alt="Barang" />
            ) : (
              <div className="empty-image">No Image</div>
            )}
          </div>
          <div className="thumbnail-row">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="thumbnail-placeholder"></div>
            ))}
          </div>
          <div className="description">
            <h4>Deskripsi</h4>
            <p>{data.deskripsi || 'Tidak ada deskripsi.'}</p>
          </div>
        </div>

        <div className="right-preview">
          <div className="product-info">
            <h3>{data.namaBarang || 'Nama Barang'}</h3>
            <p>Harga Dasar: Rp {data.hargaAwal || 'xxx.xxx,-'}</p>
            <p>Contact Person: 08xxxxxxxxxxx</p>
            <p>Tanggal Mulai Lelang: {data.mulaiLelang}</p>
            <p>Tanggal Berakhir: {data.akhirLelang}</p>
            <p>Kelipatan Lelang: Rp {data.kelipatanLelang || '0'}</p>
            <p>Status: {data.status}</p>
          </div>

          <div className="related-section">
            <h4>Produk Terkait</h4>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="related-item">
                <div className="img-placeholder"></div>
                <div className="item-text">
                  <p>Nama Barang</p>
                  <small>Rp xxx.xxx,-</small>
                </div>
              </div>
            ))}
          </div>

          <button className="submit-preview" onClick={() => navigate(-1)}>
            Selesai Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
