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
            com2Player.playSeeTheFutureCard()

            break
        case "favor":
            com2Player.playFavorCard(askCardForFavorForCom2)

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
