import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { cards } from "../../messages.js"
import { card } from "../../models/cards.interface.js"
import { choseCardForCom3 } from "../com3Player/playCardCom3.js"
import { choseCardForCom2 } from "./playCardCom2.js"

// Stores the cards in com 2's hand
let cardsInCom2Hand:card[] = []

// Draws a card to com 2
const drawCardForCom2 = () => {
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

    // Checks if Com 2 has drawn an Exploding Kitten

    // Exploding Kitten was not drawn

    if(cardDrawn !== "exploding kitten") {
        // Adds the drawn card the the list
        cardsInCom2Hand.push(cardDrawn)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(cardDrawn)

        // When Com 2 draws, checks if Com 2 has additional turns
        // (If Com 2 has played an attack card or not)

        // Com 2 has no additional turns

        if(turnsNeedToPlay == 0) {
            // Checks if there are 3 com players 
            const comAmount = localStorage.getItem("comAmount")

            // Checks if there are 3 selected computer players
            if(comAmount === "3comPlayer") {
                displayMessageBox("Com 2 has drawn a card.", "It's now com 3's turn")

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForCom3()    
                    }
                }, 100);
            }
            else if(comAmount !== "3comPlayer"){
                displayMessageBox("Com 2 has drawn card", "It's now your turn")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }    
        }

        // Com 2 has additional turns

        else {
            // Removes 2 from turnsNeedToPlay to have Com 2 has 2 less turn
            updateVariable("removeFromTurnsNeedToPlay")

            // Sets a time pause 
            displayMessageBox("It's com 2's turn.", "It's now com 2's turn again")

            const setCom2Turn = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(setCom2Turn)

                    choseCardForCom2()    
                }
            }, 100);
        }
    }

    // Exploding Kitten was drawn

    else {
        // Tells the player that Com 2 has drawn an Exploding Kitten card
        displayMessageBox("An Exploding Kitten card has been drawn","Com 2 has drawn an Exploding Kitten!")

        let com2HasdefuseCard = false

        // Sets a time pause
        setTimeout(() => {
            // Checks if Com 2 has a defuse card   
            for(const card of cardsInCom2Hand) {
                if(card === "defuse") {
                    com2HasdefuseCard = true

                    break   
                }
            }

            // Checks if Com 2 didn't have a defuse card
            if(com2HasdefuseCard === false) {
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                // Tells the player that Com 2 has exploded
                displayMessageBox("Com 2 has exploded!",`You won! Click on "Start new game to start a new game" or "Quit" to quit`)
            }
            else {
                // defuses the Exploding Kitten card

                // Removes the defuse card from Com 2's hand 
                const cardIndex = cardsInCom2Hand.indexOf(cardDrawn)

                cardsInCom2Hand.splice(cardIndex, 1)

                setTimeout(() => {
                    // Dose nothing here 
                }, 1000);

                // Tells the player the Com 2 has defused the Exploding Kitten
                $("#current_player_turn").html("Com 2 has defused the Exploding Kitten")

                // Makes it be Com 3's turn

                // Checks if there are 2 or 3 selected computer players
                const comAmount = localStorage.getItem("comAmount")

                // Checks if there are 3 selected computer players
                if(comAmount === "3comPlayer") {
                    displayMessageBox("Com 2 has defused the Exploding Kitten","It's now com 3's turn")

                    const setCom1Turn = setInterval(() => {
                        // Checks if the player has closed the #message_box
                        if($("#message_box").is(":hidden") ) {
                            clearInterval(setCom1Turn)

                            // Makes it be com 1's turn
                            choseCardForCom3()
                        }
                    }, 100);
                }
                else if(comAmount !== "3comPlayer"){
                    // Sets a time pause
                    setTimeout(() => {
                        $("#current_player_turn").html("It's now your turn")
                    }, 2000);

                    // Makes it be the players turn
                    updateVariable("isPlayerTurn", true)
                }  
            }
        }, 2000);
    }
}

export {
    cardsInCom2Hand,
    drawCardForCom2
}