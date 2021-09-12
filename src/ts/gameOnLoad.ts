// Displays the username and that selected com amount
// and draws the card for the player and set the onclick function for the draw pile button
// when that game page loads

import { cards, cardAmounts } from "./messages.js"
import { removeDrawnCardFromDeck, updateVariable } from "./gameFunctions.js";
import { displayCardToPlayer } from "./playerScripts/displayCardToPlayer.js";
import { drawCardForPlayer } from "./playerScripts/drawCardForPlayer.js";
import { displayMessageBox } from "./messageBox.js";
import { com1Player, com2Player, com3Player } from "./comPlayerScripts/comPlayerClass.js";

const electron = require('electron')
const {ipcRenderer} = electron;

let username = localStorage.getItem("username")
let comPlayerAmount = localStorage.getItem("comAmount")

let amountOfPlayers = 0
let amountOfExplodingKittens = 0

// Function runs when the page loads
function onLoadFunc() {
    updateVariable("isPlayerTurn", true)

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
        displayCardToPlayer(card)
    }

    // Deals the defuse card to the player
    displayCardToPlayer("defuse")

    // Removes the defuse card from the 
    removeDrawnCardFromDeck("defuse")

    // Checks how many com players where selected
    switch(comPlayerAmount) {
        case "1comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 1 computer player`)

            // Deals the 7 cards to com 1 
            com1Player.dealInitialHand()

            amountOfPlayers = 2

            break

        case "2comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 2 computer players`)

            // Deals the 7 cards to com 1 + 2 
            com1Player.dealInitialHand()
            com2Player.dealInitialHand()

            amountOfPlayers = 3

            break

        case "3comPlayer":
            $("#comAmount").html(`Selected amount of computer players: 3 computer players`)

            // Deals the cards to every computer player
            com1Player.dealInitialHand()
            com2Player.dealInitialHand()
            com3Player.dealInitialHand()

            amountOfPlayers = 4

            break
    }

    // Adds the Exploding Kittens card into the deck
    amountOfExplodingKittens = amountOfPlayers - 1

    cards.push("exploding kitten")

    cardAmounts["exploding kittens"] = amountOfExplodingKittens

    displayMessageBox("It's your turn", "It is your turn.")
}

// Sets the onload func
$("body").ready(onLoadFunc)

// Sets the onclick function for the draw pile
$("#draw-pile").click(drawCardForPlayer)
