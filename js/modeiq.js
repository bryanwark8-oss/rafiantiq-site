/* --------------------------------------------------
   MODE IQ ENGINE
   Evaluates how well the offer fits your strengths
   across different delivery/rideshare modes.
-------------------------------------------------- */

function calculateModeIQ(offer) {
    const mode = offer.mode || "delivery";

    // Placeholder logic — replace with real data later
    const efficiency = randomRange(50, 95);       // How efficient you are in this mode
    const risk = randomRange(5, 30);              // Mode-specific risk
    const consistency = randomRange(40, 95);      // Your consistency in this mode

    const score = normalizeModeScore(efficiency, risk, consistency);

    return {
        mode,
        efficiency,
        risk,
        consistency,
        score
    };
}

/* --------------------------------------------------
   SCORE NORMALIZATION
-------------------------------------------------- */

function normalizeModeScore(efficiency, risk, consistency) {
    let score = 0;

    // Efficiency weight
    if (efficiency > 85) score += 40;
    else if (efficiency > 70) score += 30;
    else if (efficiency > 50) score += 20;
    else score += 10;

    // Risk weight (lower = better)
    if (risk < 10) score += 30;
    else if (risk < 20) score += 20;
    else if (risk < 30) score += 10;
    else score += 5;

    // Consistency weight
    if (consistency > 80) score += 30;
    else if (consistency > 60) score += 20;
    else if (consistency > 40) score += 10;
    else score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
}

/* --------------------------------------------------
   OPTIONAL RENDERING
-------------------------------------------------- */

function renderModeIQ(data) {
    const el = document.getElementById("modeIQ");
    if (!el) return;

    el.textContent = `${data.mode} — Score: ${data.score}`;
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

window.ModeIQ = {
    calculateModeIQ,
    renderModeIQ
};

