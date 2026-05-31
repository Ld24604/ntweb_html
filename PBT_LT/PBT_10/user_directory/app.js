const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error("Unable to load users.");
        return response.json();
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error("Unable to load user details.");
        return response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Unable to create user.");
        return response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Unable to update user.");
        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Unable to delete user.");
        return response.json();
    }
};

const ui = {
    userList: document.querySelector("#user-list"),
    skeletonGrid: document.querySelector("#loading-skeleton"),
    toast: document.querySelector("#toast"),
    formTitle: document.querySelector("#form-title"),
    nameInput: document.querySelector("#name"),
    emailInput: document.querySelector("#email"),
    phoneInput: document.querySelector("#phone"),
    websiteInput: document.querySelector("#website"),
    submitBtn: document.querySelector("#submit-btn"),
    cancelBtn: document.querySelector("#cancel-edit"),
    searchInput: document.querySelector("#search-input"),

    renderUsers(users) {
        this.userList.innerHTML = "";
        if (users.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "No users found.";
            empty.style.color = "#64748b";
            this.userList.appendChild(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        users.forEach(user => {
            const card = document.createElement("div");
            card.className = "user-card";

            const info = document.createElement("div");
            const title = document.createElement("h3");
            title.textContent = user.name;
            const email = document.createElement("p");
            email.textContent = `Email: ${user.email}`;
            const phone = document.createElement("p");
            phone.textContent = `Phone: ${user.phone || "-"}`;
            const website = document.createElement("p");
            website.textContent = `Website: ${user.website || "-"}`;
            info.append(title, email, phone, website);

            const actions = document.createElement("div");
            actions.className = "user-actions";
            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "edit-btn";
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => loadUserForEdit(user));

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => removeUser(user.id));

            actions.append(editButton, deleteButton);
            card.append(info, actions);
            fragment.appendChild(card);
        });
        this.userList.appendChild(fragment);
    },

    showLoading() {
        this.skeletonGrid.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton-card";
            this.skeletonGrid.appendChild(skeleton);
        }
        this.skeletonGrid.style.display = "grid";
        this.userList.style.display = "none";
    },

    hideLoading() {
        this.skeletonGrid.style.display = "none";
        this.userList.style.display = "grid";
    },

    showError(message) {
        this.showToast(message, true);
    },

    showSuccess(message) {
        this.showToast(message, false);
    },

    showToast(message, isError) {
        this.toast.textContent = message;
        this.toast.style.background = isError ? "#b91c1c" : "#111827";
        this.toast.classList.remove("hidden");
        clearTimeout(this.toast.timeoutId);
        this.toast.timeoutId = setTimeout(() => {
            this.toast.classList.add("hidden");
        }, 3000);
    }
};

const form = document.querySelector("#user-form");
const state = {
    users: [],
    activeUser: null,
    editMode: false
};

async function loadUsers() {
    try {
        ui.showLoading();
        const users = await api.getUsers();
        state.users = users;
        ui.renderUsers(state.users);
    } catch (error) {
        ui.showError(error.message);
    } finally {
        ui.hideLoading();
    }
}

function filterUsers(query) {
    const normalized = query.trim().toLowerCase();
    const filtered = state.users.filter(user =>
        user.name.toLowerCase().includes(normalized) ||
        user.email.toLowerCase().includes(normalized)
    );
    ui.renderUsers(filtered);
}

async function handleCreateUser(data) {
    try {
        const newUser = await api.createUser(data);
        state.users.unshift(newUser);
        ui.renderUsers(state.users);
        ui.showSuccess("User created successfully.");
    } catch (error) {
        ui.showError(error.message);
    }
}

async function handleUpdateUser(id, data) {
    try {
        const updated = await api.updateUser(id, data);
        state.users = state.users.map(user => user.id === id ? updated : user);
        ui.renderUsers(state.users);
        ui.showSuccess("User updated successfully.");
        exitEditMode();
    } catch (error) {
        ui.showError(error.message);
    }
}

async function removeUser(id) {
    if (!confirm("Delete this user?")) return;
    try {
        await api.deleteUser(id);
        state.users = state.users.filter(user => user.id !== id);
        ui.renderUsers(state.users);
        ui.showSuccess("User deleted.");
    } catch (error) {
        ui.showError(error.message);
    }
}

function loadUserForEdit(user) {
    state.activeUser = user;
    state.editMode = true;
    ui.formTitle.textContent = "Edit user";
    ui.submitBtn.textContent = "Update user";
    ui.cancelBtn.classList.remove("hidden");
    ui.nameInput.value = user.name;
    ui.emailInput.value = user.email;
    ui.phoneInput.value = user.phone || "";
    ui.websiteInput.value = user.website ? `https://${user.website}` : "";
}

function exitEditMode() {
    state.activeUser = null;
    state.editMode = false;
    ui.formTitle.textContent = "Create new user";
    ui.submitBtn.textContent = "Create user";
    ui.cancelBtn.classList.add("hidden");
    form.reset();
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const data = {
        name: ui.nameInput.value.trim(),
        email: ui.emailInput.value.trim(),
        phone: ui.phoneInput.value.trim(),
        website: ui.websiteInput.value.trim().replace(/^https?:\/\//, "")
    };

    if (!data.name || !data.email) {
        ui.showError("Name and email are required.");
        return;
    }

    if (state.editMode && state.activeUser) {
        handleUpdateUser(state.activeUser.id, data);
    } else {
        handleCreateUser(data);
    }
    form.reset();
});

ui.cancelBtn.addEventListener("click", () => {
    exitEditMode();
});

ui.searchInput.addEventListener("input", event => {
    filterUsers(event.target.value);
});

window.addEventListener("DOMContentLoaded", loadUsers);
