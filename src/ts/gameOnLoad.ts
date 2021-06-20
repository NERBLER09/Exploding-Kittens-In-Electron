// Displays the username and that selected com amount
// and draws the card for the player and set the onclick function for the draw pile button
// when that game page loads

import { cards, cardAmounts } from "./messages.js"
import { drawCard, displayDrawnCard, removeDrawnCardFromDeck } from "./gameFunctions.js";
import { dealCardsToCom1 } from "./com1Script.js";
import { dealCardsToCom2 } from "./com2Script.js";
import { dealCardsToCom3 } from "./com3Script.js";

// const $ = require("jquery")

let username = localStorage.getItem("username")
let comPlayerAmount = localStorage.getItem("comAmount")

let amountOfPlayers = 0
let amountOfExplodingKittens = 0

// Function runs when the page loads
function onLoadFunc() {
    // Displays the current player
    $("#current_player_turn").html("It's currently your turn")

    // Displays the username
    $("#username").html(`${username}'s Cards:`)

    // Deals the 7 cards to the player
    for(let i = 0; i<7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)

        // Displays the drawn card
        displayDrawnCard(card)
    }

    // Deals the diffuse card to the player
    displayDrawnCard("diffuse")

    // Removes the diffuse card from the 
    removeDrawnCardFromDeck("diffuse")

    // Checks how many com players where selected
    switch(comPlayerAmount) {
        case "1comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 1 computer player`)

            dealCardsToCom1()

            amountOfPlayers = 2

            break

        case "2comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 2 computer players`)

            dealCardsToCom1()
            dealCardsToCom2()

            amountOfPlayers = 3

            break

        case "3comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 3 computer players`)

            // Deals the cards to every computer player
            dealCardsToCom1()
            dealCardsToCom2()
            dealCardsToCom3()

            amountOfPlayers = 4

            break
    }

    // Adds the Exploding Kittens card into the deck
    amountOfExplodingKittens = amountOfPlayers - 1

    cards.push("Exploding Kitten")

    cardAmounts["Exploding Kittens"] = amountOfExplodingKittens
}

// Sets the onload func
$("body").ready(onLoadFunc)

// Sets the onclick function for the draw pile
$("#draw-pile").click(drawCard)
