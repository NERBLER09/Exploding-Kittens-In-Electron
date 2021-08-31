import { checkForPlayableCard } from "../../checkForAnyPlayableCards.js"
import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { card, catCard } from "../../models/cards.interface.js"
import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../../nopePlayedCard.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { askCardForFavor, catCardPlayed } from "../com1Player/favorAndCatCardFor1.js"
import { choseCardForCom3 } from "../com3Player/playCardCom3.js"
import { com2Player } from "../comPlayerClass.js"
import { drawCardForCom2 } from "./drawCardForCom2.js"
import { askCardForFavorForCom2 } from "./favorAndCatCard.js"

const choseCardForCom2 = () => {
    // Choses a card to play
    const cardToPlay = com2Player.hand[Math.floor(Math.random() * com2Player.hand.length)]

    // Removes the played card from com 2's hand
    const cardIndex = com2Player.hand.indexOf(cardToPlay)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    if(checkForPlayableCard(com2Player.hand, cardToPlay)) {
        updateDiscardPile(cardToPlay)

        if(checkForNopeCardInHand()) {
            nopePlayedCard(cardToPlay, "Com 2")

            const waitUntilMessageBoxClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxClosed)

                    if (!checkIfNopeCardPlayed()) {
                        const waitUntilMessageBoxClosed = setInterval(() => {
                            if ($("#message_box").is(":hidden")) {
                                clearInterval(waitUntilMessageBoxClosed)
                                com2Player.hand.splice(cardIndex, 1)
                                playCardForCom2(cardToPlay)
                                return ""
                            }
                        }, 100)
                    }
                    else {
                        com2Player.hand.splice(cardIndex, 1)
                        drawCardForCom2()
                        return ""
                    }
                }
            }, 100);
        }
        else {
            playCardForCom2(cardToPlay)
            return ""
        }
    }
    else {
        drawCardForCom2()
        return ""
    }
}

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon"]

// Choses a card to play and plays the card
const playCardForCom2 = (cardToPlay) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Checks if a cat card was played
    if(catCard.includes(cardToPlay)) {
        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":            
            // Checks if there are 3 com player to pass turn to the right player
            if(localStorage.getItem("comAmount") === "3comPlayer") {
                com2Player.playSkipCard(true, "Com 3", choseCardForCom3) 
            }
            else {
                com2Player.playSkipCard(false)
            }

            break
        case "attack":
            // Checks if there are 2 or more com players (So it doesn't target the player)

            // There are 2 or more com players
            const comAmount = localStorage.getItem("comAmount")

            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "1comPlayer") {
                com2Player.playAttackCard(false)
            }
            // More then 1 com player
            else {
                com2Player.playAttackCard(true, choseCardForCom3)
            }

            break
        case "shuffle":
            com2Player.playShuffleCard()

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

                // Adds the given card to Com 2's hand
                com2Player.hand.push(givenCard)

                // Draws the card
                drawCardForCom2()
                return ""
            }

            break

        case "nope":
            console.error("No cards to nope (Com 2)")

            // Readds the played card back into com 2's hand
            com2Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
        
        case "defuse":
            console.error("No cards to defuse (Com 2)")

            // Re-chooses card to play

            // Readds the played card back into com 2's hand
            com2Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
            
            break
    }
}
export { choseCardForCom2 }
