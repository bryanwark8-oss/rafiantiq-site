/* --------------------------------------------------
   SMARTSCORE ENGINE
   Calculates a 0–100 score for each offer
-------------------------------------------------- */

function calculateSmartScore(offer, trueProfitData, zoneData, restaurantData, modeData, driverProfile) {

    // Normalize helper (keeps values between 0–100)
    function normalize(value, max = 100, min = 0) {
        if (value === null || value === undefined || isNaN(value)) return 0;
        return Math.max(min, Math.min(max, value));
    }

    // Extract components
    const trueProfitScore = normalize(trueProfitData.score);
    const zoneScore = normalize(zoneData.score);
    const restaurantScore = normalize(restaurantData.score);
    const modeScore = normalize(modeData.score);
    const driverProfileScore = normalize(driverProfile.consistency * 100);

    // Weighted SmartScore formula
    const smartScore =
        (trueProfitScore * 0.40) +
        (zoneScore * 0.20) +
        (restaurantScore * 0.15) +
        (modeScore * 0.15) +
        (driverProfileScore * 0.10);

    return Math.round(smartScore);
}

/* --------------------------------------------------
   RENDER SMARTSCORE TO OFFER PAGE
-------------------------------------------------- */

function renderSmartScore(score) {
    const el = document.getElementById("smartScore");
    if (!el) return;

    el.textContent = score;

    // Color logic
    if (score >= 80) el.style.color = "#28a745";      // green
    else if (score >= 60) el.style.color = "#f1c40f"; // yellow
    else if (score >= 40) el.style.color = "#e67e22"; // orange
    else el.style.color = "#cc3333";                  // red
}

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

window.SmartScoreEngine = {
    calculateSmartScore,
    renderSmartScore
};
