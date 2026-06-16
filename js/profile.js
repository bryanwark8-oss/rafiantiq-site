/* --------------------------------------------------
   PROFILE ENGINE
   Tracks driver performance, strengths, and trends
-------------------------------------------------- */

function generateDriverProfile() {
    // Placeholder logic — replace with real data later
    const consistency = randomRange(0.5, 0.95); // 0–1 scale
    const zoneStrengths = generateZoneStrengths();
    const modeStrengths = generateModeStrengths();
    const restaurantStrengths = generateRestaurantStrengths();
    const scoreHistory = generateScoreHistory();

    return {
        consistency,
        zoneStrengths,
        modeStrengths,
        restaurantStrengths,
        scoreHistory
    };
}

/* --------------------------------------------------
   ZONE STRENGTHS
-------------------------------------------------- */

function generateZoneStrengths() {
    const zones = ["Downtown", "Northside", "Southside", "East Market", "West Loop"];
    return zones.map(zone => ({
        zone,
        score: randomRange(50, 95)
    }));
}

/* --------------------------------------------------
   MODE STRENGTHS
-------------------------------------------------- */

function generateModeStrengths() {
    const modes = ["Delivery", "Rideshare", "Grocery", "Packages"];
    return modes.map(mode => ({
        mode,
        score: randomRange(40, 95)
    }));
}

/* --------------------------------------------------
   RESTAURANT STRENGTHS
-------------------------------------------------- */

function generateRestaurantStrengths() {
    const restaurants = ["Chipotle", "McDonald's", "Chick-fil-A", "Taco Bell", "Panera"];
    return restaurants.map(name => ({
        name,
        score: randomRange(40, 95)
    }));
}

/* --------------------------------------------------
   SCORE HISTORY (for chart)
-------------------------------------------------- */

function generateScoreHistory() {
    const history = [];
    for (let i = 0; i < 14; i++) {
        history.push(randomRange(40, 95));
    }
    return history;
}

/* --------------------------------------------------
   RENDER PROFILE PAGE
-------------------------------------------------- */

function renderProfile(profile) {
    renderZoneList(profile.zoneStrengths);
    renderModeList(profile.modeStrengths);
    renderRestaurantList(profile.restaurantStrengths);
    renderScoreChart(profile.scoreHistory);
}

/* --------------------------------------------------
   RENDER ZONE LIST
-------------------------------------------------- */

function renderZoneList(zones) {
    const container = document.getElementById("zoneList");
    if (!container) return;

    container.innerHTML = "";

    zones.forEach(z => {
        const div = document.createElement("div");
        div.textContent = `${z.zone}: ${z.score}`;
        container.appendChild(div);
    });
}

/* --------------------------------------------------
   RENDER MODE LIST
-------------------------------------------------- */

function renderModeList(modes) {
    const container = document.getElementById("modeList");
    if (!container) return;

    container.innerHTML = "";

    modes.forEach(m => {
        const div = document.createElement("div");
        div.textContent = `${m.mode}: ${m.score}`;
        container.appendChild(div);
    });
}

/* --------------------------------------------------
   RENDER RESTAURANT LIST
-------------------------------------------------- */

function renderRestaurantList(restaurants) {
    const container = document.getElementById("restaurantList");
    if (!container) return;

    container.innerHTML = "";

    restaurants.forEach(r => {
        const div = document.createElement("div");
        div.textContent = `${r.name}: ${r.score}`;
        container.appendChild(div);
    });
}

/* --------------------------------------------------
   RENDER SCORE CHART (simple text fallback)
-------------------------------------------------- */

function renderScoreChart(history) {
    const canvas = document.getElementById("scoreChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 200;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ff4d4d";
    ctx.lineWidth = 3;
    ctx.beginPath();

    history.forEach((value, i) => {
        const x = (i / (history.length - 1)) * canvas.width;
        const y = canvas.height - (value / 100) * canvas.height;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

/* --------------------------------------------------
   UTILS
-------------------------------------------------- */

function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/* --------------------------------------------------
   AUTO-INIT ON PROFILE PAGE
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const profile = generateDriverProfile();
    renderProfile(profile);
});

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

window.ProfileEngine = {
    generateDriverProfile,
    renderProfile
};

