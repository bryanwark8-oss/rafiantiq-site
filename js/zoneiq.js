/* --------------------------------------------------
   ZONE IQ ENGINE
   Evaluates zone profitability, risk, and timing
-------------------------------------------------- */

function calculateZoneIQ(offer) {
    const zoneName = offer.dropoffZone || "Unknown Zone";

    // Placeholder logic — replace with real data later
    const profitability = randomRange(40, 90);
    const risk = randomRange(5, 40);
    const personalPerformance = randomRange(50, 95);

    const score = normalizeZoneScore(profitability, risk, personalPerformance);

    return {
        zoneName,
        profitability,
        risk,
        personalPerformance,
        score
    };
}

/* --------------------------------------------------
   SCORE NORMALIZATION
-------------------------------------------------- */

function normalizeZoneScore(profitability, risk, personalPerformance) {
    let score = 0;

    // Profitability weight
    if (profitability > 80) score += 40;
    else if (profitability > 60) score += 30;
    else if (profitability > 40) score += 20;
    else score += 10;

    // Risk weight (lower = better)
    if (risk < 10) score += 30;
    else if (risk < 20) score += 20;
    else if (risk < 30) score += 10;
    else score += 5;

    // Personal performance weight
    if (personalPerformance > 80) score += 30;
    else if (personalPerformance > 60) score += 20;
    else if (personalPerformance > 40) score += 10;
    else score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
}

/* --------------------------------------------------
   RENDER TO MAP SIDEBAR
-------------------------------------------------- */

function renderZoneSidebar(zoneData) {
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    set("zoneName", zoneData.zoneName);
    set("personalPerformance", `${zoneData.personalPerformance}`);
    set("zoneProfit", `${zoneData.profitability}`);
    set("zoneTimes", "Coming soon");
}

/* --------------------------------------------------
   UTILS
-------------------------------------------------- */

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

window.ZoneIQ = {
    calculateZoneIQ,
    renderZoneSidebar
};

