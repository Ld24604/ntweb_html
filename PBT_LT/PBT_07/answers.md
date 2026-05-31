# PBT07 - Answers

## A1. var / let / const

### Đoạn 1

```javascript
console.log(x);
var x = 5;
```

Kết quả:

```javascript
undefined
```

Giải thích:

- var được hoisting
- biến được tạo trước nhưng giá trị là undefined

---

### Đoạn 2

```javascript
console.log(y);
let y = 10;
```

Kết quả:

```javascript
ReferenceError
```

Giải thích:

- let nằm trong TDZ (Temporal Dead Zone)

---

### Đoạn 3

```javascript
const z = 15;
z = 20;
```

Kết quả:

```javascript
TypeError
```

Giải thích:

- const không thể gán lại

---

### Đoạn 4

```javascript
const arr = [1,2,3];
arr.push(4);
console.log(arr);
```

Kết quả:

```javascript
[1,2,3,4]
```

Giải thích:

- const không đổi tham chiếu
- nội dung object/array vẫn sửa được

---

### Đoạn 5

```javascript
let a = 1;

{
   let a = 2;
   console.log(a);
}

console.log(a);
```

Kết quả:

```javascript
2
1
```

Giải thích:

- let có block scope

---

## A2. Data Types & Coercion

```javascript
typeof null          // object
typeof undefined     // undefined
typeof NaN           // number
"5" + 3              // "53"
"5" - 3              // 2
"5" * "3"            // 15
true + true          // 2
[] + []              // ""
[] + {}              // "[object Object]"
{} + []              // 0
```

Giải thích:

- toán tử + ưu tiên nối chuỗi
- toán tử -, *, / ép kiểu sang number

---

## A3. == vs ===

```javascript
5 == "5"             // true
5 === "5"            // false
null == undefined    // true
null === undefined   // false
NaN == NaN           // false
0 == false           // true
0 === false          // false
"" == false          // true
```

Nên dùng:

```javascript
===
```

vì không ép kiểu ngầm.

---

## A4. Truthy & Falsy

Falsy:

```javascript
false
0
-0
0n
""
null
undefined
NaN
```

Kết quả:

```javascript
A
C
D
G
H
```

Không in:

```javascript
B
E
F
```

---

## A5. Template Literals

### Cách 1

```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

### Cách 2

```javascript
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

### Cách 3

```javascript
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

# C1. Debug

Lỗi:

1. Không kiểm tra kiểu dữ liệu
2. Thiếu ;
3. if(giaSauGiam = 0) dùng phép gán
4. Phải dùng ===
5. "100000" là string
6. var trong vòng lặp

Sửa:

```javascript
if (giaSauGiam === 0)
```

và

```javascript
for (let i = 0; i < 5; i++)
```

để mỗi callback giữ đúng giá trị i.