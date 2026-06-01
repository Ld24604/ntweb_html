# Component Tree — ShopVN

**Lê Duy Nhật Minh · 64KTPM5**

## Sơ đồ component tree

```
App
├── Navbar
│     ├── (logo)
│     └── (menu links)
├── Hero
│     ├── (tiêu đề)
│     └── (nút CTA)
├── ProductGrid
│     ├── ProductCard  (props: product)
│     ├── ProductCard
│     ├── ProductCard
│     └── ... (map từ mảng products)
└── Footer
      └── (copyright)
```

## Props flow (cha → con)

- `App` giữ mảng `products`, truyền xuống `ProductGrid` qua prop `products`.
- `ProductGrid` dùng `.map()` tạo nhiều `ProductCard`, mỗi cái nhận prop `product` (và `key={product.id}`).
- `Navbar`, `Hero`, `Footer` là component tĩnh, có thể nhận vài prop nhỏ (tên shop, tiêu đề) nhưng không chứa logic render danh sách.

## Khi nào nên tách component?

- Khi một khối UI **lặp lại** (mỗi sản phẩm → `ProductCard`).
- Khi một khối UI **làm đúng một việc** và có thể tái sử dụng (Navbar, Footer).
- Khi `App` quá dài → tách để dễ đọc, mỗi file một trách nhiệm ("một component, một việc").

`App` chỉ **compose** (lắp ghép) các component, không tự viết chi tiết render từng sản phẩm.