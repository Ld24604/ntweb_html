# ANSWERS — PHẦN A + C
5. type="tel" → Ô nhập số điện thoại → dùng nhập SĐT giao hàng.
6. type="date" → Date picker → dùng chọn ngày sinh/ngày giao hàng.
7. type="radio" → Chọn 1 trong nhiều lựa chọn → dùng chọn giới tính/phương thức thanh toán.
8. type="checkbox" → Chọn nhiều hoặc xác nhận → dùng đồng ý điều khoản.
9. type="file" → Upload file → dùng upload ảnh đại diện.
10. type="range" → Thanh kéo slider → dùng chọn số ngày giao hàng.

## Câu A2 — Dự đoán validation

1. required + value rỗng → Browser chặn submit và báo hãy điền trường này.
2. type=email + abc → Browser báo email không đúng định dạng.
3. type=number min=1 max=10 nhưng nhập 15 → Browser báo giá trị phải nhỏ hơn hoặc bằng 10.
4. pattern [0-9]{10} nhưng nhập abc123 → Browser báo không khớp định dạng yêu cầu.
5. password minlength=8 nhưng nhập 123 → Browser báo cần ít nhất 8 ký tự.

Kết quả chạy validation_test.html trùng với dự đoán.

## Câu A3 — Accessibility

1. label với for giúp screen reader đọc tên trường nhập liệu và khi click label sẽ focus đúng input.
2. fieldset + legend dùng khi nhóm các input liên quan, ví dụ nhóm Thông tin giao hàng gồm địa chỉ, thành phố, quận huyện.
3. aria-label dùng cho button icon hoặc thành phần không có text hiển thị. Không nên dùng aria-label thay label nếu đã có label vì label semantic hơn và hỗ trợ tốt hơn.

## Câu A4 — Media

1. loading="lazy" giúp trì hoãn tải ảnh khi chưa cuộn tới, tăng tốc load trang. Không nên dùng với ảnh banner đầu trang vì cần hiển thị ngay.
2. Nhiều source trong video giúp tương thích nhiều browser. Các format phổ biến: mp4, webm, ogg.
3. alt dùng để mô tả ảnh khi ảnh lỗi hoặc cho screen reader.
- iPhone 16: alt="iPhone 16 Pro Max màu titan tự nhiên mặt trước"
- Ảnh decorative: alt=""
- Biểu đồ doanh thu: alt="Biểu đồ doanh thu quý 1 năm 2026 tăng 20 phần trăm"

## Câu A5 — figure vs img

Cách 1 dùng khi chỉ hiển thị ảnh đơn lẻ như icon, logo, ảnh minh họa nhỏ.
Ví dụ: logo website, icon thanh toán.

Cách 2 dùng khi ảnh cần chú thích hoặc mang ý nghĩa nội dung.
Ví dụ: ảnh sản phẩm kèm giá, ảnh biểu đồ kèm mô tả.

## Câu C1 — Debug Form 8 lỗi

Lỗi 1: Input Tên không có label for và id.
Sửa: <label for="name">Tên:</label><input type="text" id="name" name="name" required>

Lỗi 2: Input email không có label.
Lỗi 3: Input email thiếu required.
Lỗi 4: Hai input password không có label riêng.
Lỗi 5: Password không có minlength/pattern.
Lỗi 6: Phone dùng type=text thay vì tel và không có pattern.
Lỗi 7: Select không có label/name.
Lỗi 8: Điều khoản chỉ có label text nhưng không có checkbox required.

## Câu C2 — Validation ngân hàng

1. Regex:
- CCCD: pattern="[0-9]{12}"
- Số tài khoản: pattern="[0-9]{10,15}"

2. HTML5 validation chưa đủ an toàn vì user có thể tắt validation hoặc gửi request giả.

3. HTML5 không thể:
- So sánh confirm password trùng password
- Kiểm tra email đã tồn tại chưa
- Kiểm tra OTP/server-side data

4. Rủi ro nếu chỉ validate frontend:
- Hacker bypass gửi dữ liệu xấu trực tiếp tới server
- SQL injection/XSS hoặc dữ liệu sai lưu vào database