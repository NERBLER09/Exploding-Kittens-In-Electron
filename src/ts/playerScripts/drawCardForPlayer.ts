import { choseCard } from "../comPlayerScripts/com1Player/playCardForCom1.js"
import { isPlayerTurn, removeDrawnCardFromDeck, seeTheFutureCards, totalCardAmount, turnsNeedToPlay, updateVariable } from "../gameFunctions.js"
import { displayMessageBox } from "../messageBox.js"
import { cards, comPlayerPlayedFavor, playerCardsInHand } from "../messages.js"
import { card } from "../models/cards.interface.js"
import { displayCardToPlayer } from "./displayCardToPlayer.js"

// Draws a card for the player
const drawCardForPlayer = () => {
    // Checks if its the players turn
    // Checks if a com player has not played a favor card (Prevents the game from breaking)
    if(isPlayerTurn === true && comPlayerPlayedFavor["favorCardPlayed"] === false) {
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

                // Removes 1 from the turnsNeedToPlay
                updateVariable("removeFromTurnsNeedToPlay")

                // Checks if the player has any more cars
                updateVariable("isPlayerTurn", turnsNeedToPlay <= 0 ? false : true)

                // Changes the current_player_turn text
                if(isPlayerTurn === false && comPlayerPlayedFavor["favorCardPlayed"] === false && turnsNeedToPlay <= 0) {
                    displayMessageBox("Drawn Card: ", `The card you've drawn is a ${cardDrawn} card. It's now com 1's turn.`)

                    // Resets turnsNeedToPlay to 0 to fix some bugs
                    updateVariable("resetTurnsNeedToPlay")

                    // Sets a time pause 
                    const setCom1Turn = setInterval(() => {
                        // Checks if the player has closed the #message_box
                        if($("#message_box").is(":hidden") ) {
                            console.log("Passing turn")
                            clearInterval(setCom1Turn)

                            // Makes it be com 1's turn
                            choseCard()
                        }
                    }, 100);
                }
                else{
                    displayMessageBox("Drawn Card: ", `The card you've drawn is a ${cardDrawn} card. You have ${turnsNeedToPlay} more turn(s) remaining.`)
                }
            }

            // Exploding Kitten card was drawn

            else if(cardDrawn === "exploding kitten") {
                updateVariable("explodingKittenCardDrawn", true)

                // Checks if the player has a diffuse card in hand
                let playerHasDiffuse = false

                for(const playerCard in playerCardsInHand) {
                    if(playerCardsInHand[playerCard] === "diffuse"){
                        displayMessageBox("Exploding Kitten!","You've drawn an Exploding Kitten card, play your diffuse card to diffuse the Exploding Kitten")

                        playerHasDiffuse = true
                        updateVariable("isPlayerTurn", false)

                        break
                    }
                }

                // Checks if the player has a diffuse card
                if(playerHasDiffuse === false) {
                    // Tells the player that they have exploded 
                    displayMessageBox("You've exploded!", "Go to: Options -> New Game to start a new game")

                    updateVariable("isPlayerTurn", false)

                    // Removes the Exploding Kitten card from the deck
                    removeDrawnCardFromDeck("exploding kitten")
                }
            }
        }  
    }           
}
export { drawCardForPlayer }