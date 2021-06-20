// const $ = require("jquery")

import { cards, comPlayerPlayedFavor, playerCardsInHand } from "./messages.js"
import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "./gameFunctions.js";
import { cardsInCom1Hand } from "./com1Script.js";
import { cardsInCom2Hand } from "./com2Script.js";
import { displayMessageBox } from "./messageBox.js";

// Stores the cards in com 3's hand
let cardsInCom3Hand:string[] = []

// Draws the 7 card to computer player 3
const dealCardsToCom3 = () => {
    // Deals the 7 cards to the player
    for(let i = 0; i<7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Adds the drawn card the the list
        cardsInCom3Hand.push(card)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)
    }

    // Deals the diffuse card to com 3
    cardsInCom3Hand.push("diffuse")

    // Removes the diffuse card from the 
    removeDrawnCardFromDeck("diffuse")
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom3 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom3Hand[Math.floor(Math.random() * cardsInCom3Hand.length)]

    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Removes the played card from com 3's hand
    const cardIndex = cardsInCom3Hand.indexOf(cardToPlay)
    cardsInCom3Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {
        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            displayMessageBox("Com 3 has skipped there turn","It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            // Makes the player have 2 turns
            updateVariable("turnsNeedToPlay")

            // Displays that it's now the player's turn and how many turns that they have
            displayMessageBox("Com 3 has played an attack", `It's now you turn, you have ${turnsNeedToPlay} turns`)

            // Makes it be the player's turn
            updateVariable("isPlayerTurn", true)

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            displayMessageBox("The deck has been shuffled","Com 3 has shuffled the deck")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom3()
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
                    drawCardForCom3()
                }
            }, 100);

            break
        case "favor":
            // Choses which player to ask for a favor
            // 1 - The Player
            // 2 - Com 1
            // 3 - Com 2

            let favorCardTarget: number

            // Selects the target
            favorCardTarget = Math.floor(Math.random() * 4)

            // Checks if selected target has a return in switch statement 
            if(favorCardTarget == 1) {
                askCardForFavor(favorCardTarget)
            }
            else {
                // Ask for a card from the player of choice
                const givenCard = askCardForFavor(favorCardTarget)

                // Adds the given card to Com 1's hand
                cardsInCom3Hand.push(givenCard)

                // Draws the card
                drawCardForCom3()
            }

            break

        case "nope":
            // Re-chooses the card to play

            // Readds the played card back into com 3's hand
            cardsInCom3Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseAndPlayCardForCom3()
    }
}

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
                choseAndPlayCardForCom3()   
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

// Adds a card gotten from a favor or by playing 3 cat cards to com 3's hand
const addNewCardToHand = (cardToAdd: string) => {
    console.log(`Com 3's new card is ${cardToAdd}`)

    // Adds the new card to the hand
    cardsInCom3Hand.push(cardToAdd)
}

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
                    addNewCardToHand(cardToSteal)

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
        choseAndPlayCardForCom3()
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

export {
    dealCardsToCom3,
    choseAndPlayCardForCom3,
    cardsInCom3Hand,
    drawCardForCom3
}
