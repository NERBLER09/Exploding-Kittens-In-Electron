import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { cards } from "../../messages.js"
import { card } from "../../models/cards.interface.js"
import { choseCardForCom2 } from "../com2Player/playCardCom2.js"
import { choseCard } from "./playCardForCom1.js"

// Stores the cards in com 1's hand
let cardsInCom1Hand: card[] = []

// Draws a card to com 1
const drawCardForCom1 = () => {
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
    // Checks if Com 1 has drawn an Exploding Kitten card

    // Exploding Kitten was not drawn
    if(cardDrawn !== "exploding kitten") {
        // Adds the drawn card to Com 1's hand
        cardsInCom1Hand.push(cardDrawn)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(cardDrawn)

        // When Com 1 draws, checks if Com 1 has additional turns 
        // (If the player has played an attack card or not)

        // Com 1 has no additional turns

        if (turnsNeedToPlay == 0) {
            // Checks if there are 2 selected computer players
            const comAmount = localStorage.getItem("comAmount")

            if (comAmount === "2comPlayer" || comAmount === "3comPlayer") {
                console.log("Passing turn")

                displayMessageBox("Com 1 has drawn a card.", "It's now com 2's turn")

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 1's turn
                        choseCardForCom2()    
                    }
                }, 100);
            }
            else {
                console.log("Passing turn")

                displayMessageBox("Com 1 has drawn card", "It's now your turn")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }
        }

        // Com 1 has additional turns

        else {
            // Removes 1 from turnsNeedToPlay to have Com 1 has 1 less turn
            updateVariable("removeFromTurnsNeedToPlay")

            displayMessageBox("It's com 1's turn.", "It's now com 1's turn again")

            const setCom2Turn = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(setCom2Turn)

                    choseCard()    
                }
            }, 100);
        }
    }

    // Exploding Kitten was drawn

    else {
        // Tells the player that Com 1 has drawn an Exploding Kitten card
        displayMessageBox("An Exploding Kitten card has been drawn","Com 1 has drawn an Exploding Kitten!")

        let com1HasdefuseCard = false

        // Sets a time pause
        setTimeout(() => {
            // Checks if Com 1 has a defuse card   
            for(const card of cardsInCom1Hand) {
                if(card === "defuse") {
                    com1HasdefuseCard = true

                    break   
                }
            }

            // Checks if Com 1 didn't have a defuse card
            if(com1HasdefuseCard === false) {
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                // Tells the player that Com 1 has exploded
                displayMessageBox("Com 1 has exploded!","You won!")
            }
            else {
                // defuses the Exploding Kitten card

                // Removes the defuse card from Com 1's hand 
                const cardIndex = cardsInCom1Hand.indexOf(cardDrawn)

                cardsInCom1Hand.splice(cardIndex, 1)

                setTimeout(() => {
                    // Dose nothing here 
                }, 1000);

                // Checks if there are 2 selected computer players
                const comAmount = localStorage.getItem("comAmount")

                if (comAmount === "2comPlayer" || comAmount === "3comPlayer") {
                    displayMessageBox("Com 1 has defused the Exploding Kitten","It's now com 2's turn")

                    const setCom1Turn = setInterval(() => {
                        // Checks if the player has closed the #message_box
                        if($("#message_box").is(":hidden") ) {
                            clearInterval(setCom1Turn)

                            // Makes it be com 1's turn
                            choseCardForCom2()
                        }
                    }, 100);
                }
                else {
                    displayMessageBox("Com 1 has defused the Exploding Kitten","It's now your turn")

                    // Makes it be the players turn
                    updateVariable("isPlayerTurn", true)
                }
            }
        }, 2000);
    }
}

export { 
    drawCardForCom1,
    cardsInCom1Hand
}