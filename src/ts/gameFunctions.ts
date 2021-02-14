// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { playerCardsInHand, cards, cardAmounts } from "./messages.js"

const $ = require("jquery")

// Contains how many total cards are in the deck
let totalCardAmount = 51

// Stores if it is the player's turn
let isPlayerTurn = true

// Draws a card for the player
const drawCard = () => {
    // Checks if its the players turn
    if(isPlayerTurn === true) {
        // Checks if there are still cards in the deck
        if(totalCardAmount != 0) {
            // Choses a card
            const cardIndex = Math.floor(Math.random() * cards.length)
            const card = cards[cardIndex];

            // Adds the drawn card the the list
            playerCardsInHand.push(card)

            // console.log(`Card drawn is: ${card}. Index ${cardIndex}`)

            // Removes the drawn card from the deck
            removeDrawnCardFromDeck(card)

            // Displays the drawn card
            displayDrawnCard(card)

            // Sets isPlayerTurn to false (Uncomment when done working on card functionality)
            // isPlayerTurn = false 
        }
    }
}

// Deal the cards to the player
const displayDrawnCard = (cardToDisplay:string) => {
    // Displays the card and added an click command
    let card = $(`<button class="player_cards" value="${cardToDisplay}">${cardToDisplay}</button>`)

    // Adds onclick function
    $(card).click({param1: $(card).val()}, playCard)

    // Displays the card 
    $("#player_cards_container").append(card)
}

// Function for when the player plays a card
const playCard = (playerCard) => {
    // Checks if its the player's turn
    if(isPlayerTurn === true) {
        const cardPlayed = playerCard.data.param1

        // Loops through the cards in the player hand
        for(const checkForCardInHand of playerCardsInHand) {
            // Checks if the looped card matches the played card
            if(checkForCardInHand === cardPlayed) {
                let cardIndex = playerCardsInHand.indexOf(cardPlayed)

                // Removes the played card from the playerCardsInHand list
                playerCardsInHand.splice(cardIndex, 1)

                // Hides the played card
                $(".player_cards").get(cardIndex).remove()

                // Checks what card is played
                checkPlayerCardPlayed(checkForCardInHand)

                // Breaks the loop
                break
            } 

            // console.log(checkForCardInHand)
        }   
    }   
}

// Removes the drawn card from the deck
const removeDrawnCardFromDeck = (cardToRemoveFromDeck: string) => {
    cardAmounts[cardToRemoveFromDeck] -= 1
    // console.log(totalCardAmount)
    totalCardAmount -= 1

    // Checks of there are no more remaining cards
    if(cardAmounts[cardToRemoveFromDeck] == 0) {
        // Removes the card from the deck
        cards.splice(cards.indexOf(cardToRemoveFromDeck), 1)
    }

    // Checks if there are no more cards in the deck
    if(totalCardAmount == 0) {
        // Changes the #remaining_card element text
        $("#remaining_card").html("There are no more cards in the deck. Reload the page to restart the page (Window -> Reload or Ctrl+R)")
    }
    else {
        // Displays remaining the cards in the deck
        $("#remaining_card").html(`Remaining Cards: ${totalCardAmount}`)
    }
}

// Checks what card the player played so it can do its respective action
const checkPlayerCardPlayed = (cardPLayed:string) => {
    // TODO: Update card functionality to not only print the played card

    // Checks if the player played a cat card (can't be in the switch statement because of the multiple cards)
    if(cardPLayed == 'potato cat' || cardPLayed == 'taco cat' || cardPLayed == 'rainbow ralphing cat' || 
    cardPLayed == 'beard cat' || cardPLayed == 'cattermellon') {
        console.log(`Player played a cat card (${cardPLayed})`)
    }

    switch(cardPLayed) {
        case "skip":
            console.log("Player played a skip")
            break
        case "attack":
            console.log("Player played a attack")
            break
        case "shuffle":
            console.log("Player played a shuffle") 
            break
        case "see the future":
            console.log("Player played a see the future")
            break
        case "favor":
            console.log("Player played a favor")
            break
        case "shuffle":
            console.log("Player played a shuffle")
            break
        case "favor":
            console.log("Player played a favor")
            break
    }
}

// Exports as module
export {
    displayDrawnCard,
    drawCard,
    playCard,
    removeDrawnCardFromDeck
}