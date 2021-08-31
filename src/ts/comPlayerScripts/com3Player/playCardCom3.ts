import { checkForPlayableCard } from "../../checkForAnyPlayableCards.js"
import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../../nopePlayedCard.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { askCardForFavor } from "../com1Player/favorAndCatCardFor1.js"
import { catCardPlayedForCom2 } from "../com2Player/favorAndCatCard.js"
import { com3Player } from "../comPlayerClass.js"
import { drawCardForCom3 } from "./drawCardForCom3.js"

const choseCardForCom3 = () => {
    // Choses a card to play
    const cardToPlay = com3Player.hand[Math.floor(Math.random() * com3Player.hand.length)]

    // Removes the played card from com 3's hand
    const cardIndex = com3Player.hand.indexOf(cardToPlay)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);
    
    if(checkForPlayableCard(com3Player.hand, cardToPlay)) {
        updateDiscardPile(cardToPlay)

        if(checkForNopeCardInHand()) {
            nopePlayedCard(cardToPlay, "Com 3")

            const waitUntilMessageBoxClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxClosed)

                    if (!checkIfNopeCardPlayed()) {
                        com3Player.hand.splice(cardIndex, 1)
                        playCardForCom3(cardToPlay)
                    }
                    else {
                        com3Player.hand.splice(cardIndex, 1)
                        drawCardForCom3()
                    }
                }
            }, 100);
        }
        else {
            playCardForCom3(cardToPlay)
        }    }
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
            com3Player.playSkipCard(false)

            break
        case "attack":
            // Makes the player have 2 turns
            com3Player.playAttackCard(false)

            break
        case "shuffle":
            com3Player.playShuffleCard()

            break
        case "see the future":
            displayMessageBox("Com 3 has played a see the future card","Com 3 has seen the top 3 cards of the deck")

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
            // 3 - Com 3

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
                com3Player.hand.push(givenCard)

                // Draws the card
                drawCardForCom3()
            }

            break

        case "nope":
            // Re-chooses the card to play

            // Readds the played card back into com 3's hand
            com3Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
        case "defuse":
            console.error("No cards to defuse (Com 3)")

            // Re-chooses card to play

            // Readds the played card back into com 3's hand
            com3Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
            
            break
    }
}
export { choseCardForCom3 }
