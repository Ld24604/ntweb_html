## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — HTTP & Browser

#### 1. 5 bước xảy ra khi gõ [https://shopee.vn](https://shopee.vn) và nhấn Enter

1. **DNS Lookup:** Trình duyệt gửi yêu cầu phân giải tên miền `shopee.vn` thành địa chỉ IP của server Shopee.
2. **Thiết lập kết nối TCP/HTTPS:** Browser tạo kết nối bảo mật tới server thông qua giao thức HTTPS.
3. **Gửi HTTP Request:** Trình duyệt gửi request GET yêu cầu lấy trang chủ Shopee.
4. **Server xử lý và trả HTTP Response:** Server Shopee xử lý request, truy xuất dữ liệu và trả về file HTML cùng các tài nguyên CSS, JS, ảnh.
5. **Browser Rendering:** Chrome parse HTML → parse CSS → execute JavaScript → render giao diện hoàn chỉnh ra màn hình.
6. **Tải thêm tài nguyên phụ:** Browser tiếp tục gửi thêm nhiều request để lấy ảnh sản phẩm, font chữ, API dữ liệu.

#### 2. Tab Network cho thấy gì?

Tab Network hiển thị:

* Danh sách tất cả HTTP requests gửi đi
* Status code từng request
* File type (document/css/js/img/xhr)
* Size dữ liệu
* Waterfall timeline và tổng thời gian tải trang

### Câu A2 — Semantic HTML

**Nguồn tham chiếu:** `04_semantic_html5.md`

#### Website bị SEO thấp vì 4 lỗi semantic:

**Lỗi 1:** Dùng `<div class="header">` thay vì `<header>` khiến search engine không hiểu đây là phần đầu trang.

**Lỗi 2:** Menu điều hướng không dùng `<nav>` nên bot khó nhận diện navigation links.

**Lỗi 3:** Sản phẩm là một nội dung độc lập nhưng không dùng `<article>`.

**Lỗi 4:** Tên sản phẩm không dùng heading `<h1>` hoặc `<h2>`, Google không xác định được nội dung chính.

**Lỗi 5:** Ảnh thiếu thuộc tính `alt`, giảm accessibility và SEO image search.

#### Bản sửa semantic:

```html
<header>
    <h1>ShopTLU</h1>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article>
        <h2>iPhone 16 Pro</h2>
        <p>25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro chính hãng">
            <figcaption>Ảnh sản phẩm iPhone 16 Pro</figcaption>
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>
```

### Câu A3 — Block vs Inline

#### Kết quả hiển thị:

```text
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
```

#### Giải thích:

* `<div>` là block element nên luôn chiếm hết chiều ngang và xuống dòng.
* `<span>` và `<strong>` là inline element nên nằm cùng hàng nếu còn chỗ.
  => Vì vậy Hộp 1, Hộp 2, Hộp 3 mỗi cái một dòng; Text A/B cùng dòng; Text C/D cùng dòng.

---

### Câu A4 — Table

**Nguồn tham chiếu:** `05_tables_hyperlinks.md`

#### Khác nhau giữa thead, tbody, tfoot

* `<thead>`: chứa hàng tiêu đề bảng.
* `<tbody>`: chứa dữ liệu chính của bảng.
* `<tfoot>`: chứa hàng kết luận/tổng kết cuối bảng.

#### Không nên dùng table để layout vì:

1. **Code cồng kềnh khó bảo trì** — nhiều hàng cột lồng nhau.
2. **Không semantic** — trình duyệt và SEO bot hiểu nhầm là bảng dữ liệu.
3. **Responsive kém** — table khó co giãn trên điện thoại.
4. **Accessibility thấp** — screen reader đọc khó hiểu.

---

## Bài B3 — Liệt kê lỗi file Debug HTML

Lỗi 1: Dòng 1 — `<!DOCTYPE>` sai cú pháp — sửa thành `<!DOCTYPE html>`.

Lỗi 2: Dòng 2 — Thẻ `<html>` thiếu thuộc tính `lang="vi"` — thêm `lang="vi"` để khai báo ngôn ngữ trang.

Lỗi 3: Dòng 4 — Thẻ `<title>` chưa đóng — thêm `</title>`.

Lỗi 4: Dòng 5 — `<meta charset="utf8">` sai chuẩn mã hóa — sửa thành `<meta charset="UTF-8">`.

Lỗi 5: Dòng 8 — Thẻ `<h1>` đóng sai thành `<h1>` — sửa thành `</h1>`.

Lỗi 6: Dòng 12 — Thẻ `<a href="home">Trang chủ<a>` thiếu thẻ đóng `</a>`.

Lỗi 7: Dòng 12 — Giá trị `href="home"` không rõ file đích — sửa thành `href="home.html"`.

Lỗi 8: Dòng 19 — `<img src=iphone.jpg>` thiếu dấu ngoặc kép và thiếu thuộc tính `alt`.

Lỗi 9: Dòng 21 — Thẻ `<p>` và `<b>` đóng sai thứ tự — sửa thành `<p>Giá: <b>25.990.000đ</b></p>`.

Lỗi 10: Dòng 35 — Dùng thêm một thẻ `<main>` thứ hai là sai semantic HTML5 — thay bằng `<aside>`.

Lỗi 11: Dòng 41 — Thẻ `<p>` trong footer chưa đóng.

Lỗi 12: Dòng 25–33 — Bảng `<table>` thiếu cấu trúc semantic `<thead>` và `<tbody>`.

## PHẦN C — SUY LUẬN

### Câu C1 — Cấu trúc HTML trang chi tiết sản phẩm

```html
<header> <!-- phần đầu trang -->
    <nav> <!-- menu điều hướng chính -->
        <a href="#">Trang chủ</a>
        <a href="#">Điện thoại</a>
        <a href="#">Liên hệ</a>
    </nav>
</header>

<nav aria-label="breadcrumb"> <!-- breadcrumb là điều hướng -->
    <ol>
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Điện thoại</a></li>
        <li>iPhone 16</li>
    </ol>
</nav>

<main>
    <section> <!-- khu vực thông tin sản phẩm -->
        <figure> <!-- nhóm ảnh sản phẩm -->
            <img src="#" alt="Ảnh 1">
            <img src="#" alt="Ảnh 2">
            <img src="#" alt="Ảnh 3">
            <img src="#" alt="Ảnh 4">
            <img src="#" alt="Ảnh 5">
        </figure>

        <article> <!-- nội dung mô tả độc lập -->
            <h1>Tên sản phẩm</h1>
            <p>Giá bán</p>
            <p>Đánh giá sao</p>
            <p>Mô tả ngắn</p>
        </article>
    </section>

    <section>
        <h2>Thông số kỹ thuật</h2>
        <table>
            <thead>
                <tr><th>Thông số</th><th>Chi tiết</th></tr>
            </thead>
            <tbody>
                <tr><td>Màn hình</td><td>...</td></tr>
            </tbody>
        </table>
    </section>

    <section>
        <h2>Đánh giá khách hàng</h2>
        <article>Bình luận 1</article>
        <article>Bình luận 2</article>
    </section>

    <aside> <!-- sidebar vì nội dung phụ -->
        <h2>Sản phẩm tương tự</h2>
        <article>SP 1</article>
        <article>SP 2</article>
    </aside>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

### Câu C2 — Phản biện semantic HTML

Semantic HTML không phải là việc "học thêm vài thẻ cho vui" mà là nền tảng kỹ thuật giúp website hoạt động tốt hơn. Thứ nhất, về SEO: khi sử dụng các thẻ như `<header>`, `<nav>`, `<article>`, `<footer>`, công cụ tìm kiếm như Google hiểu được đâu là nội dung chính, đâu là menu, đâu là phần phụ. Nếu chỉ dùng `<div>` thì bot phải đoán, dẫn đến index nội dung kém hơn. Thứ hai, về Accessibility: các phần mềm screen reader dành cho người khiếm thị dựa vào semantic tags để đọc cấu trúc trang. Ví dụ, khi gặp `<nav>`, screen reader sẽ thông báo "navigation region", giúp người dùng di chuyển nhanh hơn.

Một ví dụ thực tế là trang tin tức. Nếu mỗi bài báo được bọc trong `<article>` và tiêu đề dùng `<h2>`, Google News dễ dàng nhận diện từng bài viết độc lập để xếp hạng. Nếu dùng toàn `<div>`, khả năng SEO sẽ giảm rõ rệt.

Tuy nhiên, không phải lúc nào `<div>` cũng vô dụng. `<div>` vẫn phù hợp khi chỉ cần một khối wrapper để nhóm nhiều phần tử phục vụ CSS layout hoặc JavaScript hook mà không mang ý nghĩa nội dung cụ thể. Vì vậy, semantic HTML không thay thế hoàn toàn `<div>`, mà giúp lập trình viên dùng đúng thẻ đúng ngữ nghĩa.