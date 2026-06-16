/* --------------------------------------------------
   APP CONTROLLER
   Detects which page you're on and initializes
   the correct engines + UI logic.
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("offer.html")) {
        initOfferPage();
    }

    if (path.includes("map.html")) {
        initMapPage();
    }

    if (path.includes("profile.html")) {
        initProfilePage();
    }
});

/* --------------------------------------------------
   OFFER PAGE INIT
-------------------------------------------------- */

function initOfferPage() {
    console.log("Initializing Offer Page...");

    // Generate fake offer
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

    SmartScoreEngine.renderSmartScore(smartScore);

    // Recommendation
    renderRecommendation(smartScore);
}

/* --------------------------------------------------
   MAP PAGE INIT
-------------------------------------------------- */

function initMapPage() {
    console.log("Initializing Map Page...");
    initMap(); // from map-engine.js
}

/* --------------------------------------------------
   PROFILE PAGE INIT
-------------------------------------------------- */

function initProfilePage() {
    console.log("Initializing Profile Page...");

    const profile = ProfileEngine.generateDriverProfile();
    ProfileEngine.renderProfile(profile);
}

