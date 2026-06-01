function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">Giới thiệu</h2>
        <div className="about-grid">
          <img className="about-img" src="https://picsum.photos/300/300?random=20" alt="Ảnh đại diện" />
          <div>
            <p className="lead">Tôi là Lê Duy Nhật Minh, sinh viên lớp 64KTPM5 — Đại học Thủy Lợi.</p>
            <p>Tôi tập trung phát triển Frontend với React, JavaScript và CSS. Tôi thích biến thiết kế thành sản phẩm chạy được, chú trọng trải nghiệm người dùng và khả năng responsive.</p>
            <div className="about-stats">
              <div><strong>15+</strong><span>Dự án</span></div>
              <div><strong>2+</strong><span>Năm học</span></div>
              <div><strong>10+</strong><span>Công nghệ</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;