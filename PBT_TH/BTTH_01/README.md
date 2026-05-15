# Session 1 — HTML/CSS Fundamentals

## 🎯 Mục tiêu

Xây dựng trang portfolio cá nhân hoàn chỉnh với HTML5, CSS3, Flexbox, Grid và responsive design.

## 📁 Cấu trúc dự án

```
BTTH_01/
├── projects/
│   └── portfolio_site/          ← Main project (HTML/CSS/JS)
│       ├── index.html           
│       ├── css/
│       │   ├── variables.css     ← CSS variables
│       │   ├── base.css          ← Reset & base styles
│       │   ├── header.css        ← Header & navigation
│       │   ├── hero.css          ← Hero section
│       │   ├── about.css         ← About section
│       │   ├── skills.css        ← Skills section
│       │   ├── portfolio.css     ← Portfolio gallery
│       │   ├── contact.css       ← Contact form
│       │   └── footer.css        ← Footer
│       └── js/
│           └── main.js           ← JavaScript
└── exercises/                    ← Bài tập chi tiết
    ├── 01_hero_section.md
    ├── 02_about_skills.md
    ├── 03_portfolio_gallery.md
    └── 04_contact_footer.md
```

## ✨ Tính năng đã hoàn thành

### Bài 1.1 - Header + Hero Section ✅
- [x] Sticky header với logo và navigation
- [x] Hamburger menu mobile (CSS-only)
- [x] Hero section full viewport height
- [x] CTA button với hover effects
- [x] Responsive design (desktop/tablet/mobile)

### Bài 1.2 - About + Skills Section ✅
- [x] 2-column grid layout (responsive)
- [x] Circular profile image
- [x] Skills grid với 4 items
- [x] Progress bars với animation
- [x] Smooth animations khi scroll

### Bài 1.3 - Portfolio Gallery ✅
- [x] 3-column responsive grid (6 items)
- [x] Hover zoom effects
- [x] Portfolio overlay with text
- [x] CSS-only lightbox (`:target` selector)
- [x] Filter buttons (All/Web/Mobile/Design)

### Bài 1.4 - Contact + Footer ✅
- [x] Contact form với validation
- [x] 2-column layout (responsive)
- [x] Form focus effects
- [x] Footer với social links
- [x] Copyright info

## 🎨 Design System

### Colors
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)  
- **Dark**: #1e293b (Slate)
- **Light**: #f8fafc (Slate light)
- **Text**: #334155 (Slate text)

### Typography
- **Font**: Segoe UI, sans-serif
- **H1**: 3.5rem (desktop), 2.5rem (mobile)
- **H2**: 2.5rem
- **Body**: 1rem / 1.6

### Breakpoints
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

## 🚀 Cách sử dụng

1. **Mở trang web**:
   - File: `projects/portfolio_site/index.html`
   - Mở bằng Live Server hoặc trực tiếp trong trình duyệt

2. **Chỉnh sửa nội dung**:
   - Thay "Your Name" bằng tên của bạn
   - Cập nhật email, vị trí, thông tin cá nhân
   - Thay URL placeholder images bằng ảnh thực

3. **Tùy chỉnh CSS**:
   - CSS variables ở: `css/variables.css`
   - Module CSS cho từng phần (header, hero, v.v.)

## 📋 Checklists hoàn thành

### Development
- [x] HTML5 semantic structure
- [x] CSS Grid & Flexbox layout
- [x] CSS Custom Properties (variables)
- [x] Responsive design (mobile-first)
- [x] Hover effects & animations
- [x] Form styling & validation
- [x] Lightbox implementation
- [x] JavaScript interactivity

### Code Quality
- [x] Clean, organized CSS
- [x] Modular component structure
- [x] Reusable classes & utilities
- [x] Accessible HTML (labels, alt text)
- [x] Cross-browser compatibility

### Responsive Testing
- [x] Desktop (1920px)
- [x] Tablet (768px)
- [x] Mobile (375px - 480px)
- [x] Touch interactions (hover → active states)

## 💡 Hướng dẫn Git Commits

### Format commit messages

```
[TYPE] Mô tả ngắn gọn (max 50 ký tự)
```

### Các loại commit (TYPE):
- `[SETUP]` - Thiết lập dự án
- `[FEATURE]` - Thêm tính năng mới
- `[STYLE]` - CSS/styling
- `[UI]` - Hover effects, animations
- `[BUGFIX]` - Fix lỗi
- `[REFACTOR]` - Cấu trúc lại code

### Workflow Commits:

```bash
# Bài 1.1 - Header + Hero (3 commits)
git commit -m "[SETUP] Initialize project structure"
git commit -m "[FEATURE] Implement header navigation"
git commit -m "[FEATURE] Complete hero section with CTA"

# Bài 1.2 - About + Skills (3 commits)
git commit -m "[STYLE] Create about section layout"
git commit -m "[FEATURE] Add skills progress bars"
git commit -m "[REFACTOR] Optimize responsive breakpoints"

# Bài 1.3 - Portfolio (3 commits)
git commit -m "[FEATURE] Build portfolio grid layout"
git commit -m "[UI] Add hover zoom effects"
git commit -m "[FEATURE] Implement CSS-only lightbox"

# Bài 1.4 - Contact + Footer (3 commits)
git commit -m "[FEATURE] Style contact form inputs"
git commit -m "[FEATURE] Add responsive footer"
git commit -m "[REFACTOR] Final responsive adjustments"
```

## 🔍 Features chi tiết

### Header & Navigation
- Position: sticky (fixed at top)
- Z-index: 1000 (stays above content)
- Mobile menu: checkbox hack + label
- Animation: underline on hover

### Hero Section
- Height: 100vh (full viewport)
- Layout: flex column centered
- Background: gradient (primary → secondary)
- CTA button: scale + shadow on hover

### About Section
- Grid: 2 columns (desktop), 1 column (mobile)
- Image: 300x300px circular with hover
- Typography: lead paragraph (1.25rem)

### Skills Section
- Grid: 2 columns (desktop), 1 column (mobile)
- Progress: 0% → target% animation on scroll
- Gradient: primary → secondary
- Height: 12px bars

### Portfolio Gallery
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Hover: image zoom (1.1x) + overlay opacity
- Lightbox: CSS `:target` selector
- 6 items: 3 web, 2 mobile, 1 design

### Contact Form
- Layout: 2 columns (desktop), 1 (mobile)
- Inputs: focus border color + box-shadow
- Validation: `:valid` pseudo-class styling
- Submit: gradient button with hover

### Footer
- Layout: 3 columns (desktop), 1 (mobile)
- Social: icon buttons with circle background
- Hover: scale + color change
- Copyright: centered text

## 🐛 Troubleshooting

**Header không sticky?**
```css
position: sticky;
top: 0;
z-index: 1000;
```

**Mobile menu không toggle?**
- Kiểm tra `.menu-toggle:checked ~ .nav` selector
- Verify checkbox input exists

**Progress bars không animate?**
- Check IntersectionObserver in main.js
- Verify `fillBar` animation in CSS

**Lightbox không mở?**
- Verify `#lightbox-id` anchors match
- Check `:target` pseudo-class styling

## 📚 Tài liệu tham khảo

- [MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
- [CSS-Tricks Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## ✅ Success Criteria

- [ ] Tất cả 4 bài tập hoàn thành
- [ ] Responsive trên mobile/tablet/desktop
- [ ] Git commits: 12+ với format chuẩn
- [ ] Không copy nguyên cả file từ solutions
- [ ] Code sạch, có comment khi cần
- [ ] Form validation hoạt động
- [ ] Animations mịn (60fps)

---

**Happy Coding! 🚀**
