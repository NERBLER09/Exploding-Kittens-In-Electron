import { choseCard } from "../comPlayerScripts/com1Player/playCardForCom1.js"
import { isPlayerTurn, removeDrawnCardFromDeck, seeTheFutureCards, totalCardAmount, turnsNeedToPlay, updateVariable } from "../gameFunctions.js"
import { checkIfMessagesBoxIsShowing } from "../gameLoop.js"
import { displayMessageBox, explodedMessageBox } from "../messageBox.js"
import { cards, comPlayerPlayedFavor, playerCardsInHand } from "../messages.js"
import { card } from "../models/cards.interface.js"
import { displayCardToPlayer } from "./displayCardToPlayer.js"

// Draws a card for the player
const drawCardForPlayer = (cardCardMessageBoxHeader: string) => {
    // Checks if its the players turn
    // Checks if a com player has not played a favor card (Prevents the game from breaking)
    if(isPlayerTurn === true && comPlayerPlayedFavor["favorCardPlayed"] !== true) {
        // Checks if there are still cards in the deck
        if(totalCardAmount > 1) {
            let cardDrawn: card

            // Checks a see the future card was drawn, if so gets the top card
            if(seeTheFutureCards.length !== 0) {
                // Gets the top card
                cardDrawn = seeTheFutureCards[0]

                // Removes the top card from the list
                seeTheFutureCards.splice(0, 1)
            } else {
                // Choses a card
                const cardIndex = Math.floor(Math.random() * cards.length)
                cardDrawn = cards[cardIndex];
            }

            // Checks if an Exploding Kittens card was drawn
            
            // Exploding Kitten card was not drawn
            if(cardDrawn !== "exploding kitten") {
                // Removes the drawn cardDrawn from the deck
                removeDrawnCardFromDeck(cardDrawn)

                // Displays the drawn cardDrawn
                displayCardToPlayer(cardDrawn)

                // Removes 1 from the turnsNeedToPlay if turnsNeedToPlay is not 0
                if(turnsNeedToPlay > 0) {
                    updateVariable("removeFromTurnsNeedToPlay")
                }

                // Checks if the player has any more cars
                updateVariable("isPlayerTurn", turnsNeedToPlay <= 0 ? false : true)

                // Changes the current_player_turn text
                if(isPlayerTurn === false && comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] === null && turnsNeedToPlay <= 0) {
                    displayMessageBox(`${cardCardMessageBoxHeader}`, `The card you've drawn is a ${cardDrawn} card. It's now com 1's turn.`)

                    // Resets turnsNeedToPlay to 0 to fix some bugs
                    updateVariable("resetTurnsNeedToPlay")

                    checkIfMessagesBoxIsShowing(choseCard)
                }
                else{
                    displayMessageBox(`${cardCardMessageBoxHeader}`, `The card you've drawn is a ${cardDrawn} card. You have ${turnsNeedToPlay} more turn(s) remaining.`)
                }
            }

            // Exploding Kitten card was drawn

            else if(cardDrawn === "exploding kitten") {
                explodingKittenDraw()
            }
        }  
    }
    else if(comPlayerPlayedFavor["favorCardPlayed"]) {
        displayMessageBox("Can I have a favor?", `It looks like you need to gave a favor card to ${comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]}`)
    }      
}

/** Runs when the player draws an exploding kitten card*/
const explodingKittenDraw = () => {
    updateVariable("explodingKittenCardDrawn", true)

    // Checks if the player has a defuse card in hand
    let playerHasDefuse = false

    for(const playerCard in playerCardsInHand) {
        if(playerCardsInHand[playerCard] === "streaking kitten" && !checkForExplodingKittenInHand()) {
            playerHasDefuse = true
            updateVariable("explodingKittenCardDrawn", false)

            // Removes the drawn "exploding kitten" from the deck
            removeDrawnCardFromDeck("exploding kitten")

            // Displays the drawn "exploding kitten"
            displayCardToPlayer("exploding kitten")

            // Removes 1 from the turnsNeedToPlay if turnsNeedToPlay is not 0
            if(turnsNeedToPlay > 0) {
                updateVariable("removeFromTurnsNeedToPlay")
            }

            // Checks if the player has any more cars
            updateVariable("isPlayerTurn", turnsNeedToPlay <= 0 ? false : true)

            // Changes the current_player_turn text
            if(isPlayerTurn === false && comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] === null && turnsNeedToPlay <= 0) {
                displayMessageBox("Streaking Kitten", "The Exploding Kitten you've draw has been added to your hand because you had a Streaking Kitten card in your hand.")

                // Resets turnsNeedToPlay to 0 to fix some bugs
                updateVariable("resetTurnsNeedToPlay")

                checkIfMessagesBoxIsShowing(choseCard)
            }
            else{
                displayMessageBox("Streaking Kitten", `The Exploding Kitten you've draw has been added to your hand because you had a Streaking Kitten card in your hand. You have ${turnsNeedToPlay} turn(s) remaining.`)
            }

            break
        }
        if(playerCardsInHand[playerCard] === "defuse" && !playerHasDefuse){
            displayMessageBox("Exploding Kitten!","You've drawn an Exploding Kitten card, play your defuse card to defuse the Exploding Kitten")

            playerHasDefuse = true
            updateVariable("isPlayerTurn", false)

            break
        }
    }

    // Checks if the player has a defuse card
    if(playerHasDefuse === false) {
        // Tells the player that they have exploded 
        explodedMessageBox("You've exploded!",  `Click on "Start new game" to start a new game or "Quit" to quit`)

        updateVariable("isPlayerTurn", false)

        // Removes the Exploding Kitten card from the deck
        removeDrawnCardFromDeck("exploding kitten")
    }
}

/** Checks if there is an Exploding Kitten in the players hand 
 * 
 * @returns {boolean} Returns if there is an Exploding Kitten card in the player's hand
*/
const checkForExplodingKittenInHand = () => {
   for(const card of playerCardsInHand) {
       if(card === "exploding kitten") {
           return true
       }
   }
   return false 
}

export { drawCardForPlayer }