/* --------------------------------------------------
   TRUE PROFIT ENGINE
   Calculates real earnings after gas + time cost
-------------------------------------------------- */

const GAS_COST_PER_MILE = 0.12;     // Adjust if needed
const TIME_COST_PER_HOUR = 15;      // Your time value ($/hr)

/* --------------------------------------------------
   MAIN TRUE PROFIT CALCULATION
-------------------------------------------------- */

function calculateTrueProfit(offer) {
    const payout = Number(offer.payout || 0);
    const miles = Number(offer.miles || 0);
    const minutes = Number(offer.minutes || 0);

    const gasCost = miles * GAS_COST_PER_MILE;
    const timeCost = (minutes / 60) * TIME_COST_PER_HOUR;

    const trueProfit = payout - gasCost - timeCost;

    const profitPerHour = minutes > 0 ? (trueProfit / (minutes / 60)) : 0;
    const profitPerMile = miles > 0 ? (trueProfit / miles) : 0;

    // Normalize score (0–100)
    const score = normalizeProfitScore(trueProfit, profitPerHour, profitPerMile);

    return {
        payout,
        miles,
        minutes,
        gasCost: gasCost.toFixed(2),
        timeCost: timeCost.toFixed(2),
        trueProfit: trueProfit.toFixed(2),
        profitPerHour: profitPerHour.toFixed(2),
        profitPerMile: profitPerMile.toFixed(2),
        score
    };
}

/* --------------------------------------------------
   NORMALIZATION LOGIC
-------------------------------------------------- */

function normalizeProfitScore(trueProfit, pph, ppm) {
    let score = 0;

    // True profit weight
    if (trueProfit > 10) score += 40;
    else if (trueProfit > 5) score += 30;
    else if (trueProfit > 0) score += 20;
    else score += 5;

    // Profit per hour weight
    if (pph > 30) score += 40;
    else if (pph > 20) score += 30;
    else if (pph > 10) score += 20;
    else score += 5;

    // Profit per mile weight
    if (ppm > 1.50) score += 20;
    else if (ppm > 1.00) score += 15;
    else if (ppm > 0.50) score += 10;
    else score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
}

/* --------------------------------------------------
   RENDER TO OFFER PAGE
-------------------------------------------------- */

function renderTrueProfit(data) {
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    set("trueProfit", `$${data.trueProfit}`);
    set("payout", `$${data.payout}`);
    set("miles", `${data.miles} mi`);
    set("minutes", `${data.minutes} min`);
    set("gasCost", `$${data.gasCost}`);
    set("profitPerHour", `$${data.profitPerHour}/hr`);
    set("profitPerMile", `$${data.profitPerMile}/mi`);
}

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

window.TrueProfitEngine = {
    calculateTrueProfit,
    renderTrueProfit
};
