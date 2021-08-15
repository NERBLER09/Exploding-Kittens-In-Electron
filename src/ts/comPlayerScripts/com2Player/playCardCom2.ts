import { checkForPlayableCard } from "../../checkForAnyPlayableCards.js"
import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { card } from "../../models/cards.interface.js"
import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../../nopePlayedCard.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { askCardForFavor, catCardPlayed } from "../com1Player/favorAndCatCardFor1.js"
import { choseCardForCom3 } from "../com3Player/playCardCom3.js"
import { cardsInCom2Hand, drawCardForCom2 } from "./drawCardForCom2.js"
import { askCardForFavorForCom2 } from "./favorAndCatCard.js"

const choseCardForCom2 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom2Hand[Math.floor(Math.random() * cardsInCom2Hand.length)]

    // Removes the played card from com 2's hand
    const cardIndex = cardsInCom2Hand.indexOf(cardToPlay)
    cardsInCom2Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    if(checkForPlayableCard(cardsInCom2Hand, cardToPlay)) {
        updateDiscardPile(cardToPlay)

        if(checkForNopeCardInHand()) {
            nopePlayedCard(cardToPlay, "Com 2")

            const waitUntilMessageBoxClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxClosed)

                    if (!checkIfNopeCardPlayed()) {
                        playCardForCom2(cardToPlay)
                    }
                    else {
                        drawCardForCom2()
                    }
                }
            }, 100);
        }
        else {
            playCardForCom2(cardToPlay)
        }
    }
    else {
        drawCardForCom2()
    }
}

// Choses a card to play and plays the card
const playCardForCom2 = (cardToPlay) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {
        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":            
            if(turnsNeedToPlay === 1) {
                displayMessageBox("Com 1 has skipped 1 of their turns", `Com 1 has ${turnsNeedToPlay} more turn(s) to play. It's now Com 1's turn`)
                choseCardForCom2()
                break
            }
            // Checks if there are 3 com player to pass turn to the right player
            if(localStorage.getItem("comAmount") === "3comPlayer") {
                // Tells the player that Com 1 has played a skip and that it's now Com 2's turn
                displayMessageBox("Com 2 has skipped there turn"," It's now Com 2's turn.")

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 3's turn
                        choseCardForCom3()
                    }
                }, 100);
            }
            else {
                displayMessageBox("Com 2 has skipped there turn","Com 2 has skipped there turn. It's now your turn.")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "attack":
             // Checks if there are 3 com players (So it doesn't target the player)

            // There are 2 or more com players
            const comAmount = localStorage.getItem("comAmount")

            if(comAmount === "3comPlayer") {
                // Makes Com 2 has 2 turns 
                updateVariable("turnsNeedToPlay")

                displayMessageBox("Com 2 has played an attack",`It's now Com 3's turn, Com 3 has ${turnsNeedToPlay} turns`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForCom2()    
                    }
                }, 100);
            }

            // There is only 2 com players

            else {
                // Makes the player have 2 turns
                updateVariable("turnsNeedToPlay")

                // Displays that it's now the player's turn and how many turns that they have
                displayMessageBox("Com 2 has played an attack", `It's now you turn, you have ${turnsNeedToPlay} turns`)
                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "shuffle":
            displayMessageBox("The deck has been shuffled","Com 2 has shuffled the deck")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom2()
                }
            }, 100);

            break
        case "see the future":
            displayMessageBox("Com 2 has played a see the future card","Com 2 has seen the top 3 cards of the deck")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom2()
                }
            }, 100);

            break
        case "favor":
            // Choses which player to ask for a favor
            // 1 - The Player
            // 2 - Com 1
            // 3 - Com 3

            let favorCardTarget: number

            // Check how many com players were selected 
            switch(localStorage.getItem("comAmount")) {
                case "2comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 3)

                    break
                case "3comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 4)

                    break
            }

            // Checks if selected target has a return in switch statement 
            if(favorCardTarget == 1) {
                askCardForFavorForCom2(favorCardTarget)
            }
            else {
                // Ask for a card from the player of choice
                const givenCard: card = askCardForFavorForCom2(favorCardTarget)

                // Adds the given card to Com 1's hand
                cardsInCom2Hand.push(givenCard)

                // Draws the card
                drawCardForCom2()
            }

            break

        case "nope":
            console.error("No cards to nope (Com 2)")

            // Readds the played card back into com 2's hand
            cardsInCom2Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
        
        case "defuse":
            console.error("No cards to defuse (Com 2)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            cardsInCom2Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
            
            break
    }
}
export { choseCardForCom2 }
