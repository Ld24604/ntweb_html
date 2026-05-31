const galleryGrid = document.querySelector("#gallery-grid");
const loadTrigger = document.querySelector("#load-trigger");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");

let page = 1;
let isLoading = false;
const limit = 20;
const photos = [];

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.removeAttribute("data-src");
        }
        lazyObserver.unobserve(img);
    });
}, {
    rootMargin: "100px"
});

const triggerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading) {
        loadMorePhotos();
    }
}, {
    rootMargin: "150px"
});

async function fetchPhotos() {
    isLoading = true;
    loadTrigger.textContent = "Loading more...";

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to load photos.");
        }
        const data = await response.json();
        photos.push(...data);
        renderPhotos(data);
        page += 1;
    } catch (error) {
        loadTrigger.textContent = error.message;
    } finally {
        isLoading = false;
    }
}

function renderPhotos(items) {
    const fragment = document.createDocumentFragment();
    items.forEach(photo => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.dataset.title = photo.title;

        const img = document.createElement("img");
        img.alt = photo.title;
        img.dataset.src = photo.thumbnailUrl;
        img.loading = "lazy";
        img.addEventListener("click", () => openLightbox(photo));

        lazyObserver.observe(img);
        item.appendChild(img);
        fragment.appendChild(item);
    });
    galleryGrid.appendChild(fragment);
}

function openLightbox(photo) {
    lightboxImage.src = photo.url;
    lightboxCaption.textContent = photo.title;
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
}

function loadMorePhotos() {
    if (isLoading) return;
    fetchPhotos();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
    }
});

triggerObserver.observe(loadTrigger);
fetchPhotos();
