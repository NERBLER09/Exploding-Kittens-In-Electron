import { displayMessageBox } from "../../messageBox.js";
import { comPlayerPlayedFavor, playerCardsInHand } from "../../messages.js";
import { card, catCard } from "../../models/cards.interface.js";
import { com1Player, com2Player, com3Player } from "../comPlayerClass.js";
import { drawCardForCom2 } from "./drawCardForCom2.js";
import { choseCardForCom2 } from "./playCardCom2.js";

// Runs when com 2 has played 2 matching cat cards
const catCardPlayedForCom2 = (catCard: catCard) => {
    if(com2Player.checkForMatchingCatCards(catCard)) {
        choseCardForCom2()
    }

    // Checks if there is a matching cat card
    for(const card of com2Player.hand) {
        // Matching card
        if(catCard === card) {
            displayMessageBox("Cat cards",`Com 2 has played 2 matching ${catCard}`)

            const waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                     
                    // Removes the matching card from com 2's hand
                    const cardIndex = com2Player.hand.indexOf(card)
                    com2Player.hand.splice(cardIndex, 1)

                    // Steals a random card from a chosen player
                    const cardToSteal:card = stealCard()

                    // Adds the stolen card to Com 2's hand
                    com2Player.hand.push(cardToSteal)

                    const waitUntilMessageBoxClosed: NodeJS.Timeout = setInterval(() => {
                        if ($("#message_box").is(":hidden")) {
                            clearInterval(waitUntilMessageBoxClosed)
                            drawCardForCom2()
                            return ""
                        }
                    }, 100)
                }
            }, 100);

            break
        }
    }
}

// Steals a random card from a player of choice (The player, com 1, or com 3)
const stealCard = (): card => {
    // Creates a random number to chose what player to target
    // 1 - The Player
    // 2 - Com 1
    // 3 - Com 3

    let stealCardTarget: number

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
    let cardToStealFromPlayer: card
    let returnStolenCard: NodeJS.Timeout

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

            displayMessageBox("Card stolen",`Com 2 has stolen your ${cardToStealFromPlayer}`)

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
            // Steals a random card from Com 1

            // Choses a random card from Com 1's hand to steal
            cardIndex = Math.floor(Math.random() * com1Player.hand.length)

            cardToStealFromPlayer = com1Player.hand[cardIndex]

            // Removes the stolen card from Com 1's hand
            com1Player.hand.splice(cardIndex, 1)

            displayMessageBox("Card stolen","Com 2 has stolen a card from Com 1")

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

            // Returns stolen card to add to Com 2's hand
            return cardToStealFromPlayer
            
        case 3:
            // Steals a random card from Com 3

            // Choses a random card from Com 3's hand to steal
            cardIndex = Math.floor(Math.random() * com3Player.hand.length)

            cardToStealFromPlayer = com3Player.hand[cardIndex]

            // Removes the stolen card from Com 3's hand
            com3Player.hand.splice(cardIndex, 1)

            displayMessageBox("Card stolen","Com 2 has stolen a card from Com 3")

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

            // Returns stolen card to add to Com 2's hand
            return cardToStealFromPlayer
    }
}

// Choses a player to ask for a favor from
const askCardForFavorForCom2 = (favorCardTarget: number): card => {
    let cardIndex: number
    let cardToGive: card
    let returnFavoredCard: NodeJS.Timeout

    // Asks a favor from the correct player
    switch(favorCardTarget) {
        case 1:
            // Asks for a card from the player

            // Tells the player to give a card to Com 2
            displayMessageBox("Can I have a card?", "Com 2 has asked you for a favor card. Click on a card to give it to Com 2")

            // Adds the needed information to comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = "Com 2"
            comPlayerPlayedFavor["favorCardPlayed"] = true

            break
        case 2:
            // Asks for a card from com 1

            // Picks a random card from com 1's hand
            cardIndex = Math.floor(Math.random() * com1Player.hand.length)

            cardToGive = com1Player.hand[cardIndex]

            // Removes the card from com 1's hand
            com1Player.hand.splice(cardIndex, 1)

            // Displays that Com 2 asked for a card from Com 2
            displayMessageBox("Can I have a card?","Com 2 ask for a card from Com 1")

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
            cardIndex = Math.floor(Math.random() * com3Player.hand.length)
            cardToGive = com3Player.hand[cardIndex]

            // Removes the card from com 3's hand
            com3Player.hand.splice(cardIndex, 1)

            // Displays that Com 2 asked for a card from Com 3
            displayMessageBox("Can I have a card?","Com 2 ask for a card from Com 3")

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
            // Check how many com players were selected 
            switch(localStorage.getItem("comAmount")) {
                case "2comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 2)

                    break
                case "3comPlayer":
                    favorCardTarget = Math.floor(Math.random() * 3)

                    break
            }

            askCardForFavorForCom2(favorCardTarget)
            
            break

    }
}

export {
    askCardForFavorForCom2,
    catCardPlayedForCom2    
}