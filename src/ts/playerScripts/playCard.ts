import { drawCardForCom1 } from "../comPlayerScripts/com1/drawCardForCom1.js"
import { choseCard } from "../comPlayerScripts/com1/playCardForCom1.js"
import { cardsInCom2Hand, drawCardForCom2 } from "../comPlayerScripts/com2/drawCardForCom2.js"
import { cardsInCom3Hand, drawCardForCom3 } from "../comPlayerScripts/com3/drawCardForCom3.js"
import { explodingKittenCardDrawn, isPlayerTurn, seeTheFutureCards, updateVariable } from "../gameFunctions.js"
import { displayMessageBox } from "../messageBox.js"
import { comPlayerPlayedFavor, playerCardsInHand } from "../messages.js"
import { displayCardToPlayer } from "./displayCardToPlayer.js"
import { catCardPlayed, promptFavorTarget } from "./favorAndCatCard.js"

const playCard = (playerCard) => {
    const cardPlayed = playerCard.data.param1

    // Checks if its the player's turn 
    if(isPlayerTurn === true || comPlayerPlayedFavor["favorCardPlayed"] == true) {
        // Gets the index of the played card from the players hand
        const cardIndex = playerCardsInHand.indexOf(cardPlayed)

        // Checks if a com player has played a favor card
        if(comPlayerPlayedFavor["favorCardPlayed"] === false) {
            // Removes the played card from the players hand 
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the played card from the player's view
            $(".player_cards").get(cardIndex).remove()

            // Checks what card is played
            checkPlayerCardPlayed(cardPlayed)
        }
        else {
            // Tells the player which card they game to a com player
            displayMessageBox("Favor Card", `You gave you ${playerCardsInHand[cardIndex]} to ${comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]}`)
        
            // Checks what com player played the favor card
            switch(comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]) {
                case "Com 1":
                    // Adds the given card to Com 1's hand 
                    cardsInCom2Hand.push()

                    // Resets the comPlayerPlayedFavor list 
                    comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
                    comPlayerPlayedFavor["favorCardPlayed"] = null

                    // Removes the given card from the players hand
                    playerCardsInHand.splice(cardIndex, 1)

                    // Removes the given played card from the player's view
                    $(".player_cards").get(cardIndex).remove()

                    // Makes Com 1 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom1()

                    break
                
                case "Com 2":
                    // Adds the given card to Com 2's hand 
                    cardsInCom2Hand.push()

                    // Resets the comPlayerPlayedFavor list 
                    comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
                    comPlayerPlayedFavor["favorCardPlayed"] = null

                    // Removes the given card from the players hand
                    playerCardsInHand.splice(cardIndex, 1)

                    // Removes the given played card from the player's view
                    $(".player_cards").get(cardIndex).remove()

                    // Makes Com 2 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom2()

                    break

                case "Com 3":
                    // Adds the given card to Com 2's hand 
                    cardsInCom3Hand.push()

                    // Resets the comPlayerPlayedFavor list 
                    comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
                    comPlayerPlayedFavor["favorCardPlayed"] = null

                    // Removes the given card from the players hand
                    playerCardsInHand.splice(cardIndex, 1)

                    // Removes the given played card from the player's view
                    $(".player_cards").get(cardIndex).remove()

                    // Makes Com 3 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom3()

                    break                            
            }
        }
    }
}

// Checks what card the player played so it can do its respective action
const checkPlayerCardPlayed = (cardPLayed:string) => {
    // Checks if the player played a cat card (can't be in the switch statement because of the multiple cards)
    if(cardPLayed == 'potato cat' || cardPLayed == 'taco cat' || cardPLayed == 'rainbow ralphing cat' || 
    cardPLayed == 'beard cat' || cardPLayed == 'cattermellon') {
        console.log(`Player played a cat card (${cardPLayed})`)

        catCardPlayed(cardPLayed)
    }

    switch(cardPLayed) {
        case "skip":
            updateVariable("isPlayerTurn", false) // Makes it not be the players turn
            updateVariable("removeFromTurnsNeedToPlay")
            displayMessageBox("Skipped Turn","You have skipped your turn. It's now com 1's turn")

            // Makes it be com 1's turn
            choseCard()

            break
        case "attack":
            console.log("Player played a attack")

            // Displays that it's now com 1's turn and that com 1 has 2 turns
            displayMessageBox("Attacked Com 1", `It it now Com 1's turn, Com 1 has 2 turns.`)

            // Sets a time pause 
            setTimeout(() => {
                // Dose nothing here 
            }, 1000);
            
            // Makes com 1 have 2 turns 
            updateVariable("isPlayerTurn")

            // Makes it be Com 1's turn
            choseCard()

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            console.log("Player played a shuffle") 
            displayMessageBox("Shuffled the deck", "The deck has been shuffled.")
            break
        case "see the future":
            console.log("Player played a see the future")
            // seeTheFutureCards = [cards[Math.floor(Math.random() * cards.length)],
            //     cards[Math.floor(Math.random() * cards.length)], 
            //     cards[Math.floor(Math.random() * cards.length)]]

            updateVariable("seeTheFutureCards")

            displayMessageBox("See the future",`The Current Top 3 Cards: 1. ${seeTheFutureCards[0]},
                2. ${seeTheFutureCards[1]}, 3. ${seeTheFutureCards[2]} `)
            
            break
        case "favor":
            console.log("Player played a favor")

            // Asks what com player the player wants a favor from
            promptFavorTarget()

            break
        case "nope":
            displayMessageBox("Nope card","There are no actions to nope")

            // Re-adds the card back to the player's hand
            displayCardToPlayer(cardPLayed)

            break

        case "diffuse":
            // Checks if the player has drawn an Exploding Kitten
            if(explodingKittenCardDrawn === true) {
                updateVariable("explodingKittenCardDrawn", false)

                // Tells the player that they have diffused the Exploding Kitten
                displayMessageBox("Exploding Kitten Diffused","You have successfully diffused the Exploding Kitten card. It's now Com 1's turn")

                updateVariable("resetTurnsNeedToPlay")

                updateVariable("turnsNeedToPlay", false)

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
                displayMessageBox("Nothing to diffuse", "There is no Exploding Kitten that needs to be diffused.")

                displayCardToPlayer(cardPLayed)
            }

            break
    }
}
export {
    playCard
}