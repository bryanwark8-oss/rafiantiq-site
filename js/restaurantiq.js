/* --------------------------------------------------
   RESTAURANT IQ ENGINE
   Evaluates restaurant speed, wait risk, cancel risk,
   and your personal history with that restaurant.
-------------------------------------------------- */

function calculateRestaurantIQ(offer) {
    const restaurant = offer.restaurant || "Unknown Restaurant";

    // Placeholder logic — replace with real data later
    const speed = randomRange(50, 95);          // How fast they prep orders
    const waitRisk = randomRange(5, 40);        // Probability of long wait
    const cancelRisk = randomRange(1, 20);      // Probability of cancellation
    const personalHistory = randomRange(40, 95); // Your past performance

    const score = normalizeRestaurantScore(speed, waitRisk, cancelRisk, personalHistory);

    return {
        restaurant,
        speed,
        waitRisk,
        cancelRisk,
        personalHistory,
        score
    };
}

/* --------------------------------------------------
   SCORE NORMALIZATION
-------------------------------------------------- */

function normalizeRestaurantScore(speed, waitRisk, cancelRisk, personalHistory) {
    let score = 0;

    // Speed weight
    if (speed > 85) score += 35;
    else if (speed > 70) score += 25;
    else if (speed > 50) score += 15;
    else score += 5;

    // Wait risk (lower = better)
    if (waitRisk < 10) score += 25;
    else if (waitRisk < 20) score += 15;
    else if (waitRisk < 30) score += 10;
    else score += 5;

    // Cancel risk (lower = better)
    if (cancelRisk < 5) score += 20;
    else if (cancelRisk < 10) score += 15;
    else if (cancelRisk < 15) score += 10;
    else score += 5;

    // Personal history weight
    if (personalHistory > 80) score += 20;
    else if (personalHistory > 60) score += 15;
    else if (personalHistory > 40) score += 10;
    else score += 5;

    return Math.min(100, Math.max(0, Math.round(score)));
}

/* --------------------------------------------------
   RENDER TO OFFER PAGE (OPTIONAL)
-------------------------------------------------- */

function renderRestaurantIQ(data) {
    const el = document.getElementById("restaurantIQ");
    if (!el) return;

    el.textContent = `${data.restaurant} — Score: ${data.score}`;
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

window.RestaurantIQ = {
    calculateRestaurantIQ,
    renderRestaurantIQ
};

