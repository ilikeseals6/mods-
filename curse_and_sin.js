// Register the elements
elements.curse = {
    color: "#4a006e",
    tool: "Curse",
    behavior: behaviors.POWDER,
    category: "energy",
    desc: "The antithesis of Bless. Corrupts everything it touches.",
    onTick: function(pixel) {
        // Look for neighbors to corrupt
        for (let i = 0; i < adjacentCoords.length; i++) {
            let neighbor = getPixel(pixel.x + adjacentCoords[i][0], pixel.y + adjacentCoords[i][1]);
            if (neighbor) {
                // Logic: If it's plant-based or "good", turn it to Wither
                if (neighbor.element === "plant" || neighbor.element === "grass" || neighbor.element === "bless") {
                    changePixel(neighbor, "wither");
                }
                if (neighbor.element === "water") {
                    changePixel(neighbor, "tainted_water");
                }
            }
        }
    },
};

elements.sin = {
    color: "#240101",
    tool: "Sin",
    behavior: behaviors.GAS,
    category: "gases",
    desc: "A heavy, corrupting vapor that sinks and infects.",
    state: "gas",
    density: 2, // Heavier than air
    reactions: {
        "light": { elem1: "shadow", elem2: "shadow" },
        "holy_water": { elem1: "fire", elem2: "fire" },
    }
};

elements.wither = {
    color: "#2b2b2b",
    behavior: behaviors.POWDER,
    category: "solids",
    tempHigh: 800,
    stateHigh: "ash",
};

elements.tainted_water = {
    color: "#3d043d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 1.5,
    onTick: function(pixel) {
        // Spreads the curse
        if (Math.random() < 0.01) {
            changePixel(pixel, "sin");
        }
    }
};