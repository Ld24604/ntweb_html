
function Header() {
  const links = ['home', 'about', 'skills', 'portfolio', 'contact'];
  const labels = { home: 'Trang chủ', about: 'Giới thiệu', skills: 'Kỹ năng', portfolio: 'Dự án', contact: 'Liên hệ' };
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a className="brand" href="#home"><span>Dev</span>Portfolio</a>
        <nav className="nav-links">
          {links.map(id => (
            <a key={id} href={`#${id}`}>{labels[id]}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;