const STORAGE_KEY = "weatherApp.history";
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const stateMessage = document.querySelector("#state-message");
const weatherResult = document.querySelector("#weather-result");
const historyList = document.querySelector("#history-list");

let searchHistory = [];

function setStatus(type, text) {
    stateMessage.className = `state-message ${type}`;
    stateMessage.textContent = text;
    stateMessage.classList.remove("hidden");
}

function hideStatus() {
    stateMessage.classList.add("hidden");
}

function showWeather(data) {
    weatherResult.innerHTML = "";
    const top = document.createElement("div");
    top.className = "weather-top";

    const iconUrl = data.weatherIconUrl?.[0]?.value || "";
    const icon = document.createElement("img");
    icon.alt = data.weatherDesc?.[0]?.value || "Weather icon";
    icon.src = iconUrl;

    const info = document.createElement("div");
    info.className = "weather-info";
    const title = document.createElement("h2");
    title.textContent = `${data.areaName || data.nearest_area || "Unknown location"}`;
    const description = document.createElement("p");
    description.textContent = data.weatherDesc?.[0]?.value || "No description";
    info.append(title, description);

    top.append(icon, info);

    const meta = document.createElement("div");
    meta.className = "weather-meta";

    const tempCard = document.createElement("div");
    tempCard.innerHTML = `<span>Temperature</span><strong>${data.temp_C}°C</strong>`;

    const humidityCard = document.createElement("div");
    humidityCard.innerHTML = `<span>Humidity</span><strong>${data.humidity}%</strong>`;

    const feelsCard = document.createElement("div");
    feelsCard.innerHTML = `<span>Feels like</span><strong>${data.FeelsLikeC}°C</strong>`;

    meta.append(tempCard, humidityCard, feelsCard);
    weatherResult.append(top, meta);
    weatherResult.classList.remove("hidden");
}

function renderHistory() {
    historyList.innerHTML = "";
    searchHistory.forEach(city => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = city;
        button.addEventListener("click", () => searchCity(city));
        historyList.appendChild(button);
    });
}

function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
}

function loadHistory() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
            searchHistory = parsed;
        }
    } catch {
        searchHistory = [];
    }
}

function addHistory(city) {
    const normalized = city.trim();
    if (!normalized) return;
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== normalized.toLowerCase());
    searchHistory.unshift(normalized);
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
    saveHistory();
    renderHistory();
}

async function searchCity(cityName) {
    const city = cityName.trim();
    if (!city) return;
    hideStatus();
    weatherResult.classList.add("hidden");
    setStatus("loading", "Loading weather...");

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        const data = await response.json();
        const current = data.current_condition?.[0];
        const area = data.nearest_area?.[0]?.areaName?.[0]?.value || city;
        if (!current) {
            throw new Error("No weather data found.");
        }

        showWeather({
            ...current,
            areaName: area
        });
        setStatus("success", `Weather loaded for ${area}.`);
        addHistory(area);
    } catch (error) {
        setStatus("error", error.message || "Unable to load weather.");
    }
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchCity(cityInput.value);
});

loadHistory();
renderHistory();
