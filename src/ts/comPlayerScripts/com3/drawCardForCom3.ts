import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { cards } from "../../messages.js"
import { choseCardForCom3 } from "./playCardCom3.js"

// Stores the cards in com 3's hand
let cardsInCom3Hand:string[] = []

// Draws a card to com 3
const drawCardForCom3 = () => {
    // Choses a card
    let cardDrawn: string

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

    if(cardDrawn !== "Exploding Kitten") {
        // Adds the drawn card the the list
        cardsInCom3Hand.push(cardDrawn)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(cardDrawn)

        // When Com 3 draws, checks if Com 3 has additional turns
        // (If Com 3 has played an attack card or not)

        // Com 3 has no additional turns

        if(turnsNeedToPlay == 0) {
            // Sets a time pause
            displayMessageBox("Com 3 has drawn card", "It's now your turn")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)
        }

        // Com 3 has additional turns

        else {
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

        let com3HasDiffuseCard = false

        // Sets a time pause
        setTimeout(() => {
            // Checks if Com 3 has a diffuse card   
            for(const card of cardsInCom3Hand) {
                if(card === "diffuse") {
                    com3HasDiffuseCard = true

                    break   
                }
            }

            // Checks if Com 3 didn't have a diffuse card
            if(com3HasDiffuseCard === false) {
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                // Tells the player that Com 3 has exploded
                displayMessageBox("Com 3 has exploded!","You won!")
            }
            else {
                // Diffuses the Exploding Kitten card

                // Removes the diffuse card from Com 3's hand 
                const cardIndex = cardsInCom3Hand.indexOf(cardDrawn)

                cardsInCom3Hand.splice(cardIndex, 1)

                setTimeout(() => {
                    // Dose nothing here 
                }, 1000);

                // Tells the player the Com 3 has diffused the Exploding Kitten
                $("#current_player_turn").html("Com 3 has diffused the Exploding Kitten")

                // Makes it be the player's turn

                // Sets a time pause
                setTimeout(() => {
                    $("#current_player_turn").html("It's now your turn")
                }, 2000);

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }
        }, 2000);
    }
}   

export { cardsInCom3Hand, drawCardForCom3 }