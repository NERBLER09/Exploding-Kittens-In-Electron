// const $ = require("jquery")

import { cards, comPlayerPlayedFavor, playerCardsInHand } from "./messages.js"
import { removeDrawnCardFromDeck, updateVariable, turnsNeedToPlay, seeTheFutureCards } from "./gameFunctions.js";
import { cardsInCom2Hand, choseAndPlayCardForCom2 } from "./com2Script.js";
import { cardsInCom3Hand } from "./com3Script.js";

// Stores the cards in com 1's hand
let cardsInCom1Hand: string[] = []

// Deals the 7 cards to computer player 1
const dealCardsToCom1 = () => {
    // Deals the 7 cards to the player
    for (let i = 0; i < 7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Adds the drawn card the the list
        cardsInCom1Hand.push(card)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)
    }

    // Deals the diffuse card to com 1 
    cardsInCom1Hand.push("diffuse")

    // Removes the diffuse card from the 
    removeDrawnCardFromDeck("diffuse")
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom1 = () => {
    // Choses a card to play from com 1's hand
    const cardToPlay = cardsInCom1Hand[Math.floor(Math.random() * cardsInCom1Hand.length)]

    // Removes the played card from com 1's hand
    const cardIndex = cardsInCom1Hand.indexOf(cardToPlay)
    cardsInCom1Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 1000);

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
                $("#current_player_turn").html("Com 1 has skipped there turn. It's now Com 2's turn.")

                // Sets a time pause 
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                choseAndPlayCardForCom2()
            }
            else {
                $("#current_player_turn").html("Com 1 has skipped there turn. It's now your turn.")

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
                $("#current_player_turn").html(`Com 1 has played an attack card. It's now Com 2's turn, Com 2 has ${turnsNeedToPlay} turns`)

                // Sets a time pause
                setTimeout(() => {
                    // Makes it be Com 2's turn
                    choseAndPlayCardForCom2()
                }, 2000);
            }

            // There is only 1 com player

            else {
                // Makes the player have 2 turns
                updateVariable("turnsNeedToPlay")

                // Displays that it's now the player's turn and how many turns that they have
                $("#current_player_turn").html(`Com 1 has played an attack card. It's now you turn, you have ${turnsNeedToPlay} turns`)

                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)
            }

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            $("#current_player_turn").html("Com 1 has shuffled the deck")

            // Draws the card
            drawCardForCom1()

            break
        case "see the future":
            $("#current_player_turn").html("Com 1 has seen the top 3 cards of the deck")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            // Draws the card
            drawCardForCom1()

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
            choseAndPlayCardForCom1()

            break
    }
}

// Draws a card to com 1
const drawCardForCom1 = () => {
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
    // Checks if Com 1 has drawn an Exploding Kitten card

    // Exploding Kitten was not drawn
    if(cardDrawn !== "Exploding Kitten") {
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
                // Sets a time pause
                setTimeout(() => {
                    $("#current_player_turn").html("Com 1 has drawn a card. It's now com 2's turn")

                    choseAndPlayCardForCom2()
                }, 2000);
            }
            else {
                // Sets a time pause
                setTimeout(() => {
                    $("#current_player_turn").html("Com 1 has drawn card. It's now your turn")
                }, 2000);

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)
            }
        }

        // Com 1 has additional turns

        else {
            // Removes 1 from turnsNeedToPlay to have Com 1 has 1 less turn
            updateVariable("removeFromTurnsNeedToPlay")

            // Sets a time pause 
            setTimeout(() => {
                // Makes it be Com 1's turn again
                // choseAndPlayCardForCom1()   
            }, 2000);
        }
    }

    // Exploding Kitten was drawn

    else {
        // Tells the player that Com 1 has drawn an Exploding Kitten card
        $("#current_player_turn").html("Com 1 has drawn an Exploding Kitten!")

        let com1HasDiffuseCard = false

        // Sets a time pause
        setTimeout(() => {
            // Checks if Com 1 has a diffuse card   
            for(const card of cardsInCom1Hand) {
                if(card === "diffuse") {
                    com1HasDiffuseCard = true

                    break   
                }
            }

            // Checks if Com 1 didn't have a diffuse card
            if(com1HasDiffuseCard === false) {
                setTimeout(() => {
                    // Dose nothing here
                }, 1000);

                // Tells the player that Com 1 has exploded
                $("#current_player_turn").html("Com 1 has exploded! You won!")
            }
            else {
                // Diffuses the Exploding Kitten card

                // Removes the diffuse card from Com 1's hand 
                const cardIndex = cardsInCom1Hand.indexOf(cardDrawn)

                cardsInCom1Hand.splice(cardIndex, 1)

                setTimeout(() => {
                    // Dose nothing here 
                }, 1000);

                // Tells the player the Com 1 has diffused the Exploding Kitten
                $("#current_player_turn").html("Com 1 has diffused the Exploding Kitten")

                // Makes it be Com 2's turn

                // Checks if there are 2 selected computer players
                const comAmount = localStorage.getItem("comAmount")

                if (comAmount === "2comPlayer" || comAmount === "3comPlayer") {
                    // Sets a time pause
                    setTimeout(() => {
                        $("#current_player_turn").html("It's now com 2's turn")

                        choseAndPlayCardForCom2()
                    }, 2000);
                }
                else {
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

// Runs when com 1 has played 2 matching cat cards
const catCardPlayed = (catCard: string) => {
    let hasCatCard = false

    // Checks if there is a matching cat card
    for (const card of cardsInCom1Hand) {
        // Matching card
        if (catCard === card) {
            $("#current_player_turn").html(`Com 1 has played 2 matching ${catCard}`)

            // Sets a time pause 
            setTimeout(() => {
                // Dose nothing here
            }, 1000);

            // Removes the matching card from com 1's hand
            const cardIndex = cardsInCom1Hand.indexOf(card)
            cardsInCom1Hand.splice(cardIndex, 1)

            // Steals a random card from a chosen player
            const cardToSteal = stealCard()

            // Adds the stolen card to Com 1's hand
            cardsInCom1Hand.push(cardToSteal)

            hasCatCard = true

            break
        }
    }

    // Checks if there are no matching 
    if (hasCatCard == false) {
        // Readds the played card back into com 1's hand
        cardsInCom1Hand.push(catCard)

        // Re-chooses a card to play
        choseAndPlayCardForCom1()
    }

    
    // Draws a card
    drawCardForCom1()
}

// Steals a random card from a player of choice (The player, com 1, or com 3)
const stealCard = () => {
    // Creates a random number to chose what player to target
    // 1 - The Player
    // 2 - Com 2
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

            $("#current_player_turn").html(`Com 1 has stolen your ${cardToStealFromPlayer}`)

            // Returns stolen card to add to Com 1's hand
            return cardToStealFromPlayer

        case 2:
            // Steals a random card from Com 2

            // Choses a random card from Com 2's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToStealFromPlayer = cardsInCom2Hand[cardIndex]

            // Removes the stolen card from Com 2's hand
            cardsInCom2Hand.splice(cardIndex, 1)

            $("#current_player_turn").html("Com 1 has stolen a card from Com 2")

            // Checks if cardToStealFromPlayer is undefined 
            if(cardToStealFromPlayer === undefined) {
                // Re-choses target
                stealCard()
            }

            // Returns stolen card to add to Com 1's hand
            return cardToStealFromPlayer
            
        case 3:
            // Steals a random card from Com 3

            // Choses a random card from Com 3's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToStealFromPlayer = cardsInCom3Hand[cardIndex]

            // Removes the stolen card from Com 3's hand
            cardsInCom3Hand.splice(cardIndex, 1)

            $("#current_player_turn").html("Com 1 has stolen a card from Com 3")

            // Checks if cardToStealFromPlayer is undefined 
            if(cardToStealFromPlayer === undefined) {
                // Re-choses target
                stealCard()
            }

            // Returns stolen card to add to Com 1's hand
            return cardToStealFromPlayer
    }
}

// Choses a player to ask for a favor from
const askCardForFavor = (favorCardTarget) => {
    let cardIndex: number
    let cardToGive: string

    // Asks a favor from the correct player
    switch(favorCardTarget) {
        case 1:
            // Asks for a card from the player

            // Tells the player to give a card to Com 1
            $("#current_player_turn").html("Com 1 has asked you for a favor card. Click on a card to give it to Com 1")

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
            $("#current_player_turn").html("Com 1 ask for a card from Com 2")

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
            $("#current_player_turn").html("Com 1 ask for a card from Com 3")

            // Returns the given card 
            return cardToGive

        default:
            console.error("Unknown player to ask for favor card")

            askCardForFavor(null)

    }
}

// Exports as a module 
export {
    dealCardsToCom1,
    choseAndPlayCardForCom1,
    cardsInCom1Hand,
    drawCardForCom1
}