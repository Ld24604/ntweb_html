# PHIẾU BÀI TẬP 09
# DOM MANIPULATION & EVENTS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — DOM Tree

DOM tree:
```
div#app
  header
    h1
    nav
      a.active
      a
      a
  main
    form#todoForm
      input#todoInput
      button[type="submit"]
    ul#todoList
      li.todo-item
      li.todo-item.completed
```

Query selectors:
- Chọn thẻ `<h1>`: `document.querySelector("h1")`
- Chọn input trong form: `document.querySelector("#todoForm input")`
- Chọn tất cả `.todo-item`: `document.querySelectorAll(".todo-item")`
- Chọn link đang active: `document.querySelector("nav a.active")`
- Chọn `<li>` đầu tiên trong `#todoList`: `document.querySelector("#todoList li")`
- Chọn tất cả `<a>` bên trong `<nav>`: `document.querySelectorAll("nav a")`

### Câu A2 (5đ) — innerHTML vs textContent

- `textContent` lấy hoặc gán chỉ phần văn bản thuần, không parse HTML.
- `innerHTML` lấy hoặc gán nội dung HTML bên trong element, có thể tạo ra element mới từ chuỗi HTML.

Khi dùng `textContent`: hiển thị nội dung người dùng nhập vào, tránh nguy cơ XSS.
Khi dùng `innerHTML`: khi cần render HTML được tin cậy hoặc template tĩnh.

`innerHTML` có thể gây XSS khi chèn trực tiếp giá trị do user nhập vào mà không escape.

Ví dụ nguy hiểm:
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
```
Nếu user nhập `<img src=x onerror="alert('Hacked!')">`, trình duyệt sẽ tạo thẻ `<img>` và thực thi `onerror`.

Sửa an toàn:
```javascript
const userInput = document.querySelector("#search").value;
const result = document.querySelector("#result");
result.textContent = userInput;
```

### Câu A3 (5đ) — Event Bubbling

Khi click vào button:
- `BUTTON`
- `INNER`
- `OUTER`

Nếu uncomment `e.stopPropagation()`, output chỉ là:
- `BUTTON`

Bởi vì `stopPropagation()` chặn event không bong bóng lên phần tử cha.

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 (8đ) — Sửa lỗi

1. `document.querySelector("#decrementBtn").addEventListener("onclick", ...)` sai event name. Phải là `"click"`.
2. `countDisplay = count;` gán sai đối tượng DOM. Phải `countDisplay.textContent = count;`.
3. `historyList.innerHTML = null;` nên dùng `historyList.innerHTML = "";`.
4. Trong clear history, `item.remove;` chỉ tham chiếu hàm. Phải gọi `item.remove();`.
5. Khi load từ localStorage, `count = localStorage.getItem("count");` trả về string hoặc null. Nên chuyển số: `count = Number(localStorage.getItem("count") || 0);`.
6. Khi load history từ localStorage, cần gán lại nội dung `historyList.innerHTML = localStorage.getItem("history") || ""`.
7. Nếu `document.querySelector("#incrementBtn")` trả về null, cần đảm bảo phần tử tồn tại.

Sửa code:
```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");
const clearHistoryBtn = document.querySelector("#clearHistory");

incrementBtn.addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

decrementBtn.addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

resetBtn.addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

clearHistoryBtn.addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count") || 0);
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
});
```

### Câu C2 (7đ) — Performance

1. Bind event lên 1000 elements riêng lẻ là bad practice vì mỗi element tạo một event listener riêng, gây tốn bộ nhớ và chi phí khởi tạo. Event Delegation chỉ cần 1 listener trên phần tử cha, tận dụng event bubbling để xử lý các sự kiện của con.

2. Refactor với `DocumentFragment`:
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```
Vì `DocumentFragment` không phải là phần tử thực sự trên trang, các thay đổi không gây reflow từng lần. Chỉ khi append fragment vào DOM, browser thực hiện reflow một lần, nhanh hơn nhiều.
