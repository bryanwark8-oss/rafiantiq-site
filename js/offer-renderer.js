/* --------------------------------------------------
   OFFER RENDERER (ANIMATED VERSION)
   Runs ALL engines + animates SmartScore + refreshes
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.includes("offer.html")) return;

    initOfferPage();
});

/* --------------------------------------------------
   MAIN OFFER INIT
-------------------------------------------------- */

function initOfferPage() {
    // Generate a new offer
    const offer = OfferSim.generateFakeOffer();
    OfferSim.renderFakeOffer(offer);

    // Run True Profit
    const trueProfitData = TrueProfitEngine.calculateTrueProfit(offer);
    TrueProfitEngine.renderTrueProfit(trueProfitData);

    // Run Zone IQ
    const zoneData = ZoneIQ.calculateZoneIQ(offer);

    // Run Restaurant IQ
    const restaurantData = RestaurantIQ.calculateRestaurantIQ(offer);

    // Run Mode IQ
    const modeData = ModeIQ.calculateModeIQ(offer);

    // Driver Profile
    const driverProfile = ProfileEngine.generateDriverProfile();

    // SmartScore
    const smartScore = SmartScoreEngine.calculateSmartScore(
        offer,
        trueProfitData,
        zoneData,
        restaurantData,
        modeData,
        driverProfile
    );

    animateSmartScore(smartScore);
    animateRecommendation(smartScore);
}

/* --------------------------------------------------
   SMARTSCORE ANIMATION
-------------------------------------------------- */

function animateSmartScore(finalScore) {
    const el = document.getElementById("smartScore");
    if (!el) return;

    let current = 0;
    const duration = 600; // ms
    const steps = 30;
    const increment = finalScore / steps;
    const interval = duration / steps;

    el.textContent = "0";

    const timer = setInterval(() => {
        current += increment;

        if (current >= finalScore) {
            current = finalScore;
            clearInterval(timer);
        }

        el.textContent = Math.round(current);
    }, interval);
}

/* --------------------------------------------------
   RECOMMENDATION ANIMATION
-------------------------------------------------- */

function animateRecommendation(score) {
    const el = document.getElementById("recommendation");
    if (!el) return;

    let text = "Recommendation: ";

    if (score >= 80) text += "🔥 TAKE IT — High value";
    else if (score >= 60) text += "👍 Good offer";
    else if (score >= 40) text += "🤔 Meh — borderline";
    else text += "❌ Skip — low value";

    el.style.opacity = 0;
    el.textContent = text;

    setTimeout(() => {
        el.style.transition = "opacity 0.4s ease";
        el.style.opacity = 1;
    }, 50);
}
