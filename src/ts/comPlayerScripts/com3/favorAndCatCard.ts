import { displayMessageBox } from "../../messageBox.js";
import { comPlayerPlayedFavor, playerCardsInHand } from "../../messages.js";
import { cardsInCom1Hand } from "../com1/drawCardForCom1.js";
import { cardsInCom2Hand } from "../com2/drawCardForCom2.js";
import { cardsInCom3Hand, drawCardForCom3 } from "./drawCardForCom3.js";
import { choseCardForCom3 } from "./playCardCom3.js";

// Runs when com 3 has played 2 matching cat cards
const catCardPlayed = (catCard: string) => {
    let hasCatCard = false

    // Checks if there is a matching cat card
    for(const card of cardsInCom3Hand) {
        // Matching card
        if(catCard === card) {
            displayMessageBox("Cat cards",`Com 1 has played 2 matching ${catCard}`)

            const waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                     
                    // Removes the matching card from com 3's hand
                    const cardIndex = cardsInCom3Hand.indexOf(card)
                    cardsInCom3Hand.splice(cardIndex, 1)

                    // Steals a random card from a chosen player
                    const cardToSteal = stealCard()

                    // Adds the stolen card to Com 3's hand
                    cardsInCom3Hand.push(cardToSteal)

                    hasCatCard = true
                }
            }, 100);
            break
        }
    }

    // Checks if there are no matching 
    if(hasCatCard == false) {
        // Readds the played card back into com 3's hand
        cardsInCom3Hand.push(catCard)

        // Re-chooses a card to play
        choseCardForCom3()
    }

    const waitUntilMessageBoxIsClosed = setInterval(() => {
        // Checks if the player has closed the #message_box
        if($("#message_box").is(":hidden") ) {
            clearInterval(waitUntilMessageBoxIsClosed)
            // Draws the card
            drawCardForCom3()
        }
    }, 100);
}

// Steals a random card from a player of choice (The player, com 1, or com 3)
const stealCard = () => {
    // Creates a random number to chose what player to target
    // 1 - The Player
    // 2 - Com 2
    // 3 - Com 3
    
    let stealCardTarget: number
    let returnStolenCard: NodeJS.Timeout

    // Check how many com players were selected 
    switch(localStorage.getItem("comAmount")) {
        case "1comPlayer":
            stealCardTarget = 1

            break
        case "2comPlayer":
            stealCardTarget = Math.floor(Math.random() * 3)

            break
        case "3comPlayer":
            stealCardTarget = Math.floor(Math.random() * 4)

            break
    }
    
    let cardIndex: number
    let cardToStealFromPlayer: string

    // Checks if there are enough com players for the player target

    // Enters switch statement to steal a random card from the right player
    switch(stealCardTarget) {
        
        case 1:
            // Steals a random card from the player

            // Choses a random card from the players hand to steal
            cardIndex = Math.floor(Math.random() * playerCardsInHand.length)

            cardToStealFromPlayer = playerCardsInHand[cardIndex]

            // Removes the stolen card from the player's hand
            playerCardsInHand.splice(cardIndex, 1)

            $(".player_cards").get(cardIndex).remove()

            displayMessageBox("Card stolen",`Com 1 has stolen your ${cardToStealFromPlayer}`)

            returnStolenCard = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(returnStolenCard)

                    // Returns stolen card to add to Com 1's hand
                    return cardToStealFromPlayer   
                }
            }, 100);

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer

        case 2:
            // Steals a random card from Com 1

            // Choses a random card from Com 1's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom1Hand.length)

            cardToStealFromPlayer = cardsInCom1Hand[cardIndex]

            // Removes the stolen card from Com 1's hand
            cardsInCom1Hand.splice(cardIndex, 1)

            displayMessageBox("Card stolen","Com 3 has stolen a card from Com 1")

            returnStolenCard = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    // Checks if cardToStealFromPlayer is undefined 
                    if(cardToStealFromPlayer === undefined) {
                        // Re-choses target
                        stealCard()
                    }
                    else {
                        clearInterval(returnStolenCard)

                        // Returns stolen card to add to Com 1's hand
                        return cardToStealFromPlayer                     
                    }
                }
            }, 100);

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer
            
        case 3:
            // Steals a random card from Com 2

            // Choses a random card from Com 2's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToStealFromPlayer = cardsInCom2Hand[cardIndex]

            // Removes the stolen card from Com 2's hand
            cardsInCom2Hand.splice(cardIndex, 1)

            displayMessageBox("Card stolen","Com 1 has stolen a card from Com 2")

            returnStolenCard = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    // Checks if cardToStealFromPlayer is undefined 
                    if(cardToStealFromPlayer === undefined) {
                        // Re-choses target
                        stealCard()
                    }
                    else {
                        clearInterval(returnStolenCard)

                        // Returns stolen card to add to Com 1's hand
                        return cardToStealFromPlayer                     
                    }
                }
            }, 100);

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer
    }
}

// Choses a player to ask for a favor from
const askCardForFavor = (favorCardTarget) => {
    console.log(favorCardTarget)

    let cardIndex: number
    let cardToGive: string
    let returnFavoredCard: NodeJS.Timeout

    // Asks a favor from the correct player
    switch(favorCardTarget) {
        case 1:
            // Asks for a card from the player

            // Tells the player to give a card to Com 1
            displayMessageBox("Can I have a card?", "Com 1 has asked you for a favor card. Click on a card to give it to Com 1")

            // Adds the needed information to comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = "Com 3"
            comPlayerPlayedFavor["favorCardPlayed"] = true

            break
        case 2:
            // Asks for a card from com 1

            // Picks a random card from com 1's hand
            cardIndex = Math.floor(Math.random() * cardsInCom1Hand.length)

            console.log(cardsInCom1Hand[cardIndex])
            cardToGive = cardsInCom1Hand[cardIndex]

            // Removes the card from com 1's hand
            cardsInCom1Hand.splice(cardIndex, 1)

            // Displays that Com 3 asked for a card from Com 1
            console.log(`Com 3 got a ${cardToGive} card from Com 1`)
            displayMessageBox("Can I have a card?","Com 3 ask for a card from Com 1")

            returnFavoredCard = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    // Checks if cardToGive is undefined 
                    if(cardToGive === undefined) {
                        // Re-choses target
                        stealCard()
                    }
                    else {
                        clearInterval(returnFavoredCard)

                        // Returns stolen card to add to Com 1's hand
                        return cardToGive                     
                    }
                }
            }, 100);

            // Returns the given card 
            return cardToGive
        case 3:
            // Asks for a card from com 2

            // Picks a random card from com 2's hand
            cardIndex = Math.floor(Math.random() * cardsInCom2Hand.length)
            cardToGive = cardsInCom2Hand[cardIndex]

            // Removes the card from com 2's hand
            cardsInCom2Hand.splice(cardIndex, 1)

            // Displays that Com 3 asked for a card from Com 2
            console.log(`Com 3 got a ${cardToGive} card from Com 2`)
            displayMessageBox("Can I have a card?","Com 3 ask for a card from Com 2")

            returnFavoredCard = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    // Checks if cardToGive is undefined 
                    if(cardToGive === undefined) {
                        // Re-choses target
                        stealCard()
                    }
                    else {
                        clearInterval(returnFavoredCard)

                        // Returns stolen card to add to Com 1's hand
                        return cardToGive                     
                    }
                }
            }, 100);

            // Returns the given card 
            return cardToGive

        default:
            console.error("Unknown player to ask for favor card")

            askCardForFavor(null)

    }
}

export { catCardPlayed }