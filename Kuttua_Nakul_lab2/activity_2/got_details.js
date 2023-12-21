// DOM #main div element
var main = document.getElementById('main');

// **** Your JavaScript code goes here ****
characters = [
    {
    "name": "Bran Stark",
    "status": "Alive",
    "house": "stark",
    "house_affiliations": ["bole", "bolling"],
    "probability_of_survival": 98,
    "current_location": "Fleeing White Walkers"
    },

    {
    "name": "Arya Stark",
    "status": "Alive",
    "house": "stark",
    "house_affiliations": ["branch", "briar"],
    "probability_of_survival": 99,
    "current_location": "Back in Westeros",
    },

    {
    "name": "Sansa Stark",
    "status": "Alive",
    "house": "stark",
    "house_affiliations": ["brook", "broom"],
    "probability_of_survival": 83,
    "current_location": "Winterfell"
    },

    {
    "name": "Robb Stark",
    "status": "Dead - Red Wedding S3E9",
    "house": "stark",
    "house_affiliations": ["burley", "bush"],
    "probability_of_survival": 0,
    "current_location": "-"
    }
]

function halfSurvival(character) {
	return character.probability_of_survival / 2;
}

for (i = 0; i < 4; i++) {
    if (characters[i].name != "Bran Stark") {
        characters[i].probability_of_survival = halfSurvival(characters[i]);
    }
}

function debugCharacter(characterList) {
    for (i = 0; i < 4; i++) {
        console.log(characterList[i].name);
        console.log(characterList[i].probability_of_survival);
    }
}

// document is the DOM, select the #main div
var main = document.getElementById("main");

// Create a new DOM element
var header = document.createElement("h3");
// Append the newly created <h3> element to #main
main.appendChild(header);
// Set the textContent to:
header.textContent = "My Favorite GoT Characters";

// Create a new <div> element	
var div1 = document.createElement("div");
// Append the newly created <div> element to #main
main.appendChild(div1);

for (i = 0; i < 4; i++) {
    // Create a new <h5> element
    var namevar = document.createElement("h5");
    // Append the newly created <h5> element to your new div
    div1.appendChild(namevar);
    // Set the textContent to the first characters name
    namevar.textContent = characters[i]["name"];

    // Create a new <p> element
    var housevar = document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(housevar);
    // Set the textContent to the first characters house.
    housevar.textContent = "House: " + characters[i]["house"];

    /// Create a new <p> element
    var survivalvar = document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(survivalvar);
    // Set the textContent to the first characters survival prob.
    survivalvar.textContent = "Survival %: " + characters[i]["probability_of_survival"] +"%";

    // Create a new <p> element
    var statusvar = document.createElement("p");
    // Append the newly created <p> element to your new div
    div1.appendChild(statusvar);
    // Set the textContent to the first characters status.
    statusvar.textContent = "Status: " + characters[i]["status"];

    

}

// // Create a new <h5> element
// var name1 = document.createElement("h5");
// // Append the newly created <h5> element to your new div
// div1.appendChild(name1);
// // Set the textContent to the first characters name
// name1.textContent = characters[0]["name"];

// // Create a new <p> element
// var survival1= document.createElement("p");
// // Append the newly created <p> element to your new div
// div1.appendChild(survival1);
// // Set the textContent to the first characters survival prob.
// survival1.textContent = "Survival %: " +characters[0]["probability_of_survival"] +"%";