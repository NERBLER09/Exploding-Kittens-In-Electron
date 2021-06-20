// const $ = required("jquery")

import { cards, comPlayerPlayedFavor, playerCardsInHand } from "./messages.js"
import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "./gameFunctions.js";
import { cardsInCom3Hand, choseAndPlayCardForCom3 } from "./com3Script.js";
import { cardsInCom1Hand } from "./com1Script.js";
import { displayMessageBox } from "./messageBox.js";

// Stores the cards in com 2's hand
let cardsInCom2Hand:string[] = []
 
// Draws the 7 card to computer player 2
const dealCardsToCom2 = () => {
    // Deals the 7 cards to the player
    for(let i = 0; i<7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Adds the drawn card the the list
        cardsInCom2Hand.push(card)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)
    }

    // Deals the diffuse card to com 2
    cardsInCom2Hand.push("diffuse")

    // Removes the diffuse card from the 
    removeDrawnCardFromDeck("diffuse")
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom2 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom2Hand[Math.floor(Math.random() * cardsInCom2Hand.length)]

    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Removes the played card from com 2's hand
    const cardIndex = cardsInCom2Hand.indexOf(cardToPlay)
    cardsInCom2Hand.splice(cardIndex, 1)

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
            // Checks if there are 3 com player to pass turn to the right player
            if(localStorage.getItem("comAmount") === "3comPlayer") {
                // Tells the player that Com 1 has played a skip and that it's now Com 2's turn
                displayMessageBox("Com 2 has skipped there turn"," It's now Com 2's turn.")

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 3's turn
                        choseAndPlayCardForCom3()
                    }
                }, 100);
            }
            else {
                displayMessageBox("Com 2 has skipped there turn","Com 2 has skipped there turn. It's now your turn.")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "attack":
             // Checks if there are 3 com players (So it doesn't target the player)

            // There are 2 or more com players
            const comAmount = localStorage.getItem("comAmount")

            if(comAmount === "3comPlayer") {
                // Makes Com 2 has 2 turns 
                updateVariable("turnsNeedToPlay")

                displayMessageBox("Com 2 has played an attack",`It's now Com 3's turn, Com 3 has ${turnsNeedToPlay} turns`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if($("#message_box").is(":hidden") ) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseAndPlayCardForCom2()    
                    }
                }, 100);
            }

            // There is only 2 com players

            else {
                // Makes the player have 2 turns
                updateVariable("turnsNeedToPlay")

                // Displays that it's now the player's turn and how many turns that they have
                displayMessageBox("Com 2 has played an attack", `It's now you turn, you have ${turnsNeedToPlay} turns`)
                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "shuffle":
            displayMessageBox("The deck has been shuffled","Com 2 has shuffled the deck")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom2()
                }
            }, 100);

            break
        case "see the future":
            displayMessageBox("Com 2 has played a see the future card","Com 2 has seen the top 3 cards of the deck")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom2()
                }
            }, 100);

            break
        case "favor":
            // Choses which player to ask for a favor
            // 1 - The Player
            // 2 - Com 1
            // 3 - Com 3

            let favorCardTarget: number

            // Check how many com players were selected 
            switch(localStorage.getItem("comAmount")) {
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
                cardsInCom2Hand.push(givenCard)

                // Draws the card
                drawCardForCom2()
            }

            break

        case "nope":
            // Re-chooses a card to play

            // Readds the played card back into com 2's hand
            cardsInCom2Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseAndPlayCardForCom2()
    }
}

// Draws a card to com 2
const drawCardForCom2 = () => {
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

    // Checks if Com 2 has drawn an Exploding Kitten

    // Exploding Kitten was not drawn

    if(cardDrawn !== "Exploding Kitten") {
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
                        choseAndPlayCardForCom3()    
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

                    choseAndPlayCardForCom2()    
                }
            }, 100);
        }
    }

    // Exploding Kitten was drawn

    else {
        // Tells the player that Com 2 has drawn an Exploding Kitten card
        displayMessageBox("An Exploding Kitten card has been drawn","Com 2 has drawn an Exploding Kitten!")

        let com2HasDiffuseCard = false

        // Sets a time pause
        setTimeout(() => {
            // Checks if Com 2 has a diffuse card   
            for(const card of cardsInCom2Hand) {
                if(card === "diffuse") {
                    com2HasDiffuseCard = true

                    break   
                }
            }

            // Checks if Com 2 didn't have a diffuse card
            if(com2HasDiffuseCard === false) {
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                // Tells the player that Com 2 has exploded
                displayMessageBox("Com 2 has exploded!","You won!")
            }
            else {
                // Diffuses the Exploding Kitten card

                // Removes the diffuse card from Com 2's hand 
                const cardIndex = cardsInCom2Hand.indexOf(cardDrawn)

                cardsInCom2Hand.splice(cardIndex, 1)

                setTimeout(() => {
                    // Dose nothing here 
                }, 1000);

                // Tells the player the Com 2 has diffused the Exploding Kitten
                $("#current_player_turn").html("Com 2 has diffused the Exploding Kitten")

                // Makes it be Com 3's turn

                // Checks if there are 2 or 3 selected computer players
                const comAmount = localStorage.getItem("comAmount")

                // Checks if there are 3 selected computer players
                if(comAmount === "3comPlayer") {
                    displayMessageBox("Com 2 has diffused the Exploding Kitten","It's now com 3's turn")

                    const setCom1Turn = setInterval(() => {
                        // Checks if the player has closed the #message_box
                        if($("#message_box").is(":hidden") ) {
                            clearInterval(setCom1Turn)

                            // Makes it be com 1's turn
                            choseAndPlayCardForCom3()
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

// Adds a card gotten from a favor or by playing 2 cat cards to com 2's hand
const addNewCardToHand = (cardToAdd: string) => {
    console.log(`Com 2's new card is ${cardToAdd}`)

    // Adds the new card to the hand
    cardsInCom2Hand.push(cardToAdd)
}

// Runs when com 2 has played 2 matching cat cards
const catCardPlayed = (catCard: string) => {
    let hasCatCard = false

    // Checks if there is a matching cat card
    for(const card of cardsInCom2Hand) {
        // Matching card
        if(catCard === card) {
            displayMessageBox("Cat cards",`Com 2 has played 2 matching ${catCard}`)

            const waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                     
                    // Removes the matching card from com 2's hand
                    const cardIndex = cardsInCom2Hand.indexOf(card)
                    cardsInCom2Hand.splice(cardIndex, 1)

                    // Steals a random card from a chosen player
                    const cardToSteal = stealCard()

                    // Adds the stolen card to Com 2's hand
                    addNewCardToHand(cardToSteal)

                    hasCatCard = true
                }
            }, 100);

            break
        }
    }

    // Checks if there are no matching 
    if(hasCatCard == false) {
        // Readds the played card back into com 2's hand
        cardsInCom2Hand.push(catCard)

        // Re-chooses a card to play
        choseAndPlayCardForCom2()
    }

    const waitUntilMessageBoxIsClosed = setInterval(() => {
        // Checks if the player has closed the #message_box
        if($("#message_box").is(":hidden") ) {
            clearInterval(waitUntilMessageBoxIsClosed)
            // Draws the card
            drawCardForCom2()
        }
    }, 100);
}

// Steals a random card from a player of choice (The player, com 1, or com 3)
const stealCard = () => {
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
    let cardToStealFromPlayer: string
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
            cardIndex = Math.floor(Math.random() * cardsInCom1Hand.length)

            cardToStealFromPlayer = cardsInCom1Hand[cardIndex]

            // Removes the stolen card from Com 1's hand
            cardsInCom1Hand.splice(cardIndex, 1)

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
            cardIndex = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToStealFromPlayer = cardsInCom3Hand[cardIndex]

            // Removes the stolen card from Com 3's hand
            cardsInCom3Hand.splice(cardIndex, 1)

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
const askCardForFavor = (favorCardTarget: number) => {
    console.log(favorCardTarget)

    let cardIndex: number
    let cardToGive: string
    let returnFavoredCard: NodeJS.Timeout

    // Asks a favor from the correct player
    switch(favorCardTarget) {
        case 1:
            // Asks for a card from the player

            // Tells the player to give a card to Com 2
            displayMessageBox("Can I have a card?", "Com 2 has asked you for a favor card. Click on a card to give it to Com 1")

            // Adds the needed information to comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = "Com 2"
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

            // Displays that Com 2 asked for a card from Com 2
            console.log(`Com 2 got a ${cardToGive} card from Com 1`)
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
            cardIndex = Math.floor(Math.random() * cardsInCom3Hand.length)
            cardToGive = cardsInCom3Hand[cardIndex]

            // Removes the card from com 3's hand
            cardsInCom3Hand.splice(cardIndex, 1)

            // Displays that Com 2 asked for a card from Com 3
            console.log(`Com 2 got a ${cardToGive} card from Com 3`)
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
            console.error("Unknown player to ask for favor card")

            askCardForFavor(null)

    }
}

// Exports as a modules
export {
    dealCardsToCom2,
    choseAndPlayCardForCom2,
    cardsInCom2Hand,
    drawCardForCom2
}
