# PHIẾU BÀI TẬP 05
# CSS RESPONSIVE & SCSS

---

# PHẦN A

## Câu A1

### 1. Meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích:

- width=device-width:
  chiều rộng trang bằng chiều rộng thiết bị

- initial-scale=1.0:
  mức zoom ban đầu là 100%

### 2. Nếu thiếu viewport

iPhone sẽ giả lập trang như màn hình desktop khoảng 980px.

Kết quả:

- Chữ rất nhỏ
- Layout không responsive
- Người dùng phải zoom

### 3. Mobile First và Desktop First

Mobile First:

```css
.card{
    width:100%;
}

@media(min-width:768px){
    .card{
        width:50%;
    }
}
```

Desktop First:

```css
.card{
    width:50%;
}

@media(max-width:768px){
    .card{
        width:100%;
    }
}
```

Mobile First được khuyên dùng vì:

- Ưu tiên mobile
- CSS nhẹ hơn
- Dễ mở rộng
- Tốt cho SEO và hiệu năng

---

## Câu A2

| Breakpoint | Thiết bị |
|------------|-----------|
| <576px | Mobile |
| ≥576px | Mobile lớn |
| ≥768px | Tablet |
| ≥992px | Laptop |
| ≥1200px | Desktop |
| ≥1400px | Large Desktop |

Ví dụ grid sản phẩm:

- Mobile: 1 cột
- Tablet: 2 cột
- Laptop: 3 cột
- Desktop: 4 cột

---

## Câu A3

| Chiều rộng màn hình | Container |
|---------------------|-----------|
| 375px | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---

## Câu A4

### Variables

```scss
$primary-color: blue;
```

### Nesting

```scss
.card{
    h3{
        color:red;
    }
}
```

### Mixins

```scss
@mixin center{
    display:flex;
    justify-content:center;
}

.box{
    @include center;
}
```

### Extend

```scss
.btn{
    padding:10px;
}

.btn-primary{
    @extend .btn;
}
```

Trình duyệt không đọc được SCSS vì SCSS là ngôn ngữ tiền xử lý.

Cần compile:

SCSS → CSS

bằng:

- Live Sass Compiler
- Vite
- Webpack
- Sass CLI

---

# PHẦN C

## Câu C1

Website chọn: YouTube

### Mobile 375px

- Menu hamburger
- Sidebar ẩn
- Video 1 cột

### Tablet 768px

- Sidebar thu gọn
- Video 2 cột

### Desktop 1440px

- Sidebar đầy đủ
- Video 4-5 cột

### Thành phần bị ẩn trên mobile

- Sidebar mở rộng
- Một số nút điều hướng

### Font

Font gần như giữ nguyên nhưng khoảng cách thay đổi.

### Media Queries

Ví dụ:

```css
@media (min-width:768px)
```

```css
@media (min-width:1024px)
```

---

## Câu C2

### Mobile

Header
Hero
Grid ảnh (1 cột)
Form
Map
Footer

### Tablet

Header
Hero
Grid ảnh (2 cột)
Form
Map
Footer

### Desktop

Header
Hero
Grid ảnh (3 cột)
Form + Map (2 cột)
Footer

CSS Skeleton:

```css
.gallery{
    display:grid;
    grid-template-columns:1fr;
}

@media(min-width:768px){
    .gallery{
        grid-template-columns:repeat(2,1fr);
    }
}

@media(min-width:1024px){
    .gallery{
        grid-template-columns:repeat(3,1fr);
    }
}