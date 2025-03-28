
// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)// This eccentially turns GAMES_DATA into an array of objects that we can use in our code

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    const gamesContainer = document.getElementById("games-container");
    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        const game = games[i];
        const gameElement = document.createElement("div");
        gameElement.classList.add("game-card");
        gameElement.innerHTML= `
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>${game.pledged}</p>
        <p>${game.goal}</p>
        <p>${game.backers}</p>
        <img src="${game.img}" alt="${game.name}" class="game-img" />`;
        gamesContainer.appendChild(gameElement);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON); // this will add the initial list of games to the DOM
// later, we'll call this function using a different list of games

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const amountRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${amountRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const numberGames = GAMES_JSON.length;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${numberGames}`;


// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    
}

const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
 
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;
// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${amountRaised.toLocaleString()} has been raised for ${fundedGames.length} games. Currently, ${unfundedGames === 1 ? "1 game remains unfunded." : `${unfundedGames} games remain unfunded.`}
                     We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
 const paragraph = document.createElement("p");
 paragraph.textContent = displayStr;
 descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("h2");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);
const secondGameElement = document.createElement("h2");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item