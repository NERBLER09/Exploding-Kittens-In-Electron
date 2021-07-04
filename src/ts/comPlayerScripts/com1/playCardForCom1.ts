import { turnsNeedToPlay, updateVariable } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { choseCardForCom2 } from "../com2/playCardCom2.js"
import { cardsInCom1Hand, drawCardForCom1 } from "./drawCardForCom1.js"
import { askCardForFavor, catCardPlayed } from "./favorAndCatCardFor1.js"

const choseCardForCom1 = () => {
    // Choses a card to play from com 1's hand
    const cardToPlay = cardsInCom1Hand[Math.floor(Math.random() * cardsInCom1Hand.length)]
    // Removes the played card from com 1's hand
    const cardIndex = cardsInCom1Hand.indexOf(cardToPlay)
    cardsInCom1Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 1000);

    playCard(cardToPlay)
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
            // Checks if there are more then 1 com player to pass turn to the right player
            if(localStorage.getItem("comAmount") !== "1comPlayer") {
                // Tells the player that Com 1 has played a skip and that it's now Com 2's turn
                displayMessageBox("Com 1 has skipped there turn"," It's now Com 2's turn.")

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForCom2()
                    }
                }, 100);

            }
            else {
                displayMessageBox("Com 1 has skipped there turn","It's now your turn.")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "attack":
            // Checks if there are 2 or more com players (So it doesn't target the player)

            // There are 2 or more com players
            const comAmount = localStorage.getItem("comAmount")

            // Checks how many com players are there

            // More then 1 com player

            if(comAmount !== "1comPlayer") {
                // Makes Com 2 has 2 turns 
                updateVariable("turnsNeedToPlay")

                // Displays the amount of turns Com 2 has 
                displayMessageBox("Com 1 has played an attack",`It's now Com 2's turn, Com 2 has ${turnsNeedToPlay} turns`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForCom2()    
                    }
                }, 100);
            }

            // There is only 1 com player

            else {
                // Makes the player have 2 turns
                updateVariable("turnsNeedToPlay")

                // Displays that it's now the player's turn and how many turns that they have
                displayMessageBox("Com 1 has played an attack", `It's now you turn, you have ${turnsNeedToPlay} turns`)

                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            displayMessageBox("The deck has been shuffled","Com 1 has shuffled the deck")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom1()
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
            switch(localStorage.getItem("comAmount")) {
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
            if(favorCardTarget == 1) {
                askCardForFavor(favorCardTarget)
            }
            else {
                // Ask for a card from the player of choice
                const givenCard = askCardForFavor(favorCardTarget)

                // Adds the given card to Com 1's hand
                cardsInCom1Hand.push(givenCard)

                // Draws the card
                drawCardForCom1()
            }

            break

        case "nope":
            console.error("No cards to nope (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            cardsInCom1Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom1()

            break
    }
}
export { choseCardForCom1 as choseCard }