# PHẦN A — ĐỌC HIỂU

## Câu A1 (10đ) — Grid System

### Layout theo breakpoint

- Kích thước < 768px
  - Số cột: 1 cột
  - Bố cục: Box 1 / Box 2 / Box 3 / Box 4 (xếp dọc)

- Kích thước 768px - 991px
  - Số cột: 2 cột
  - Bố cục: 2 hàng, mỗi hàng 2 box
    - Hàng 1: Box 1 | Box 2
    - Hàng 2: Box 3 | Box 4

- Kích thước ≥ 992px
  - Số cột: 4 cột
  - Bố cục: 1 hàng, 4 box ngang
    - Box 1 | Box 2 | Box 3 | Box 4

### Giải thích thêm

- `col-md-6` nghĩa là cột chiếm 6/12 phần trên màn hình từ breakpoint `md` trở lên (≥ 768px).
- Không cần viết `col-sm-12` vì Bootstrap mặc định mỗi cột sẽ chiếm toàn bộ chiều ngang khi không có class breakpoint cụ thể. Khi dùng `col-md-6`, trên màn hình nhỏ hơn `md` (như `sm` hoặc `xs`), cột sẽ tự động xếp thành 100% rộng bằng cách mặc định.

## Câu A2 (10đ) — Utilities & Components

1. `d-none d-md-block`
   - `d-none`: ẩn element ở mọi kích thước.
   - `d-md-block`: hiển thị element ở kiểu `block` từ breakpoint `md` trở lên (≥ 768px).
   - Kết luận: element này sẽ ẩn trên thiết bị nhỏ (`< 768px`) và hiển thị trên thiết bị trung bình trở lên (`≥ 768px`).

2. 5 lớp spacing utility và giải thích
   - `mt-3`: margin-top bằng mức 3.
   - `mb-auto`: margin-bottom tự động, đẩy element xuống dưới nếu có không gian.
   - `px-4`: padding trái phải bằng mức 4.
   - `py-2`: padding trên dưới bằng mức 2.
   - `ms-5`: margin-left (start) bằng mức 5.

3. Khác nhau giữa `.container`, `.container-fluid`, `.container-md`
   - `.container`: chiều rộng cố định và thay đổi theo breakpoint, có lề tự động hai bên để căn giữa nội dung.
   - `.container-fluid`: luôn chiếm 100% chiều rộng viewport, không bị giới hạn.
   - `.container-md`: chiếm 100% chiều rộng cho đến breakpoint `md`, sau đó giới hạn chiều rộng như một container bình thường từ `md` trở lên.

# PHẦN C — PHÂN TÍCH

## Câu C1 (10đ) — Tùy biến Bootstrap

1. Đổi màu `$primary` sang `#E63946`
   - Quy trình:
     1. Cài đặt Bootstrap source bằng npm hoặc dùng file SCSS (Bootstrap SCSS).
     2. Tạo file SCSS tùy chỉnh, ví dụ `custom.scss`.
     3. Trong file SCSS, ghi lại biến trước khi import Bootstrap:
        ```scss
        $primary: #E63946;
        @import "bootstrap";
        ```
     4. Biên dịch SCSS thành CSS bằng Sass hoặc công cụ build (ví dụ `sass custom.scss custom.css`).
   - Cần công cụ: trình biên dịch Sass (Dart Sass, node-sass, hoặc công cụ build như webpack/vite).
   - Cần modify file: không sửa trực tiếp file bootstrap gốc; chỉ sửa file SCSS tùy chỉnh của dự án.

2. Tại sao không nên override trực tiếp `.btn-primary { background: red; }`
   - Vì Bootstrap được thiết kế theo hệ biến SASS. Sử dụng biến `$primary` giúp thay đổi màu cho toàn bộ thành phần liên quan (button, link, border, hover, active) nhất quán.
   - Override CSS thủ công dễ gây xung đột, khó bảo trì, và phải viết lại nhiều quy tắc hơn.
   - Dùng biến SASS giúp tái sử dụng, dễ nâng cấp Bootstrap và giữ được cách thiết kế theo theme.

## Câu C2 (10đ) — So sánh

1. Số dòng CSS cần viết
   - CSS thuần: cần nhiều dòng hơn, thường phải viết các quy tắc layout, responsive, spacing, màu sắc và trạng thái.
   - Bootstrap: chỉ cần dùng các class có sẵn, ít hoặc không cần CSS riêng.

2. Thời gian phát triển
   - CSS thuần: lâu hơn vì phải tự thiết kế và test responsive.
   - Bootstrap: nhanh hơn vì dùng sẵn component và utility.

3. Khả năng tùy biến
   - CSS thuần: cao hơn, vì viết được mọi kiểu cụ thể.
   - Bootstrap: vẫn tùy biến được nhưng giới hạn trong cấu trúc class và theme; cần ghi đè hoặc thay đổi biến nếu muốn tùy chỉnh sâu.

4. Khi nên dùng Bootstrap?
   - Nên dùng khi cần phát triển nhanh, muốn có layout responsive sẵn, hoặc khi dự án không yêu cầu thiết kế quá đặc thù.
   - Không nên dùng khi cần UI hoàn toàn tùy chỉnh, trọng lượng nhẹ nhất có thể, hoặc khi muốn tránh phụ thuộc vào framework.
