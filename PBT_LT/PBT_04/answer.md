# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                    | Cuộn theo trang?               | Use case                                  |
| -------- | ------------------------- | ------------------------------------ | ------------------------------ | ----------------------------------------- |
| static   | Có                        | Theo flow mặc định                   | Có                             | Layout thông thường                       |
| relative | Có                        | Vị trí gốc của chính nó              | Có                             | Dịch nhẹ element, làm anchor cho absolute |
| absolute | Không                     | Parent có position ≠ static gần nhất | Có                             | Badge, tooltip, dropdown                  |
| fixed    | Không                     | Viewport                             | Không                          | Chat button, header cố định               |
| sticky   | Có (ban đầu)              | Viewport khi đạt ngưỡng top          | Chỉ dính khi scroll đến ngưỡng | Sticky header, sticky sidebar             |

### Khi nào absolute tham chiếu body? Khi nào tham chiếu parent?

Absolute sẽ tìm phần tử cha gần nhất có:

* position: relative
* position: absolute
* position: fixed
* position: sticky

để làm gốc tọa độ.

Nếu không có phần tử nào thỏa mãn thì absolute sẽ tham chiếu tới html/body.

### Nearest Positioned Ancestor

Là phần tử tổ tiên gần nhất có position khác static.

Absolute sẽ dùng phần tử này làm hệ tọa độ.

---

## Câu A2 — Dự đoán Layout

### Trường hợp 1

4 item chia đều thành 4 cột:

[1] [2] [3] [4]

### Trường hợp 2

6 item, mỗi item chiếm khoảng 50%.

Bố cục:

[1] [2]

[3] [4]

[5] [6]

=> 3 hàng × 2 cột

### Trường hợp 3

Item 1 nằm trái, Item 2 giữa, Item 3 phải.

Tất cả căn giữa theo chiều dọc.

### Trường hợp 4

3 cột:

200px | 1fr | 200px

### Trường hợp 5

7 item:

[1] [2] [3]

[4] [5] [6]

[7]

=> 3 hàng

---

# PHẦN C — SUY LUẬN

## Câu C1

### 1. Navigation bar

Flexbox

Vì đây là layout một chiều theo hàng ngang.

### 2. Lưới ảnh Instagram

Grid

Vì đây là layout hai chiều gồm nhiều hàng và nhiều cột.

### 3. Layout blog

Grid

Dễ chia sidebar và content.

### 4. Footer 4 cột

Grid

Dễ chia đều 4 cột.

### 5. Card sản phẩm

Flexbox

Dễ sắp xếp ảnh → text → nút theo chiều dọc.

---

## Câu C2

### Lỗi 1

Nguyên nhân:

Card không dùng Flex Column nên nút Mua không nằm cùng vị trí.

Sửa:

.card{
display:flex;
flex-direction:column;
}

.btn{
margin-top:auto;
}

---

### Lỗi 2

Nguyên nhân:

Thiếu justify-content và align-items.

Sửa:

.hero{
height:100vh;
display:flex;
justify-content:center;
align-items:center;
}

---

### Lỗi 3

Nguyên nhân:

Sidebar bị flex-shrink.

Sửa:

.sidebar{
width:250px;
flex-shrink:0;
}

hoặc

.sidebar{
flex:0 0 250px;
}
