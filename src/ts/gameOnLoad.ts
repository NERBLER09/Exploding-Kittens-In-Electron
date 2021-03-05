// Displays the username and that selected com amount
// and draws the card for the player and set the onclick function for the draw pile button
// when that game page loads

import { playerCardsInHand, cards } from "./messages.js"
import { drawCard, displayDrawnCard, removeDrawnCardFromDeck } from "./gameFunctions.js";
import { dealCardsToCom1 } from "./com1Script.js";
import { dealCardsToCom2 } from "./com2Script.js";
import { dealCardsToCom3 } from "./com3Script.js";

const $ = require("jquery")

let username = localStorage.getItem("username")
let comPlayerAmount = localStorage.getItem("comAmount")

// Function runs when the page loads
function onLoadFunc() {
    // Displays the current player
    $("#current_player_turn").html("It's currently your turn")

    // Displays the username
    $("#username").html(`Username: ${username}`)

    // Displays the selected computer player amount
    if(comPlayerAmount == "1comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 1 computer player`)

        // Deals the cards to computer player 1
        dealCardsToCom1()
    }

    else if(comPlayerAmount == "2comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 2 computer players`)

        // Deals the cards to computer player 1 and 2
        dealCardsToCom1()
        dealCardsToCom2()
    }

    else if(comPlayerAmount == "3comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 3 computer players`)

        // Deals the cards to computer player 1, 2, and 3
        dealCardsToCom1()
        dealCardsToCom2()
        dealCardsToCom3()
    }

    // Deals the 7 cards to the player
    for(let i = 0; i<7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Adds the drawn card the the list
        playerCardsInHand.push(card)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)

        // Displays the drawn card
        displayDrawnCard(card)
    }
}

// Sets the onload func
$("body").ready(onLoadFunc)

// Sets the onclick function for the draw pile
$("#draw-pile").click(drawCard)
