import { choseCard } from "../comPlayerScripts/com1Player/playCardForCom1.js"
import { explodingKittenCardDrawn, isPlayerTurn, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../gameFunctions.js"
import { displayAlterTheFutureCards5, displayMessageBox, displaySeeTheFutureCards, displaySeeTheFutureCards5, showAlterTheFutureMessageBox } from "../messageBox.js"
import { comPlayerPlayedFavor, playerCardsInHand } from "../messages.js"
import { card } from "../models/cards.interface.js"
import { updateDiscardPile } from "../updateDiscardPile.js"
import { displayCardToPlayer } from "./displayCardToPlayer.js"
import { drawCardForPlayer } from "./drawCardForPlayer.js"
import { catCardPlayed, giveFavorCardToComPlayer, promptFavorTarget } from "./favorAndCatCard.js"
import { promptTargetedAttack } from "./targetedAttack.js"

const playCard = (playerCard) => {
    const cardPlayed = playerCard.data.param1

    // Checks if its the player's turn 
    if(isPlayerTurn === true && !comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]) {
        // Gets the index of the played card from the players hand
        const cardIndex = playerCardsInHand.indexOf(cardPlayed)

        // Removes the played card from the players hand 
        playerCardsInHand.splice(cardIndex, 1)

        // Removes the played card from the player's view
        $(".player_cards").get(cardIndex).remove()

        // Checks what card is played
        checkPlayerCardPlayed(cardPlayed)

        updateDiscardPile(cardPlayed)
    }
    if(comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]){
        // Gets the index of the played card from the players hand
        const cardIndex = playerCardsInHand.indexOf(cardPlayed)
        
        giveFavorCardToComPlayer(cardIndex)
    }

    if(isPlayerTurn === false && explodingKittenCardDrawn === true && cardPlayed === "defuse") {
        const cardIndex = playerCardsInHand.indexOf(cardPlayed)
        
        updateDiscardPile(cardPlayed)
        
        // Removes the played card from the players hand 
        playerCardsInHand.splice(cardIndex, 1)

        // Removes the played card from the player's view
        $(".player_cards").get(cardIndex).remove()

        checkPlayerCardPlayed(cardPlayed)
    }
    else if (isPlayerTurn === false && explodingKittenCardDrawn === true && cardPlayed !== "defuse") {
        displayMessageBox("Not a defuse card", `Sorry, but a ${cardPlayed} card is not a defuse card.`)
    }
}

// Checks what card the player played so it can do its respective action
const checkPlayerCardPlayed = (cardPLayed:card) => {
    // Checks if the player played a cat card (can't be in the switch statement because of the multiple cards)
    if(cardPLayed == 'potato cat' || cardPLayed == 'taco cat' || cardPLayed == 'rainbow ralphing cat' || 
    cardPLayed == 'beard cat' || cardPLayed == 'cattermellon' || cardPLayed === "feral cat") {
        catCardPlayed(cardPLayed)
    }

    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    switch(cardPLayed) {
        case "skip":
            updateVariable("isPlayerTurn", false) // Makes it not be the players turn
            updateVariable("removeFromTurnsNeedToPlay")
            
            if(turnsNeedToPlay <= 1) {
                displayMessageBox("Skipped Turn","You have skipped your turn. It's now com 1's turn")
             
                waitUntilMessageBoxIsClosed = setInterval(() => {
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(waitUntilMessageBoxIsClosed)
                        choseCard()
                    }
                }, 100)
            }
            else if(turnsNeedToPlay > 1) {
                displayMessageBox("Skipped Turn",`You have skipped your turn. But, you have ${turnsNeedToPlay} turn(s) you have remaining. It's now your turn.`)
            }
            break
        case "attack":
            // Displays that it's now com 1's turn and that com 1 has 2 turns
            displayMessageBox("Attacked Com 1", `It it now Com 1's turn, Com 1 has 2 turns.`)

            // Sets a time pause 
            setTimeout(() => {
                // Dose nothing here 
            }, 1000);
            
            // Makes com 1 have 2 turns 
            updateVariable("isPlayerTurn")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                
                    choseCard()
                }
            }, 100);

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            displayMessageBox("Shuffled the deck", "The deck has been shuffled.")
            updateVariable("resetSeeTheFutureCards")
            break
        case "see the future":
            updateVariable("seeTheFutureCards")

            displaySeeTheFutureCards(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2])
            
            break
        case "favor":
            // Asks what com player the player wants a favor from
            promptFavorTarget()

            break
        case "nope":
            displayMessageBox("Nope card","There are no actions to nope")

            // Re-adds the card back to the player's hand
            displayCardToPlayer(cardPLayed)

            break

        case "defuse":
            // Checks if the player has drawn an Exploding Kitten
            if(explodingKittenCardDrawn === true) {
                updateVariable("explodingKittenCardDrawn", false)
                
                // Tells the player that they have defused the Exploding Kitten
                displayMessageBox("Exploding Kitten defused","You have successfully defused the Exploding Kitten card. It's now Com 1's turn")

                updateVariable("resetTurnsNeedToPlay")

                // Sets a time pause
                const setCom1Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom1Turn)

                        // Makes it be com 1's turn
                        choseCard()    
                    }
                }, 100);

                break
            }

            else {
                displayMessageBox("Nothing to defuse", "There is no Exploding Kitten that needs to be defused.")

                displayCardToPlayer(cardPLayed)
            }

            break

        // Cards from the Imploding Kittens expansion pack
        case "draw from the bottom":
            drawCardForPlayer("Draw from the bottom:")    

            break
        
        case "alter the future":
            updateVariable("seeTheFutureCards")
            
            showAlterTheFutureMessageBox(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2])
            
            break
        
        case "targeted attack":
            promptTargetedAttack()

            break

        // Cards from the Streaking Kittens expansion pack
        case "super skip":
            updateVariable("resetTurnsNeedToPlay")

            displayMessageBox("Super skip", "You have skipped all the turns you needed to play. It's Com 1's turn.")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    choseCard()
                }
            }, 100);

            break
            
        case "catomic bomb":
            const comAmount = localStorage.getItem("comAmount")

            if(comAmount === "1comPlayer") {
                seeTheFutureCards[0] = "exploding kitten"
            }
            else if(comAmount === "2comPlayer") {
                seeTheFutureCards[0] = "exploding kitten"
                seeTheFutureCards[1] = "exploding kitten"
            }
            else if(comAmount === "3comPlayer") {
                seeTheFutureCards[0] = "exploding kitten"
                seeTheFutureCards[1] = "exploding kitten"
                seeTheFutureCards[2] = "exploding kitten"
            }

            displayMessageBox("Catomic bomb", "You have moved all the Exploding Kitten cards to the top. It's now Com 1's turn")
            
            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)

                    choseCard()
                }
            }, 100);

            break
        case "see the future x5":
            updateVariable("seeTheFutureCards5")
            
            displaySeeTheFutureCards5(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2], seeTheFutureCards[3], seeTheFutureCards[4])

            break

        case "alter the future x5":
            updateVariable("seeTheFutureCards5")
            
            displayAlterTheFutureCards5(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2], seeTheFutureCards[3], seeTheFutureCards[4])

            break   
        case "swap top and bottom":
            displayMessageBox("Swap top and bottom", "You have swapped the top and bottom cards")
            
            if(seeTheFutureCards[0] !== undefined) {
                seeTheFutureCards.splice(0,1)
            }

            break
        case "streaking kitten":
            displayMessageBox("Streaking kitten","It looks like you can't play a Streaking Kitten")

            // Re-adds the card back to the player's hand
            displayCardToPlayer(cardPLayed)

            break

        case "exploding kitten":
            displayMessageBox("Exploding kitten", "It looks like you can't play an Exploding Kitten")

            // Re-adds the card back to the player's hand
            displayCardToPlayer(cardPLayed)

            break

    }
}
export {
    playCard
}