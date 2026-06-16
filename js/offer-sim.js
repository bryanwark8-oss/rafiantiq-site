/* --------------------------------------------------
   OFFER SIMULATOR
   Generates fake offers for testing the entire app
-------------------------------------------------- */

function generateFakeOffer() {
    const restaurants = ["Chipotle", "McDonald's", "Chick-fil-A", "Taco Bell", "Panera"];
    const zones = ["Downtown", "Northside", "Southside", "East Market", "West Loop"];
    const modes = ["delivery", "grocery", "rideshare", "packages"];

    return {
        payout: randomRange(4, 18),
        miles: randomRange(1, 12),
        minutes: randomRange(8, 45),
        restaurant: restaurants[randomIndex(restaurants)],
        dropoffZone: zones[randomIndex(zones)],
        mode: modes[randomIndex(modes)]
    };
}

/* --------------------------------------------------
   RENDER OFFER TO PAGE
-------------------------------------------------- */

function renderFakeOffer(offer) {
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    set("offerRestaurant", offer.restaurant);
    set("offerPayout", `$${offer.payout}`);
    set("offerMiles", `${offer.miles} mi`);
    set("offerMinutes", `${offer.minutes} min`);
    set("offerZone", offer.dropoffZone);
    set("offerMode", offer.mode);
}

/* --------------------------------------------------
   UTILS
-------------------------------------------------- */

function randomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

/* --------------------------------------------------
   PUBLIC API
-------------------------------------------------- */

window.OfferSim = {
    generateFakeOffer,
    renderFakeOffer
};

