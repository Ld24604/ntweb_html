
function Hero({ name, title }) {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Full-Stack Developer</p>
        <h1>Xin chào, tôi là <span>{name}</span></h1>
        <p className="hero-sub">{title}</p>
        <div className="hero-actions">
          <a href="#portfolio" className="btn btn-light">Xem dự án</a>
          <a href="#contact" className="btn btn-outline">Liên hệ</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;