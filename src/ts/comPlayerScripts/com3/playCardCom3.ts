import { checkForPlayableCard } from "../../checkForAnyPlayableCards.js"
import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { checkIfNopeCardPlayed, nopePlayedCard } from "../../nopePlayedCard.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { askCardForFavor } from "../com1/favorAndCatCardFor1.js"
import { catCardPlayedForCom2 } from "../com2/favorAndCatCard.js"
import { cardsInCom3Hand, drawCardForCom3 } from "./drawCardForCom3.js"

const choseCardForCom3 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom3Hand[Math.floor(Math.random() * cardsInCom3Hand.length)]

    // Removes the played card from com 3's hand
    const cardIndex = cardsInCom3Hand.indexOf(cardToPlay)
    cardsInCom3Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    if(checkForPlayableCard(cardsInCom3Hand)) {
        updateDiscardPile(cardToPlay)

        nopePlayedCard(cardToPlay, "Com 3")

        const waitUntilMessageBoxClosed = setInterval(() => {
            // Checks if the player has closed the #message_box
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxClosed)

                if (!checkIfNopeCardPlayed()) {
                    playCardForCom3(cardToPlay)
                }
                else {
                    drawCardForCom3()
                }
            }
        }, 100);
    }
    else {
        drawCardForCom3()
    }
}

// Choses a card to play and plays the card
const playCardForCom3 = (cardToPlay) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {
        // Checks if there's a matching cat card
        catCardPlayedForCom2(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            displayMessageBox("Com 3 has skipped there turn","It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            // Makes the player have 2 turns
            updateVariable("turnsNeedToPlay")

            // Displays that it's now the player's turn and how many turns that they have
            displayMessageBox("Com 3 has played an attack", `It's now you turn, you have ${turnsNeedToPlay} turns`)

            // Makes it be the player's turn
            updateVariable("isPlayerTurn", true)

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            displayMessageBox("The deck has been shuffled","Com 3 has shuffled the deck")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom3()
                }
            }, 100);

            break
        case "see the future":
            displayMessageBox("Com 1 has played a see the future card","Com 1 has seen the top 3 cards of the deck")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom3()
                }
            }, 100);

            break
        case "favor":
            // Choses which player to ask for a favor
            // 1 - The Player
            // 2 - Com 1
            // 3 - Com 2

            let favorCardTarget: number

            // Selects the target
            favorCardTarget = Math.floor(Math.random() * 4)

            // Checks if selected target has a return in switch statement 
            if(favorCardTarget == 1) {
                askCardForFavor(favorCardTarget)
            }
            else {
                // Ask for a card from the player of choice
                const givenCard = askCardForFavor(favorCardTarget)

                // Adds the given card to Com 1's hand
                cardsInCom3Hand.push(givenCard)

                // Draws the card
                drawCardForCom3()
            }

            break

        case "nope":
            // Re-chooses the card to play

            // Readds the played card back into com 3's hand
            cardsInCom3Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
        case "diffuse":
            console.error("No cards to diffuse (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            cardsInCom3Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
            
            break
    }
}
export { choseCardForCom3 }
