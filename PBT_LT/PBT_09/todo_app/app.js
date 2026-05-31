const STORAGE_KEY = "todoApp.todos";
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clear-completed");
const itemCount = document.querySelector("#item-count");

let todos = [];
let currentFilter = "all";
let nextId = 1;

function loadTodos() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            todos = parsed.map(todo => ({
                id: todo.id,
                text: todo.text,
                completed: Boolean(todo.completed)
            }));
            nextId = todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;
        }
    } catch (error) {
        console.warn("Failed to parse todos from localStorage", error);
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }
    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }
    return todos;
}

function updateCount() {
    const leftCount = todos.filter(todo => !todo.completed).length;
    itemCount.textContent = `${leftCount} item${leftCount === 1 ? "" : "s"} left`;
}

function createTodoItem(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "toggle-btn";
    toggleBtn.setAttribute("aria-label", "Toggle todo completed");
    toggleBtn.textContent = todo.completed ? "✅" : "⬜";

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;
    textSpan.tabIndex = 0;
    textSpan.setAttribute("role", "button");
    textSpan.setAttribute("aria-label", `Todo: ${todo.text}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete todo");
    deleteBtn.textContent = "❌";

    li.append(toggleBtn, textSpan, deleteBtn);
    return li;
}

function renderTodos() {
    todoList.innerHTML = "";
    const items = getFilteredTodos();
    if (items.length === 0) {
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.textContent = "No todos here yet. Add your first task!";
        todoList.appendChild(emptyState);
    } else {
        const fragment = document.createDocumentFragment();
        items.forEach(todo => {
            fragment.appendChild(createTodoItem(todo));
        });
        todoList.appendChild(fragment);
    }
    updateCount();
}

function setFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });
    renderTodos();
}

function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    todos.push({ id: nextId++, text: trimmed, completed: false });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function enableEditing(textSpan, todoId) {
    const currentTodo = todos.find(todo => todo.id === todoId);
    if (!currentTodo) return;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = currentTodo.text;
    input.setAttribute("aria-label", "Edit todo");

    const parent = textSpan.parentElement;
    parent.replaceChild(input, textSpan);
    input.focus();
    input.select();

    const saveEdit = () => {
        const value = input.value.trim();
        if (value) {
            todos = todos.map(todo => todo.id === todoId ? { ...todo, text: value } : todo);
            saveTodos();
        }
        renderTodos();
    };

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            saveEdit();
        }
        if (event.key === "Escape") {
            renderTodos();
        }
    });
    input.addEventListener("blur", saveEdit);
}

todoForm.addEventListener("submit", event => {
    event.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

todoList.addEventListener("click", event => {
    const listItem = event.target.closest(".todo-item");
    if (!listItem) return;
    const id = Number(listItem.dataset.id);

    if (event.target.closest(".delete-btn")) {
        deleteTodo(id);
        return;
    }
    if (event.target.closest(".toggle-btn") || event.target.closest(".todo-text")) {
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", event => {
    const textSpan = event.target.closest(".todo-text");
    if (!textSpan) return;
    const listItem = textSpan.closest(".todo-item");
    if (!listItem) return;
    enableEditing(textSpan, Number(listItem.dataset.id));
});

loadTodos();
renderTodos();
