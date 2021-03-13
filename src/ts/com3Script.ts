const $ = require("jquery")

import { cards, playerCardsInHand } from "./messages.js"
import { removeDrawnCardFromDeck, turnsNeedToPlay, updateVariable } from "./gameFunctions.js";
import { cardsInCom1Hand } from "./com1Script.js";
import { cardsInCom2Hand } from "./com2Script.js";

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

    // console.log("Com 3's hand")
    // console.table(cardsInCom3Hand)
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom3 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom3Hand[Math.floor(Math.random() * cardsInCom3Hand.length)]

    // console.log(`Com 3 card to play: ${cardToPlay}`)

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

        // Draws a card
        drawCardForCom3()
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            $("#current_player_turn").html("Com 3 has skipped there turn. It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            // Makes the player have 2 turns
            updateVariable("turnsNeedToPlay")

            // Displays that it's now the player's turn and how many turns that they have
            $("#current_player_turn").html(`Com 1 has played an attack card. It's now you turn, you have ${turnsNeedToPlay} turns`)

            // Makes it be the player's turn
            updateVariable("isPlayerTurn", true)

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            $("#current_player_turn").html("Com 3 has played a shuffle card")

            // Draws the card
            drawCardForCom3()

            break
        case "see the future":
            $("#current_player_turn").html("Com 3 has played a see the future card")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            // Draws the card
            drawCardForCom3()

            break
        case "favor":
            // Ask for a card from the player of choice
            const givenCard = askCardForFavor()

            // Adds the given card to Com 1's hand
            cardsInCom3Hand.push(givenCard)

            // Draws the card
            drawCardForCom3()

            break
    }

    // Checks if a nope was played to re-choose 
    if(cardToPlay === "nope") {
        // Readds the played card back into com 3's hand
        cardsInCom3Hand.push(cardToPlay)

        // Re-chooses a card to play
        choseAndPlayCardForCom3()
    }
}

// Draws a card to com 3
const drawCardForCom3 = () => {
    // Choses a card
    const cardIndex = Math.floor(Math.random() * cards.length)
    const card = cards[cardIndex];

    // Adds the drawn card the the list
    cardsInCom3Hand.push(card)

    // Removes the drawn card from the deck
    removeDrawnCardFromDeck(card)

    // When Com 3 draws, checks if Com 3 has additional turns
    // (If Com 3 has played an attack card or not)

    // Com 3 has no additional turns

    if(turnsNeedToPlay == 0) {
        // Sets a time pause
        setTimeout(() => {
            $("#current_player_turn").html("It's now your turn")
        }, 2000);

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
                // Removes the matching card from com 3's hand
                const cardIndex = cardsInCom3Hand.indexOf(card)
                cardsInCom3Hand.splice(cardIndex, 1)

                // Steals a random card from a chosen player
                const cardToSteal = stealCard()

                // Adds the stolen card to Com 2's hand
                addNewCardToHand(cardToSteal)

                hasCatCard = true

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

            $("#current_player_turn").html(`Com 3 has stolen your ${cardToStealFromPlayer}`)

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer

        case 2:
            // Steals a random card from Com 1

            // Choses a random card from Com 1's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom1Hand.length)

            cardToStealFromPlayer = cardsInCom1Hand[cardIndex]

            // Removes the stolen card from Com 1's hand
            cardsInCom1Hand.splice(cardIndex, 1)

            $("#current_player_turn").html("Com 3 has stolen a card from Com 2")

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer
            
        case 3:
            // Steals a random card from Com 2

            // Choses a random card from Com 2's hand to steal
            cardIndex = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToStealFromPlayer = cardsInCom2Hand[cardIndex]

            // Removes the stolen card from Com 2's hand
            cardsInCom2Hand.splice(cardIndex, 1)

            $("#current_player_turn").html("Com 3 has stolen a card from Com 2")

            // Returns stolen card to add to Com 3's hand
            return cardToStealFromPlayer
    }
}

// Choses a player to ask for a favor from
const askCardForFavor = () => {
    // Choses which player to ask for a favor
    // 1 - The Player
    // 2 - Com 1
    // 3 - Com 2

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

    console.log(favorCardTarget)

    let cardIndex: number
    let cardToGive: string

    // Asks a favor from the correct player
    switch(favorCardTarget) {
        case 1:
            // Asks for a card from the player

            // TODO: Allow the Player to chose a card to give to Com 1

            console.error("Can't ask for a card from the player")

            askCardForFavor()

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
            $("#current_player_turn").html("Com 3 ask for a card from Com 1")

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
            $("#current_player_turn").html("Com 3 ask for a card from Com 2")

            // Returns the given card 
            return cardToGive

        default:
            console.error("Unknown player to ask for favor card")

            askCardForFavor()

    }
}

export {
    dealCardsToCom3,
    choseAndPlayCardForCom3,
    cardsInCom3Hand
}
