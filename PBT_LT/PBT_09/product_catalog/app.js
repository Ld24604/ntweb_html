const app = document.querySelector("#app");

const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "Phone", image: "https://placehold.co/400x300?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Galaxy Z Fold 6", price: 31990000, category: "Phone", image: "https://placehold.co/400x300?text=Galaxy+Z+Fold+6", rating: 4.6, inStock: true },
    { id: 3, name: "MacBook Air", price: 29990000, category: "Laptop", image: "https://placehold.co/400x300?text=MacBook+Air", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 15", price: 34990000, category: "Laptop", image: "https://placehold.co/400x300?text=Dell+XPS+15", rating: 4.4, inStock: false },
    { id: 5, name: "Sony WH-1000XM5", price: 7990000, category: "Accessory", image: "https://placehold.co/400x300?text=Sony+WH-1000XM5", rating: 4.7, inStock: true },
    { id: 6, name: "Fitbit Charge 6", price: 3490000, category: "Accessory", image: "https://placehold.co/400x300?text=Fitbit+Charge+6", rating: 4.3, inStock: true },
    { id: 7, name: "iPad Pro", price: 23990000, category: "Tablet", image: "https://placehold.co/400x300?text=iPad+Pro", rating: 4.6, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 21990000, category: "Tablet", image: "https://placehold.co/400x300?text=Galaxy+Tab+S9", rating: 4.4, inStock: true },
    { id: 9, name: "Google Pixel 9", price: 19990000, category: "Phone", image: "https://placehold.co/400x300?text=Pixel+9", rating: 4.5, inStock: true },
    { id: 10, name: "Surface Laptop 6", price: 28990000, category: "Laptop", image: "https://placehold.co/400x300?text=Surface+Laptop+6", rating: 4.3, inStock: true },
    { id: 11, name: "AirPods Pro", price: 5490000, category: "Accessory", image: "https://placehold.co/400x300?text=AirPods+Pro", rating: 4.7, inStock: false },
    { id: 12, name: "Kindle Paperwhite", price: 3490000, category: "Accessory", image: "https://placehold.co/400x300?text=Kindle+Paperwhite", rating: 4.5, inStock: true }
];

const categories = ["All", "Phone", "Laptop", "Tablet", "Accessory"];
const sortOptions = [
    { value: "price-asc", label: "Price low → high" },
    { value: "price-desc", label: "Price high → low" },
    { value: "name-az", label: "Name A-Z" },
    { value: "rating", label: "Top rating" }
];

let currentCategory = "All";
let currentQuery = "";
let currentSort = "price-asc";
let cartCount = 0;
let slideshowActive = false;
let slideshowTimer = null;
const commands = [
    { name: "Next product", action: "next" },
    { name: "Previous product", action: "previous" },
    { name: "Toggle slideshow", action: "toggle" },
    { name: "First product", action: "first" },
    { name: "Last product", action: "last" }
];
let activeProductIndex = 0;

const state = {
    filteredProducts: products.slice()
};

function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

function buildLayout() {
    app.innerHTML = "";

    const header = document.createElement("div");
    header.className = "header-row";

    const titleBlock = document.createElement("div");
    titleBlock.className = "title-block";
    const heading = document.createElement("h1");
    heading.textContent = "Product Catalog";
    titleBlock.appendChild(heading);

    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";

    const searchInput = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.placeholder = "Search products...";
    searchInput.type = "search";
    searchInput.id = "search-input";
    searchInput.autocomplete = "off";

    const sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";
    sortSelect.id = "sort-select";
    sortOptions.forEach(option => {
        const optionEl = document.createElement("option");
        optionEl.value = option.value;
        optionEl.textContent = option.label;
        sortSelect.appendChild(optionEl);
    });

    const buttonsRow = document.createElement("div");
    buttonsRow.className = "buttons-row";

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "button";
        btn.dataset.category = category;
        btn.textContent = category;
        if (category === currentCategory) btn.classList.add("active");
        buttonsRow.appendChild(btn);
    });

    const cartBadge = document.createElement("button");
    cartBadge.type = "button";
    cartBadge.className = "button";
    cartBadge.id = "cart-button";
    cartBadge.innerHTML = `<span class="cart-badge">🛒 Cart <span class="cart-count" id="cart-count">${cartCount}</span></span>`;
    cartBadge.addEventListener("click", () => alert(`You have ${cartCount} item${cartCount === 1 ? "" : "s"} in cart.`));

    const modeToggle = document.createElement("button");
    modeToggle.type = "button";
    modeToggle.className = "mode-toggle";
    modeToggle.id = "mode-toggle";
    modeToggle.textContent = "Toggle dark mode";

    toolbar.append(searchInput, sortSelect, buttonsRow);
    header.append(titleBlock, toolbar, cartBadge, modeToggle);

    const catalog = document.createElement("div");
    catalog.className = "catalog-grid";
    catalog.id = "catalog-grid";

    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modal-backdrop";
    modalBackdrop.setAttribute("aria-hidden", "true");

    const modalCard = document.createElement("div");
    modalCard.className = "modal-card";
    modalCard.innerHTML = `
        <button class="modal-close" type="button" id="modal-close" aria-label="Close product modal">✕</button>
        <div class="modal-grid" id="modal-content"></div>
    `;
    modalBackdrop.appendChild(modalCard);

    app.append(header, catalog, modalBackdrop);
}

function sortProducts(list) {
    return list.slice().sort((a, b) => {
        if (currentSort === "price-asc") return a.price - b.price;
        if (currentSort === "price-desc") return b.price - a.price;
        if (currentSort === "name-az") return a.name.localeCompare(b.name);
        if (currentSort === "rating") return b.rating - a.rating;
        return 0;
    });
}

function filterProducts() {
    let filtered = products.filter(product => {
        const matchesCategory = currentCategory === "All" || product.category === currentCategory;
        const matchesQuery = product.name.toLowerCase().includes(currentQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });
    filtered = sortProducts(filtered);
    state.filteredProducts = filtered;
    renderProducts();
}

function createProductCard(product, index) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.tabIndex = 0;
    card.dataset.id = product.id;
    card.dataset.index = index;

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h2");
    name.className = "product-name";
    name.textContent = product.name;

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.innerHTML = `<span>${product.category}</span><span>${formatCurrency(product.price)}</span>`;

    const rating = document.createElement("div");
    rating.textContent = `⭐ ${product.rating}`;
    rating.className = "product-meta";

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const stockBadge = document.createElement("span");
    stockBadge.textContent = product.inStock ? "In stock" : "Out of stock";
    stockBadge.style.color = product.inStock ? "var(--success)" : "var(--muted)";
    stockBadge.style.fontSize = "0.95rem";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Add to cart";
    addButton.disabled = !product.inStock;
    addButton.addEventListener("click", event => {
        event.stopPropagation();
        if (!product.inStock) return;
        cartCount += 1;
        document.querySelector("#cart-count").textContent = cartCount;
    });

    actions.append(stockBadge, addButton);
    info.append(name, meta, rating);
    card.append(image, info, actions);
    return card;
}

function renderProducts() {
    const catalog = document.querySelector("#catalog-grid");
    catalog.innerHTML = "";
    if (state.filteredProducts.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "No products match your search.";
        empty.style.color = "var(--muted)";
        catalog.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    state.filteredProducts.forEach((product, idx) => {
        fragment.appendChild(createProductCard(product, idx));
    });
    catalog.appendChild(fragment);
}

function showModal(product) {
    const backdrop = document.querySelector("#modal-backdrop");
    const content = document.querySelector("#modal-content");
    content.innerHTML = "";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.style.width = "100%";
    image.style.borderRadius = "18px";

    const title = document.createElement("h2");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = `Category: ${product.category} · Rating: ${product.rating}`;

    const details = document.createElement("p");
    details.textContent = `Price: ${formatCurrency(product.price)} — ${product.inStock ? "Ready to ship" : "Out of stock"}`;

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Add to cart";
    addButton.style.marginTop = "12px";
    addButton.disabled = !product.inStock;
    addButton.addEventListener("click", () => {
        if (!product.inStock) return;
        cartCount += 1;
        document.querySelector("#cart-count").textContent = cartCount;
        alert(`${product.name} added to cart.`);
    });

    content.append(image, title, description, details, addButton);
    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.querySelector("#modal-close").focus();
}

function closeModal() {
    const backdrop = document.querySelector("#modal-backdrop");
    backdrop.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
}

function executeCommand(action) {
    const total = state.filteredProducts.length;
    if (total === 0) return;

    if (action === "next") {
        activeProductIndex = (activeProductIndex + 1) % total;
    }
    if (action === "previous") {
        activeProductIndex = (activeProductIndex - 1 + total) % total;
    }
    if (action === "first") {
        activeProductIndex = 0;
    }
    if (action === "last") {
        activeProductIndex = total - 1;
    }
    if (action === "toggle") {
        toggleSlideshow();
    }
    document.querySelectorAll(".product-card")[activeProductIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function toggleSlideshow() {
    slideshowActive = !slideshowActive;
    const playBtn = document.querySelector("#play-btn");
    if (playBtn) {
        playBtn.textContent = slideshowActive ? "Stop slideshow" : "Play";
    }
    if (slideshowActive) {
        slideshowTimer = setInterval(() => {
            executeCommand("next");
        }, 2500);
    } else {
        clearInterval(slideshowTimer);
    }
}

function openCommandPalette() {
    let palette = document.querySelector("#command-palette");
    if (!palette) {
        palette = document.createElement("div");
        palette.id = "command-palette";
        palette.style.position = "fixed";
        palette.style.inset = "0";
        palette.style.background = "rgba(15, 23, 42, 0.7)";
        palette.style.display = "grid";
        palette.style.placeItems = "center";
        palette.style.zIndex = "30";
        palette.innerHTML = `
            <div style="background: var(--surface); border-radius: 24px; width:min(520px,95vw); padding:24px; box-shadow:0 30px 80px rgba(15,23,42,0.35);">
                <h2 style="margin-top:0;">Command Palette</h2>
                <input id="palette-input" type="text" placeholder="Search commands..." style="width:100%; padding:14px 16px; border-radius:16px; border:1px solid var(--border); font-size:1rem; margin-bottom:18px;" />
                <div id="palette-list" style="display:grid; gap:10px;"></div>
            </div>
        `;
        document.body.appendChild(palette);

        const paletteInput = palette.querySelector("#palette-input");
        const paletteList = palette.querySelector("#palette-list");

        function renderPalette(filter = "") {
            paletteList.innerHTML = "";
            commands
                .filter(cmd => cmd.name.toLowerCase().includes(filter.toLowerCase()))
                .forEach(cmd => {
                    const item = document.createElement("button");
                    item.type = "button";
                    item.style.width = "100%";
                    item.style.textAlign = "left";
                    item.style.padding = "14px 16px";
                    item.style.border = "1px solid var(--border)";
                    item.style.borderRadius = "14px";
                    item.style.background = "transparent";
                    item.style.cursor = "pointer";
                    item.textContent = cmd.name;
                    item.addEventListener("click", () => {
                        executeCommand(cmd.action);
                        closeCommandPalette();
                    });
                    paletteList.appendChild(item);
                });
        }

        paletteInput.addEventListener("input", event => renderPalette(event.target.value));
        palette.addEventListener("click", event => {
            if (event.target === palette) {
                closeCommandPalette();
            }
        });
        paletteInput.addEventListener("keydown", event => {
            if (event.key === "Escape") closeCommandPalette();
            if (event.key === "Enter") {
                const first = paletteList.querySelector("button");
                if (first) first.click();
            }
        });

        renderPalette();
        paletteInput.focus();
    }
}

function closeCommandPalette() {
    const palette = document.querySelector("#command-palette");
    palette?.remove();
}

function attachEvents() {
    const searchInput = document.querySelector("#search-input");
    const sortSelect = document.querySelector("#sort-select");
    const buttons = document.querySelectorAll(".button[data-category]");
    const modeToggle = document.querySelector("#mode-toggle");
    const modalBackdrop = document.querySelector("#modal-backdrop");

    searchInput.addEventListener("input", event => {
        currentQuery = event.target.value;
        filterProducts();
    });

    sortSelect.addEventListener("change", event => {
        currentSort = event.target.value;
        filterProducts();
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentCategory = button.dataset.category;
            filterProducts();
        });
    });

    document.querySelector("#catalog-grid").addEventListener("click", event => {
        const card = event.target.closest(".product-card");
        if (!card) return;
        const id = Number(card.dataset.id);
        const product = products.find(item => item.id === id);
        const index = Number(card.dataset.index);
        activeProductIndex = index;
        if (product) showModal(product);
    });

    modalBackdrop.addEventListener("click", event => {
        if (event.target === modalBackdrop) closeModal();
    });

    document.querySelector("#modal-close").addEventListener("click", closeModal);

    modeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        modeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light mode" : "Dark mode";
    });

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") executeCommand("next");
        if (event.key === "ArrowLeft") executeCommand("previous");
        if (event.key === " ") {
            event.preventDefault();
            toggleSlideshow();
        }
        if (event.key === "Escape") {
            closeModal();
            closeCommandPalette();
        }
        if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            openCommandPalette();
        }
        if (/^[1-9]$/.test(event.key)) {
            const index = Number(event.key) - 1;
            if (index < state.filteredProducts.length) {
                activeProductIndex = index;
                document.querySelectorAll(".product-card")[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
}

function init() {
    buildLayout();
    filterProducts();
    attachEvents();
}

init();
