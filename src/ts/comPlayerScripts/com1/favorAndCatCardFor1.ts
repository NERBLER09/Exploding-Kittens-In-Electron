import { createShorthandPropertyAssignment } from "../../../../node_modules/typescript/lib/typescript.js";
import { displayMessageBox } from "../../messageBox.js";
import { playerCardsInHand, comPlayerPlayedFavor } from "../../messages.js";
import { checkForMatchingCatCards } from "../checkForMatchingCatCards.js";
import { cardsInCom2Hand } from "../com2/drawCardForCom2.js";
import { cardsInCom3Hand } from "../com3/drawCardForCom3.js";
import { cardsInCom1Hand, drawCardForCom1 } from "./drawCardForCom1.js";
import { choseCard as chooseCardForCom1 } from "./playCardForCom1.js";

type catCard = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon"

// Runs when com 1 has played 2 matching cat cards
const catCardPlayed = (catCard: catCard) => {
    if(checkForMatchingCatCards(cardsInCom1Hand, catCard) === false) {
        chooseCardForCom1()
    }
    
    // Checks if there is a matching cat card
    for (const card of cardsInCom1Hand) {
        // Matching card
        if (catCard === card) {
            console.log("Matching cat cards")
            console.log(catCard)
            console.log(card)

            displayMessageBox("Cat cards",`Com 1 has played 2 matching ${catCard}`)

            const waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                     
                    // Removes the matching card from com 1's hand
                    const cardIndex = cardsInCom1Hand.indexOf(card)
                    cardsInCom1Hand.splice(cardIndex, 1)

                    // Steals a random card from a chosen player
                    const cardToSteal = stealCard()

                    // Adds the stolen card to Com 1's hand
                    cardsInCom1Hand.push(cardToSteal)

                    drawCardForCom1()
                }
            }, 100);

            break
        }
    }
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

            return cardToStealFromPlayer

        case 2:
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

            return cardToStealFromPlayer
            
        case 3:
            // Steals a random card from Com 3

            // Choses a random card from Com 3's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToStealFromPlayer = cardsInCom3Hand[cardIndex]

            // Removes the stolen card from Com 3's hand
            cardsInCom3Hand.splice(cardIndex, 1)

            displayMessageBox("Card stolen","Com 1 has stolen a card from Com 3")

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

            return cardToStealFromPlayer
    }
}

// Choses a player to ask for a favor from
const askCardForFavor = (favorCardTarget) => {
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
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = "Com 1"
            comPlayerPlayedFavor["favorCardPlayed"] = true

            break
        case 2:
            // Asks for a card from com 2

            // Picks a random card from com 2's hand
            cardIndex = Math.floor(Math.random() * cardsInCom2Hand.length)
            cardToGive = cardsInCom2Hand[cardIndex]

            // Removes the card from com 2's hand
            cardsInCom2Hand.splice(cardIndex, 1)

            // Displays that Com 1 asked for a card from Com 2
            console.log(`Com 1 got a ${cardToGive} card from Com 2`)
            displayMessageBox("Can I have a card?","Com 1 ask for a card from Com 2")

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
            // Asks for a card from com 3

            // Picks a random card from com 3's hand
            cardIndex = Math.floor(Math.random() * cardsInCom3Hand.length)
            cardToGive = cardsInCom3Hand[cardIndex]

            // Removes the card from com 3's hand
            cardsInCom3Hand.splice(cardIndex, 1)

            // Displays that Com 1 asked for a card from Com 3
            console.log(`Com 1 got a ${cardToGive} card from Com 3`)
            displayMessageBox("Can I have a card?","Com 1 ask for a card from Com 3")

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

            return cardToGive

        default:
            console.error("Unknown player to ask for favor card")

            askCardForFavor(null)

    }
}
export {
    catCardPlayed,
    askCardForFavor
}