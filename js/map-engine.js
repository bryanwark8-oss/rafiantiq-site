/* --------------------------------------------------
   MAP ENGINE
   Loads an interactive map + soft zones
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    // Only run on map.html
    if (!window.location.pathname.includes("map.html")) return;

    initMap();
});

/* --------------------------------------------------
   INITIALIZE MAP
-------------------------------------------------- */

function initMap() {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;

    // Create map (Leaflet)
    const map = L.map("map").setView([39.7684, -86.1581], 12); // Indianapolis default

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    // Draw soft zones
    drawZones(map);

    // Handle map clicks
    map.on("click", (e) => {
        const zoneData = ZoneIQ.calculateZoneIQ({
            dropoffZone: "Tapped Zone"
        });

        ZoneIQ.renderZoneSidebar(zoneData);
    });
}

/* --------------------------------------------------
   DRAW SOFT ZONES
-------------------------------------------------- */

function drawZones(map) {
    const zones = [
        {
            name: "Downtown",
            coords: [39.7684, -86.1581],
            color: "#ff4d4d"
        },
        {
            name: "Northside",
            coords: [39.8500, -86.1500],
            color: "#4da6ff"
        },
        {
            name: "Southside",
            coords: [39.7000, -86.1500],
            color: "#4dff88"
        },
        {
            name: "East Market",
            coords: [39.7700, -86.1000],
            color: "#ffd24d"
        },
        {
            name: "West Loop",
            coords: [39.7700, -86.2200],
            color: "#b84dff"
        }
    ];

    zones.forEach(zone => {
        L.circle(zone.coords, {
            radius: 1500,
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: 0.25
        })
        .addTo(map)
        .bindPopup(`<b>${zone.name}</b>`);
    });
}

