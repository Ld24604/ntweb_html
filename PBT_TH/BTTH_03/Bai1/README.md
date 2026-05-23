# Hệ thống Quản lý Sinh viên

## Giới thiệu
Đây là ứng dụng quản lý sinh viên được xây dựng bằng HTML, CSS và JavaScript thuần, tập trung vào DOM manipulation và xử lý sự kiện.

## Các chức năng chính

### 1. Hiển thị danh sách sinh viên
- Danh sách sinh viên được hiển thị dưới dạng bảng với các thông tin:
  - Mã sinh viên
  - Họ và tên
  - Ngày sinh
  - Lớp học
  - Điểm trung bình
  - Email

### 2. Thêm sinh viên mới
- Bấm nút "Thêm Sinh viên"
- Điền đầy đủ thông tin trong form
- Bấm nút "Thêm" để lưu
- Dữ liệu sẽ được thêm vào bảng ngay lập tức
- Mã sinh viên được tự động sinh ra (SV001, SV002, ...)

### 3. Sửa thông tin sinh viên
- Bấm nút "Sửa" trên dòng của sinh viên cần sửa
- Dữ liệu sẽ tự động được điền vào form
- Cập nhật thông tin và bấm "Cập nhật"
- Bảng sẽ được cập nhật ngay lập tức

### 4. Xóa sinh viên
- Bấm nút "Xóa" trên dòng của sinh viên cần xóa
- Một hộp xác nhận sẽ hiện ra
- Bấm "Xóa" để xác nhận hoặc "Hủy" để huỷ bỏ
- Nếu xác nhận, sinh viên sẽ bị xóa khỏi danh sách

### 5. Thống kê
- Hiển thị tổng số sinh viên
- Hiển thị điểm trung bình của cả lớp
- Cập nhật tự động sau mỗi thao tác

### 6. Lưu trữ dữ liệu
- Tất cả dữ liệu được lưu trong localStorage
- Dữ liệu sẽ được khôi phục khi tải lại trang

## Kiến thức DOM và xử lý sự kiện được áp dụng

### DOM Manipulation:
- `getElementById()`: Lấy phần tử theo ID
- `querySelector()`, `querySelectorAll()`: Lấy phần tử theo CSS selector
- `innerHTML`, `textContent`: Thay đổi nội dung
- `classList.add()`, `classList.remove()`: Thay đổi class
- `createElement()`, `appendChild()`: Tạo và thêm phần tử mới
- `.value`: Lấy giá trị từ input
- `.disabled`: Vô hiệu hóa input

### Event Handling:
- `addEventListener()`: Gắn sự kiện
- `click`: Sự kiện khi nhấp chuột
- `submit`: Sự kiện khi submit form
- `DOMContentLoaded`: Sự kiện khi trang load xong
- Event delegation: Xử lý sự kiện cho các phần tử trong bảng

### Khác:
- localStorage: Lưu trữ và lấy dữ liệu
- JSON.stringify/parse: Chuyển đổi dữ liệu
- Array methods: map, filter, find, reduce, forEach, splice...

## Hướng dẫn sử dụng

1. Mở file `index.html` trong trình duyệt web
2. Sử dụng các nút và form để quản lý sinh viên
3. Dữ liệu tự động được lưu trong localStorage

## Yêu cầu browser
- Trình duyệt hỗ trợ ES6 và localStorage (các trình duyệt hiện đại)

## Cấu trúc file
```
Bai1/
├── index.html      # Trang chính
├── styles.css      # CSS styling
├── script.js       # JavaScript logic
└── README.md       # Hướng dẫn này
```

## Lưu ý
- Mã sinh viên không thể trùng lặp
- Điểm phải từ 0 đến 10
- Email phải có định dạng hợp lệ
- Tất cả các trường thông tin là bắt buộc
