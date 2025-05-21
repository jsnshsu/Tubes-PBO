<header>
        {/* Logo website */}
        <h1 className="logo">EZBID</h1>

        {/* Navigasi sisi kanan header */}
        <nav className="right-side">
          {/* Menu navigasi utama */}
          <div className="menu">
            <Link to="/beranda" className='menu-item'>Beranda</Link> 
            <Link to="#" className='menu-item'>Titip Jual</Link>
            <Link to="/FAQ" className='menu-item'>FAQ</Link>
          </div>

          {/* Tombol login dan sign up */}
          <div className="auth">
            {/* Link ke halaman login */}
            <Link to="/login" className="btn login">Login</Link>
            {/* Tombol untuk sign up, belum dikaitkan dengan routing */}
            <Link to="/signin" className="btn signup">Sign Up</Link>
          </div>
        </nav>

        {/* Background tambahan untuk efek visual */}
        <div className="header-bg"></div>
        <div className="header-bg-black"></div>
      </header>