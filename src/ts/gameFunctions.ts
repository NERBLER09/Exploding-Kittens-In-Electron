// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { playerCardsInHand, cards, cardAmounts } from "./messages.js"

const $ = require("jquery")

// Contains how many total cards are in the deck
let totalCardAmount = 51

// Draws a card for the player
const drawCard = () => {
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

            // Breaks the loop
            break
        } 

        // console.log(checkForCardInHand)
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

// Exports as module
export {
    displayDrawnCard,
    drawCard,
    playCard,
    removeDrawnCardFromDeck
}
