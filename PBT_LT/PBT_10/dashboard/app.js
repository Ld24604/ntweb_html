const refreshButton = document.querySelector("#refresh-button");
const loadTimeLabel = document.querySelector("#load-time");

const widgets = {
    users: {
        status: document.querySelector("#users-status"),
        body: document.querySelector("#users-body")
    },
    country: {
        status: document.querySelector("#country-status"),
        body: document.querySelector("#country-body")
    },
    posts: {
        status: document.querySelector("#posts-status"),
        body: document.querySelector("#posts-body")
    }
};

function setWidgetStatus(widget, type, text) {
    const target = widgets[widget].status;
    target.className = `widget-status ${type}`;
    target.textContent = text;
}

function renderUsers(users) {
    const container = widgets.users.body;
    container.innerHTML = "";
    users.slice(0, 3).forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";
        const title = document.createElement("h3");
        title.textContent = user.name;
        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;
        const location = document.createElement("p");
        location.textContent = `City: ${user.address?.city || "Unknown"}`;
        card.append(title, email, location);
        container.appendChild(card);
    });
}

function renderCountry(country) {
    const container = widgets.country.body;
    container.innerHTML = "";
    const names = document.createElement("div");
    names.className = "country-grid";
    const name = document.createElement("div");
    name.innerHTML = `<strong>Official name:</strong> ${country.name?.official || "-"}`;
    const capital = document.createElement("div");
    capital.innerHTML = `<strong>Capital:</strong> ${country.capital?.[0] || "-"}`;
    const population = document.createElement("div");
    population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
    const region = document.createElement("div");
    region.innerHTML = `<strong>Region:</strong> ${country.region || "-"}`;
    names.append(name, capital, population, region);
    const flag = document.createElement("p");
    flag.textContent = `Flag: ${country.flag || "-"}`;
    container.append(names, flag);
}

function renderPosts(posts) {
    const container = widgets.posts.body;
    container.innerHTML = "";
    posts.slice(0, 4).forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";
        const title = document.createElement("h3");
        title.textContent = post.title;
        const body = document.createElement("p");
        body.textContent = post.body;
        card.append(title, body);
        container.appendChild(card);
    });
}

function showWidgetLoading() {
    setWidgetStatus("users", "loading", "Loading users...");
    setWidgetStatus("country", "loading", "Loading country...");
    setWidgetStatus("posts", "loading", "Loading posts...");
    widgets.users.body.innerHTML = "";
    widgets.country.body.innerHTML = "";
    widgets.posts.body.innerHTML = "";
}

function renderWidgetError(widget, message) {
    setWidgetStatus(widget, "error", "Error");
    const container = widgets[widget].body;
    container.innerHTML = "";
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "#b91c1c";
    errorMessage.textContent = message;
    container.appendChild(errorMessage);
}

async function loadDashboard() {
    showWidgetLoading();
    const startTime = Date.now();

    const results = await Promise.allSettled([
        fetch("https://randomuser.me/api/?results=3").then(r => {
            if (!r.ok) throw new Error("Random user API failed.");
            return r.json();
        }),
        fetch("https://restcountries.com/v3.1/name/vietnam").then(r => {
            if (!r.ok) throw new Error("Country API failed.");
            return r.json();
        }),
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=4").then(r => {
            if (!r.ok) throw new Error("Posts API failed.");
            return r.json();
        })
    ]);

    const usersResult = results[0];
    const countryResult = results[1];
    const postsResult = results[2];

    if (usersResult.status === "fulfilled") {
        setWidgetStatus("users", "success", "Loaded users");
        renderUsers(usersResult.value.results);
    } else {
        renderWidgetError("users", usersResult.reason.message);
    }

    if (countryResult.status === "fulfilled") {
        setWidgetStatus("country", "success", "Loaded country");
        renderCountry(countryResult.value[0]);
    } else {
        renderWidgetError("country", countryResult.reason.message);
    }

    if (postsResult.status === "fulfilled") {
        setWidgetStatus("posts", "success", "Loaded posts");
        renderPosts(postsResult.value);
    } else {
        renderWidgetError("posts", postsResult.reason.message);
    }

    loadTimeLabel.textContent = `Loaded in ${Date.now() - startTime} ms`;
}

refreshButton.addEventListener("click", loadDashboard);
window.addEventListener("DOMContentLoaded", loadDashboard);
