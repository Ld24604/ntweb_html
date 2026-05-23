# Ứng dụng Quản lý Công việc Cá nhân

## Giới thiệu
Đây là ứng dụng quản lý công việc cá nhân được xây dựng bằng HTML, CSS và JavaScript thuần, tập trung vào DOM manipulation và xử lý sự kiện.

## Các chức năng chính

### 1. Hiển thị danh sách công việc
- Danh sách công việc được hiển thị dưới dạng card với các thông tin:
  - Tiêu đề công việc
  - Mô tả chi tiết
  - Hạn hoàn thành
  - Mức ưu tiên (Thấp, Trung bình, Cao)
  - Trạng thái hoàn thành

### 2. Thêm công việc mới
- Bấm nút "Thêm Công việc"
- Điền đầy đủ thông tin trong form (tiêu đề, mô tả, hạn, ưu tiên)
- Bấm nút "Thêm" để lưu
- Công việc sẽ được thêm vào danh sách ngay lập tức

### 3. Sửa công việc
- Bấm nút "Sửa" trên card của công việc cần sửa
- Dữ liệu sẽ tự động được điền vào form
- Cập nhật thông tin và bấm "Cập nhật"
- Danh sách sẽ được cập nhật ngay lập tức

### 4. Xóa công việc
- Bấm nút "Xóa" trên card của công việc cần xóa
- Một hộp xác nhận sẽ hiện ra
- Bấm "Xóa" để xác nhận hoặc "Hủy" để huỷ bỏ
- Nếu xác nhận, công việc sẽ bị xóa khỏi danh sách

### 5. Đánh dấu hoàn thành
- Bấm vào checkbox trên card công việc để đánh dấu hoàn thành
- Công việc hoàn thành sẽ hiển thị với hiệu ứng khác nhau
- Trạng thái sẽ được lưu tự động

### 6. Thống kê
- Hiển thị tổng số công việc
- Hiển thị số công việc đã hoàn thành
- Hiển thị số công việc chưa hoàn thành
- Cập nhật tự động sau mỗi thao tác

### 7. Lưu trữ dữ liệu
- Tất cả dữ liệu được lưu trong localStorage
- Dữ liệu sẽ được khôi phục khi tải lại trang

## Kiến thức DOM và xử lý sự kiện được áp dụng

### DOM Manipulation:
- `getElementById()`: Lấy phần tử theo ID
- `querySelector()`, `closest()`: Tìm phần tử theo selector
- `innerHTML`, `textContent`: Thay đổi nội dung
- `dataset`: Lưu trữ dữ liệu tùy chỉnh trên element
- `classList.add()`, `.remove()`: Thay đổi class
- `createElement()`, `appendChild()`: Tạo và thêm phần tử mới
- `.value`: Lấy giá trị từ input
- `.checked`: Trạng thái checkbox

### Event Handling:
- `addEventListener()`: Gắn sự kiện
- `click`: Sự kiện khi nhấp chuột
- `submit`: Sự kiện khi submit form
- `change`: Sự kiện khi checkbox thay đổi
- `DOMContentLoaded`: Sự kiện khi trang load xong
- **Event delegation**: Xử lý sự kiện cho các phần tử được tạo động bằng event delegation với `.closest()` và data attributes
- `e.target.closest()`: Tìm phần tử cha gần nhất có class hoặc selector nhất định

### Khác:
- localStorage: Lưu trữ và lấy dữ liệu
- JSON.stringify/parse: Chuyển đổi dữ liệu
- Array methods: filter, find, findIndex, splice, forEach...
- Template literals: Tạo HTML động
- HTML escaping: Phòng chống XSS

## Hướng dẫn sử dụng

1. Mở file `index.html` trong trình duyệt web
2. Sử dụng các nút và form để quản lý công việc
3. Dữ liệu tự động được lưu trong localStorage

## Yêu cầu browser
- Trình duyệt hỗ trợ ES6 và localStorage (các trình duyệt hiện đại)

## Cấu trúc file
```
Bai2/
├── index.html      # Trang chính
├── styles.css      # CSS styling
├── script.js       # JavaScript logic
└── README.md       # Hướng dẫn này
```

## Lưu ý
- Tiêu đề công việc là trường bắt buộc
- Hạn hoàn thành là trường bắt buộc
- Mức ưu tiên là trường bắt buộc
- Mô tả chi tiết là tùy chọn
- Dữ liệu được tự động lưu khi thêm, sửa, xóa hoặc đánh dấu hoàn thành

## Ghi chú về Event Delegation
Ứng dụng này sử dụng **event delegation** để xử lý sự kiện cho các công việc:
- Checkbox: Sử dụng `addEventListener` trên container với check `classList.contains('task-checkbox')`
- Nút Edit/Delete: Sử dụng `addEventListener` trên container với `closest('.task-card')` để tìm card mẹ
- Data attributes: Lưu trữ task ID trong `data-task-id` để dễ dàng xác định công việc nào được tác động
- Tránh việc phải gắn sự kiện cho từng công việc riêng lẻ, thay vào đó gắn một sự kiện cho toàn bộ container
