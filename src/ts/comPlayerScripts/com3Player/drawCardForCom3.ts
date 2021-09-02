import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox, explodedMessageBox } from "../../messageBox.js"
import { cards } from "../../messages.js"
import { card } from "../../models/cards.interface.js"
import { com3Player } from "../comPlayerClass.js"
import { choseCardForCom3 } from "./playCardCom3.js"

// Draws a card to com 3
const drawCardForCom3 = () => {
    // Choses a card
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

    // Checks if Com 3 has drawn an Exploding Kitten

    // Exploding Kitten was not drawn

    if(cardDrawn !== "exploding kitten") {
        // Adds the drawn card the the list
        com3Player.hand.push(cardDrawn)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(cardDrawn)

        // When Com 3 draws, checks if Com 3 has additional turns
        // (If Com 3 has played an attack card or not)

        // Com 3 has no additional turns

        if(turnsNeedToPlay <= 0) {
            // Sets a time pause
            displayMessageBox("Com 3 has drawn card", "It's now your turn")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)
        }

        // Com 3 has additional turns

        else if(turnsNeedToPlay > 1) {
            // Removes 3 from turnsNeedToPlay to have Com 3 has 3 less turn
            updateVariable("removeFromTurnsNeedToPlay")

            // Sets a time pause 
            setTimeout(() => {
                // Makes it be Com 3's turn again
                choseCardForCom3()   
            }, 2000);
        }
    }

    // Exploding Kitten was drawn

    else {
        // Tells the player that Com 3 has drawn an Exploding Kitten card
        displayMessageBox("An Exploding Kitten card has been drawn","Com 3 has drawn an Exploding Kitten!")

        const waitUntilMessageBoxClosed: NodeJS.Timeout = setInterval(() => {
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxClosed)
                defuseExplodingKittenCard(cardDrawn)
            }
        }, 100)
    }
}   

/** Runs when Com 3 draws a exploding kitten card card */
const defuseExplodingKittenCard = (cardDrawn) => {
    let com3HasDefuseCard = false

    // Checks if Com 3 has a defuse card   
    
    for(const card of com3Player.hand) {
        if(card === "defuse") {
            com3HasDefuseCard = true

            break   
        }
    }

    // Checks if Com 3 didn't have a defuse card
    if(com3HasDefuseCard === false) {
        setTimeout(() => {
            // Dose nothing here
        }, 1000);

        // Tells the player that Com 3 has exploded
        explodedMessageBox("Com 3 has exploded!",`You won! Click on "Start new game" to start a new game or "Quit" to quit`)
    }
    else {
        // defuses the Exploding Kitten card

        // Removes the defuse card from Com 3's hand 
        const cardIndex = com3Player.hand.indexOf(cardDrawn)

        com3Player.hand.splice(cardIndex, 1)

        setTimeout(() => {
            // Dose nothing here 
        }, 1000);

        // Tells the player the Com 3 has defused the Exploding Kitten
        displayMessageBox("Com 3 has defused the Exploding Kitten","It's now your turn")

        // Makes it be the players turn
        updateVariable("isPlayerTurn", true)
    }
}

export { drawCardForCom3 }