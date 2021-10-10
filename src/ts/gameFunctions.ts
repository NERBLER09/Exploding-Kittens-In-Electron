// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { isGetAccessor } from "../../node_modules/typescript/lib/typescript.js"
import { cards, cardAmounts } from "./messages.js"
import { card } from "./models/cards.interface.js"

// const $ = require("jquery")

// Stores if it is the player's turn
let isPlayerTurn: any

// Stores the amount of cards the player has
let turnsNeedToPlay = 1

// Contains how many total cards are in the deck
let totalCardAmount = 78

// Stores the cards seen in a see the future
let seeTheFutureCards = []

// Stores if a exploding kittens card a drawn
let explodingKittenCardDrawn = false

// Removes the drawn card from the deck
const removeDrawnCardFromDeck = (cardToRemoveFromDeck: card) => {
    cardAmounts[cardToRemoveFromDeck] -= 1
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

type updateVariableType = "isPlayerTurn" | "turnsNeedToPlay" | "seeTheFutureCards" | "removeFromTurnsNeedToPlay" |
"explodingKittenCardDrawn" | "resetTurnsNeedToPlay" | "resetSeeTheFutureCards" | "seeTheFutureCards5"

// Updates a specified variable
const updateVariable = (variableToUpdate: updateVariableType, status?: boolean) => {
    // Enters a switch statement
    switch(variableToUpdate) {
        case "isPlayerTurn":
            // Sets isPlayerTurn to true
            if(status === true) {
                isPlayerTurn = true
            }
            // Sets isPlayerTurn to false
           else {
               isPlayerTurn = false
           }
           
           break
        
        case "turnsNeedToPlay":
            // Adds 2 to the turnsNeedToPlay
            turnsNeedToPlay+=2

            break
        case "seeTheFutureCards":
            // Adds the top 3 cards to the list
            for(let i = 3; i > 0; i--) {
                if(seeTheFutureCards.length === 3) {
                    break
                }
                
                seeTheFutureCards[i] = cards[Math.floor(Math.random() * cards.length)]
            }

            if(!seeTheFutureCards[0]) {
                seeTheFutureCards.splice(0, 1)
            }

            break
        case "seeTheFutureCards5":
            // Adds the top 3 cards to the list
            for(let i = 5; i > 0; i--) {
                if(seeTheFutureCards.length === 5) {
                    break
                }
                
                seeTheFutureCards[i] = cards[Math.floor(Math.random() * cards.length)]
            }

            if(!seeTheFutureCards[0]) {
                seeTheFutureCards.splice(0, 1)
            }
        
            break
        case "removeFromTurnsNeedToPlay":
            turnsNeedToPlay-=1

            break
        case "explodingKittenCardDrawn":
            explodingKittenCardDrawn = status
            break
        case "resetTurnsNeedToPlay":
            turnsNeedToPlay = 0
            break
        case "resetSeeTheFutureCards" :
            seeTheFutureCards = []
            
            break
    }
}

// Exports as module
export {
    removeDrawnCardFromDeck,
    updateVariable,
    turnsNeedToPlay,
    seeTheFutureCards,
    isPlayerTurn,
    explodingKittenCardDrawn,
    totalCardAmount
}
