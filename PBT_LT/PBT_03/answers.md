# ANSWERS — PHẦN A + C

## A1 — 3 Cách Nhúng CSS

### 1. Inline CSS
```html
<p style="color: red;">Xin chào</p>
````

Ưu điểm: Nhanh, áp dụng trực tiếp.
Nhược điểm: Khó bảo trì, lặp code.
Khi dùng: Test nhanh.

### 2. Internal CSS

```html
<style>
p { color: blue; }
</style>
```

Ưu điểm: Gọn trong 1 file HTML.
Nhược điểm: Không tái sử dụng cho nhiều trang.
Khi dùng: Trang đơn giản.

### 3. External CSS

```html
<link rel="stylesheet" href="style.css">
```

Ưu điểm: Tái sử dụng, chuyên nghiệp.
Nhược điểm: Cần file riêng.
Khi dùng: Mọi dự án thực tế.

### Độ ưu tiên

Inline > Internal/External.
Nếu specificity bằng nhau thì rule viết sau thắng.

---

## A2 — Selectors

1. h1 → ShopTLU
2. .price → 25.990.000đ và 45.990.000đ
3. #app header → toàn bộ phần header chứa ShopTLU và menu
4. nav a:first-child → Home
5. .product.featured h2 → MacBook Pro
6. article > p → 4 thẻ p bên trong hai article
7. a[href="/"] → Home
8. .top-bar.dark h1 → ShopTLU

---

## A3 — Box Model

### Trường hợp 1 (content-box)

* Chiều rộng hiển thị = 400 + 40 + 10 = 450px
* Không gian chiếm trên trang = 450 + 20 = 470px

### Trường hợp 2 (border-box)

* Chiều rộng hiển thị = 400px
* Content thực tế = 400 - 40 - 10 = 350px
* Không gian chiếm trên trang = 400 + 20 = 420px

### Trường hợp 3

* Khoảng cách giữa hai box = 40px
* Vì margin dọc bị collapse, chỉ lấy giá trị lớn hơn.

### Nâng cao

-10px và 40px → khoảng cách = 30px

---

## A4 — Specificity

### Rule A

p { color: black; }
Specificity: (0,0,1)

### Rule B

.price { color: blue; }
Specificity: (0,1,0)

### Rule C

#main-price { color: red; }
Specificity: (1,0,0)

### Rule D

p.price { color: green; }
Specificity: (0,1,1)

### Kết quả

Màu cuối cùng: đỏ (Rule C thắng).

### Inline style

style="color: orange;" → màu cam.

### Rule A !important

p { color: black !important; }
→ màu đen.

---

## B1 — 5 loại selectors trong style.css

1. body (element selector)
2. .active (class selector)
3. #skills (id selector)
4. nav a (descendant selector)
5. nav a:hover (pseudo-class)

---

## B2 — Kết quả đo DevTools

* Hộp content-box: 350px
* Hộp border-box: 300px
* Content-box cộng thêm padding và border vào width.
* Border-box giữ nguyên width.

---

## B3 — Specificity Battle

Màu cuối cùng là màu của rule có specificity cao nhất.
Nếu specificity bằng nhau thì rule viết sau thắng.
Đổi thứ tự chỉ ảnh hưởng khi specificity bằng nhau.

---

## C1 — Debug Layout

### Sidebar thực tế

300 + 40 + 2 = 342px

### Content thực tế

660 + 60 + 2 = 722px

### Tổng

342 + 722 = 1064px > 960px

### Cách sửa 1

Dùng:

```css
* { box-sizing: border-box; }
```

### Cách sửa 2

Giảm width:

* Sidebar: 258px
* Content: 598px

---

## C2 — Cascade Puzzle

### Sản phẩm A

* font-size: 20px
* color: green

### Mô tả sản phẩm

* color: blue

### Sản phẩm B

* font-size: 20px
* color: blue

### Mô tả sản phẩm B

* color: green