
import { useState } from 'react';

function Contact() {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const newErrors = {};
    if (formData.name.trim().length < 2) newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (formData.message.trim().length < 10) newErrors.message = 'Lời nhắn phải có ít nhất 10 ký tự';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container container-narrow">
        <h2 className="section-title">Liên hệ</h2>

        {submitted && <div className="alert-success">✅ Cảm ơn bạn! Lời nhắn đã được gửi.</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label>Họ tên</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tên của bạn" />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ban@example.com" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="field">
            <label>Lời nhắn</label>
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Nội dung..."></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Gửi lời nhắn</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;