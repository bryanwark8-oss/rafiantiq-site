/* --------------------------------------------------
   OFFER RENDERER
   Runs ALL engines and updates the Offer page UI
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // Only run on offer.html
    if (!window.location.pathname.includes("offer.html")) return;

    // Generate a fake offer for now
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

    // Generate driver profile
    const driverProfile = ProfileEngine.generateDriverProfile();

    // Calculate SmartScore
    const smartScore = SmartScoreEngine.calculateSmartScore(
        offer,
        trueProfitData,
        zoneData,
        restaurantData,
        modeData,
        driverProfile
    );

    SmartScoreEngine.renderSmartScore(smartScore);

    // Render recommendation
    renderRecommendation(smartScore);
});

/* --------------------------------------------------
   RECOMMENDATION LOGIC
-------------------------------------------------- */

function renderRecommendation(score) {
    const el = document.getElementById("recommendation");
    if (!el) return;

    let text = "Recommendation: ";

    if (score >= 80) text += "🔥 TAKE IT — High value";
    else if (score >= 60) text += "👍 Good offer";
    else if (score >= 40) text += "🤔 Meh — borderline";
    else text += "❌ Skip — low value";

    el.textContent = text;
}

