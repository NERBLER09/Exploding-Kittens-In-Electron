import { checkForPlayableCard } from "../../checkForAnyPlayableCards.js"
import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { card } from "../../models/cards.interface.js"
import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../../nopePlayedCard.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { choseCardForCom2 } from "../com2Player/playCardCom2.js"
import { com1Player } from "../comPlayerClass.js"
import { drawCardForCom1 } from "./drawCardForCom1.js"
import { askCardForFavor, catCardPlayed } from "./favorAndCatCardFor1.js"

const choseCardForCom1 = () => {
    // Choses a card to play from com 1's hand
    const cardToPlay: card = com1Player.hand[Math.floor(Math.random() * com1Player.hand.length)]
    // Removes the played card from com 1's hand
    const cardIndex = com1Player.hand.indexOf(cardToPlay)
    
    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 1000);

    if (checkForPlayableCard(com1Player.hand, cardToPlay) == true) {
        updateDiscardPile(cardToPlay)

        if(checkForNopeCardInHand()) {
            nopePlayedCard(cardToPlay, "Com 1")

            const waitUntilMessageBoxClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxClosed)

                    if (!checkIfNopeCardPlayed()) {
                        const waitUntilMessageBoxClosed = setInterval(() => {
                            if ($("#message_box").is(":hidden")) {
                                clearInterval(waitUntilMessageBoxClosed)
                                com1Player.hand.splice(cardIndex, 1)
                                playCard(cardToPlay)
                                return ""
                            }
                        }, 100)
                    }
                    else {
                        com1Player.hand.splice(cardIndex, 1)
                        drawCardForCom1()
                        return ""
                    }
                }
            }, 100);
        }
        else {
            playCard(cardToPlay)

            return ""
        }
    }
    else {
        drawCardForCom1()
        return ""
    }
}

// Choses a card to play and plays the card
const playCard = (cardToPlay) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Checks if a cat card was played
    if (cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' ||
        cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {

        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch (cardToPlay) {
        case "skip":
            if(turnsNeedToPlay === 1) {
                displayMessageBox("Com 1 has skipped 1 of their turns", `Com 1 has ${turnsNeedToPlay} more turn(s) to play. It's now Com 1's turn`)
                choseCardForCom1()
                break
            }

            // Checks if there are more then 1 com player to pass turn to the right player
            if (localStorage.getItem("comAmount") === "1comPlayer") {
                com1Player.playSkipCard(false)
            }
            else {
                com1Player.playSkipCard(true, "Com 2", choseCardForCom2) 
            }

            break
        case "attack":
            // Checks if there are 2 or more com players (So it doesn't target the player)

            // There are 2 or more com players
            const comAmount = localStorage.getItem("comAmount")

            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "1comPlayer") {
                com1Player.playAttackCard(false)
            }

            // More then 1 com player
            else {
                com1Player.playAttackCard(true, choseCardForCom2)
            }

            break
        case "shuffle":
            com1Player.playShuffleCard()    

            break
        case "see the future":
            displayMessageBox("Com 1 has played a see the future card", "Com 1 has seen the top 3 cards of the deck")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom1()
                }
            }, 100);

            break
        case "favor":
            // Choses which player to ask for a favor
            // 1 - The Player
            // 2 - Com 2
            // 3 - Com 3

            let favorCardTarget: number

            // Check how many com players were selected 
            switch (localStorage.getItem("comAmount")) {
                case "1comPlayer":
                    favorCardTarget = 1

                    break
                case "2comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 3)

                    break
                case "3comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 4)

                    break
            }

            // Checks if selected target has a return in switch statement 
            if (favorCardTarget == 1) {
                askCardForFavor(favorCardTarget)
            }
            else {
                // Ask for a card from the player of choice
                const givenCard: card = askCardForFavor(favorCardTarget)

                // Adds the given card to Com 1's hand
                com1Player.hand.push(givenCard)

                // Draws the card
                drawCardForCom1()
                return ""
            }

            break

        case "nope":
            console.error("No cards to nope (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            com1Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom1()

            break

        case "defuse":
            console.error("No cards to defuse (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            com1Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom1()

            break
    }
}

export { choseCardForCom1 as choseCard }