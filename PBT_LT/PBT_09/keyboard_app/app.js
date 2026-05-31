const images = [
    { title: "Sunrise over hills", src: "https://placehold.co/1200x800?text=Sunrise" },
    { title: "City lights at night", src: "https://placehold.co/1200x800?text=City+Lights" },
    { title: "Forest path", src: "https://placehold.co/1200x800?text=Forest+Path" },
    { title: "Mountain lake", src: "https://placehold.co/1200x800?text=Mountain+Lake" },
    { title: "Coastal road", src: "https://placehold.co/1200x800?text=Coastal+Road" },
    { title: "Desert dunes", src: "https://placehold.co/1200x800?text=Desert+Dunes" },
    { title: "Winter cabin", src: "https://placehold.co/1200x800?text=Winter+Cabin" },
    { title: "Flower field", src: "https://placehold.co/1200x800?text=Flower+Field" }
];

const imageFrame = document.querySelector("#image-frame");
const caption = document.querySelector("#caption");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const playBtn = document.querySelector("#play-btn");
const paletteBtn = document.querySelector("#palette-btn");
const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const closeModalBtn = document.querySelector("#close-modal");
const commandOverlay = document.querySelector("#command-overlay");
const commandSearch = document.querySelector("#command-search");
const commandList = document.querySelector("#command-list");

const commands = [
    { label: "Next image", action: "next" },
    { label: "Previous image", action: "previous" },
    { label: "Play / Pause slideshow", action: "toggle" },
    { label: "Open modal", action: "open" },
    { label: "Close modal", action: "close" }
];

let currentIndex = 0;
let slideshowInterval = null;
let slideshowPlaying = false;

function renderImage() {
    imageFrame.innerHTML = "";
    const img = document.createElement("img");
    img.src = images[currentIndex].src;
    img.alt = images[currentIndex].title;
    imageFrame.appendChild(img);
    caption.textContent = `${images[currentIndex].title} (${currentIndex + 1}/${images.length})`;
}

function showModal() {
    imageModal.classList.add("active");
    imageModal.setAttribute("aria-hidden", "false");
    modalImage.src = images[currentIndex].src;
    modalTitle.textContent = images[currentIndex].title;
    closeModalBtn.focus();
}

function hideModal() {
    imageModal.classList.remove("active");
    imageModal.setAttribute("aria-hidden", "true");
}

function updateSlideshowButton() {
    playBtn.textContent = slideshowPlaying ? "Pause" : "Play";
}

function startSlideshow() {
    if (slideshowPlaying) return;
    slideshowPlaying = true;
    updateSlideshowButton();
    slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        renderImage();
    }, 2500);
}

function stopSlideshow() {
    slideshowPlaying = false;
    updateSlideshowButton();
    clearInterval(slideshowInterval);
}

function toggleSlideshow() {
    slideshowPlaying ? stopSlideshow() : startSlideshow();
}

function changeImage(delta) {
    currentIndex = (currentIndex + delta + images.length) % images.length;
    renderImage();
}

function jumpToImage(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    renderImage();
}

function openCommandOverlay() {
    commandOverlay.classList.add("active");
    commandOverlay.setAttribute("aria-hidden", "false");
    renderCommands();
    commandSearch.value = "";
    commandSearch.focus();
}

function closeCommandOverlay() {
    commandOverlay.classList.remove("active");
    commandOverlay.setAttribute("aria-hidden", "true");
}

function renderCommands(filter = "") {
    commandList.innerHTML = "";
    const filtered = commands.filter(cmd => cmd.label.toLowerCase().includes(filter.toLowerCase()));
    filtered.forEach(cmd => {
        const item = document.createElement("li");
        item.textContent = cmd.label;
        item.tabIndex = 0;
        item.className = "command-button";
        item.addEventListener("click", () => {
            runCommand(cmd.action);
            closeCommandOverlay();
        });
        item.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                runCommand(cmd.action);
                closeCommandOverlay();
            }
        });
        commandList.appendChild(item);
    });
}

function runCommand(action) {
    switch (action) {
        case "next":
            changeImage(1);
            break;
        case "previous":
            changeImage(-1);
            break;
        case "toggle":
            toggleSlideshow();
            break;
        case "open":
            showModal();
            break;
        case "close":
            hideModal();
            break;
    }
}

prevBtn.addEventListener("click", () => changeImage(-1));
nextBtn.addEventListener("click", () => changeImage(1));
playBtn.addEventListener("click", toggleSlideshow);
paletteBtn.addEventListener("click", openCommandOverlay);

imageFrame.addEventListener("click", showModal);
imageFrame.addEventListener("keydown", event => {
    if (event.key === "Enter") showModal();
});

closeModalBtn.addEventListener("click", hideModal);
imageModal.addEventListener("click", event => {
    if (event.target === imageModal) hideModal();
});

commandOverlay.addEventListener("click", event => {
    if (event.target === commandOverlay) closeCommandOverlay();
});

commandSearch.addEventListener("input", event => renderCommands(event.target.value));
commandSearch.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCommandOverlay();
    if (event.key === "Enter") {
        const first = commandList.querySelector("li");
        if (first) {
            first.click();
        }
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
        changeImage(1);
    }
    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
    if (event.key === " ") {
        event.preventDefault();
        toggleSlideshow();
    }
    if (event.key === "Escape") {
        hideModal();
        closeCommandOverlay();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandOverlay();
    }
    if (/^[1-9]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        jumpToImage(index);
    }
});

renderImage();
updateSlideshowButton();
