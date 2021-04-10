addLayer("c", {
    name: "Chroma Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Chroma Power", // Name of prestige currency
    baseResource: "chroma", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Chroma Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
      rows: 1,
      cols: 5,
      11: {
        title: "Chroma Generator",
        description: "Generate 1 chroma per second.",
        cost: new Decimal(1)
      },

      12: {
        title: "Chroma Investor",
        description: "Multiplier to chroma gain based on number of purchased upgrades.",
        cost: new Decimal(2),
        unlocked() {return hasUpgrade("c", 11)},

        effect() {
          let numUpgrades = 0;
          if(hasUpgrade("c", 11)){
            numUpgrades++;
          }
          if(hasUpgrade("c", 12)){
            numUpgrades++;
          }
          if(hasUpgrade("c", 13)){
            numUpgrades++;
          }
          if(hasUpgrade("c", 14)){
            numUpgrades++;
          }
          if(hasUpgrade("c", 15)){
            numUpgrades++;
          }

          return Math.sqrt(numUpgrades + 1);

        },

        effectDisplay() {
          return format(tmp.c.upgrades[12].effect + "x");
        }
      },

      13: {
        title: "Chroma Waster",
        description: "Toss some chroma in the garbage.",
        cost: new Decimal(3),
        unlocked() {return hasUpgrade("c", 12)},
      },

      14: {
        title: "Chroma Funder",
        description: "Multiplier to chroma gain based on chroma.",
        cost: new Decimal(4),
        unlocked() {return hasUpgrade("c", 13)},

        effect() {

          return Math.pow(player.points, 0.2) + 1;

        },

        effectDisplay() {
          return format(tmp.c.upgrades[14].effect + "x");
        }
      },

      15: {
        title: "Chroma Synergizer",
        description: "Multiplier to chroma gain based on Chroma Power.",
        cost: new Decimal(5),
        unlocked() {return hasUpgrade("c", 14)},

        effect() {

          return Math.pow(player.c.points, 0.4) + 2;

        },

        effectDisplay() {
          return format(tmp.c.upgrades[15].effect + "x");
        }
      },

    }


})

addLayer("h", {
    name: "Hue Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		    points: new Decimal(0),
        unlockOrder: 0
    }},
    color: "#feffba",
    requires() { // Can be a function that takes requirement increases into account
      if(player.h.unlockOrder === 0){
        return new Decimal(100);
      }
      else if(player.h.unlockOrder === 1){
        return new Decimal(5000);
      }
      else if(player.h.unlockOrder === 2){
        return new Decimal(200000);
      }

      return new Decimal(100);
    },
    resource: "Hue Power", // Name of prestige currency
    baseResource: "Chroma Power", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["c"],
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for Hue Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("c", 15) || player.h.unlocked || player.s.unlocked || player.b.unlocked},
    increaseUnlockOrder: ["s", "b"]
})

addLayer("s", {
    name: "Saturation Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		    points: new Decimal(0),
        unlockOrder: 0
    }},
    color: "#feffba",
    requires() { // Can be a function that takes requirement increases into account
      if(player.s.unlockOrder === 0){
        return new Decimal(100);
      }
      else if(player.s.unlockOrder === 1){
        return new Decimal(5000);
      }
      else if(player.s.unlockOrder === 2){
        return new Decimal(200000);
      }

      return new Decimal(100);
    },
    resource: "Saturation Power", // Name of prestige currency
    baseResource: "Chroma Power", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["c"],
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Saturation Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("c", 15) || player.h.unlocked || player.s.unlocked || player.b.unlocked},
    increaseUnlockOrder: ["h", "b"]
})

addLayer("b", {
    name: "Brightness Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		    points: new Decimal(0),
        unlockOrder: 0
    }},
    color: "#feffba",
    requires() { // Can be a function that takes requirement increases into account
      if(player.b.unlockOrder === 0){
        return new Decimal(100);
      }
      else if(player.b.unlockOrder === 1){
        return new Decimal(5000);
      }
      else if(player.b.unlockOrder === 2){
        return new Decimal(200000);
      }

      return new Decimal(100);
    },
    resource: "Brightness Power", // Name of prestige currency
    baseResource: "Chroma Power", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["c"],
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for Brightness Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("c", 15) || player.h.unlocked || player.s.unlocked || player.b.unlocked},
    increaseUnlockOrder: ["h", "s"]
})
