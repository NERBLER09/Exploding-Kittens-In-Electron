// Displays the username and that selected com amount
// and draws the card for the player and set the onclick function for the draw pile button
// when that game page loads

import { cards, cardAmounts } from "./messages.js"
import { removeDrawnCardFromDeck, updateVariable } from "./gameFunctions.js";
import { dealCardsToCom1, dealCardsToCom2, dealCardsToCom3 } from "./comPlayerScripts/dealCardToComPlayers.js";
import { displayCardToPlayer } from "./playerScripts/displayCardToPlayer.js";
import { drawCardForPlayer } from "./playerScripts/drawCardForPlayer.js";
import { displayMessageBox } from "./messageBox.js";

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

    // Deals the diffuse card to the player
    displayCardToPlayer("diffuse")

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

    cards.push("exploding kitten")

    cardAmounts["exploding kittens"] = amountOfExplodingKittens

    displayMessageBox("It's your turn", "It is your turn.")
}

const updateGameConfig = () => {
    const messageBoxElement = `
        <h2>What game configurations do you want to change?</h2>
        <p>Username: </p>
        <input type="text" placeholder="New username" id="new-usrnameInput">
        <p>Computer player amount</p>
        <input type="radio" value="1comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">1 Computer Player</label>
        <input type="radio" value="2comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">2 Computer Players</label>
        <input type="radio" value="3comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">3 Computer Players</label>
        <div class="update-game-config-container">
            <button id="update-game-config-button">Update Game Config</button>
            <button id="cancel-update-game-config">Cancel</button>
        </div>
    `

    $("#message_box").append(messageBoxElement)
    $("#cancel-update-game-config").click(() => {
        $("#message_box").html("")
        $("#message_box").hide()
    })
    $("#update-game-config-button").click(handleGameConfigUpdate)
}

const handleGameConfigUpdate = () => {
    const newComAmount:any = $(".update-comSelection[type='radio']:checked").val()
    const newUsername:any = $("#new-usrnameInput").val()

    localStorage.setItem("username", newUsername)
    localStorage.setItem("comAmount", newComAmount)
    localStorage.setItem("isGameDataSaved", "true")

    $("#message_box").html("")

    displayMessageBox("Updated game config", "You have updated you game config. If you want the changes to take affect you'll need to start a new game")
}

ipcRenderer.on("updateGameConfig", () => {
    updateGameConfig()
    $("#message_box").show()
})

// Sets the onload func
$("body").ready(onLoadFunc)

// Sets the onclick function for the draw pile
$("#draw-pile").click(drawCardForPlayer)
