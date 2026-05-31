# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1

### Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```

### Function Expression

```javascript
const tinhThueBaoHiem2 = function (luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

### Arrow Function

```javascript
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

### Hoisting

Function Declaration có hoisting:

```javascript
console.log(test());

function test() {
    return "OK";
}
```

Chạy bình thường.

Function Expression và Arrow Function không được gọi trước khi khai báo:

```javascript
console.log(test());

const test = () => "OK";
```

Lỗi:

```text
ReferenceError: Cannot access 'test' before initialization
```

---

## Câu A2

### Đoạn 1

```text
1
2
3
2
2
```

Giải thích:

- increment() tăng count lên 1
- decrement() giảm count đi 1
- closure giúp các hàm nhớ biến count

---

### Đoạn 2

Output:

```text
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

Giải thích:

var có function scope nên toàn bộ callback dùng chung biến i.

Sau vòng lặp:

```javascript
i === 3
```

=> in 3,3,3.

let có block scope.

Mỗi lần lặp tạo một biến j mới:

```javascript
j=0
j=1
j=2
```

=> in đúng 0,1,2.

---

## Câu A3

```javascript
const nums = [1,2,3,4,5,6,7,8,9,10];

nums.filter(n => n % 2 === 0);

nums.map(n => n * 3);

nums.reduce((sum,n) => sum + n, 0);

nums.find(n => n > 7);

nums.some(n => n > 10);

nums.every(n => n > 0);

nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

[...nums].reverse();
```

---

## Câu A4

Output:

```javascript
console.log(name, price, ram, color);
```

Kết quả:

```text
iPhone 16 25990000 8 Titan
```

---

```javascript
console.log(specs);
```

Lỗi:

```text
ReferenceError: specs is not defined
```

---

```javascript
console.log(updated.price);
```

```text
23990000
```

---

```javascript
console.log(updated.sale);
```

```text
true
```

---

```javascript
console.log(product.price);
```

```text
25990000
```

Object gốc không đổi.

---

```javascript
console.log(product.specs.ram);
```

```text
16
```

Vì spread chỉ tạo shallow copy.

copy.specs và product.specs cùng trỏ tới một object.

---

# PHẦN C

## Câu C1

```javascript
const processOrders = orders =>
    orders
        .filter(({ status, total }) =>
            status === "completed" && total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

---

## Câu C2

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};

console.log(miniArray.map([1,2,3], x => x * 2));
console.log(miniArray.filter([1,2,3,4], x => x > 2));
console.log(miniArray.reduce([1,2,3,4], (a,b)=>a+b, 0));
```