let modInfo = {
	name: "The Chroma Tree",
	id: "theChromaTreeMod",
	author: "Losan33",
	pointsName: "chroma",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players

	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Chromatic Start",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added first layer, added three additional layers, one of which is unlockable (but does nothing yet).<br>
	<h3>v0.0</h3><br>
		- The game came into existence.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]


function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true;
}

// Calculate points/sec!
function getPointGen() {
	if(!hasUpgrade("c", 11)){
		return new Decimal(0);
	}

	let basePointGen = 1;
	if(hasUpgrade("c", 12)){
		basePointGen *= upgradeEffect("c", 12);
	}
	if(hasUpgrade("c", 14)){
		basePointGen *= upgradeEffect("c", 14);
	}
	if(hasUpgrade("c", 15)){
		basePointGen *= upgradeEffect("c", 15);
	}
	// CHANGE THIS BACK TO JUST basePointGen (or * 10 if developing)
	return new Decimal(basePointGen);
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
