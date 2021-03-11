const $ = require("jquery")

import { cards } from "./messages.js"
import { removeDrawnCardFromDeck, updateVariable } from "./gameFunctions.js";
import { choseAndPlayCardForCom3 } from "./com3Script.js";

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

    // console.log("Com 2's hand")
    // console.table(cardsInCom2Hand)
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom2 = () => {
    // Choses a card to play
    const cardToPlay = cardsInCom2Hand[Math.floor(Math.random() * cardsInCom2Hand.length)]

    // console.log(`Com 2 card to play: ${cardToPlay}`)

    // Removes the played card from com 1's hand
    const cardIndex = cardsInCom2Hand.indexOf(cardToPlay)
    cardsInCom2Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {
        let hasCatCard = false

        // Checks if there is a matching cat card
        for(const card of cardsInCom2Hand) {
            // Matching card
            if(cardToPlay === card) {
                // Removes the matching card from com 1's hand
                const cardIndex = cardsInCom2Hand.indexOf(card)
                cardsInCom2Hand.splice(cardIndex, 1)

                const cardToSteal = cardsInCom2Hand[Math.floor(Math.random() * cardsInCom2Hand.length)]

                // Steals a card and adds it to com 1's hand
                addNewCardToHand(cardToSteal)

                hasCatCard = true

                $("#current_player_turn").html(`Com 2 has stolen your ${cardToSteal}`)

                break
            }
        }

        // Checks if there are no matching 
        if(hasCatCard == false) {
            // Readds the played card back into com 1's hand
            cardsInCom2Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseAndPlayCardForCom2()
        }

        // Draws a card
        drawCard()
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            $("#current_player_turn").html("Com 2 has skipped there turn. It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            updateVariable("isPlayerTurn", true)
            updateVariable("turnsNeedToPlay")

            $("#current_player_turn").html("Com 2 has played an attack card. You now 2 turns")

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            $("#current_player_turn").html("Com 2 has played a shuffle card")

            // Draws the card
            drawCard()

            break
        case "see the future":
            $("#current_player_turn").html("Com 2 has played a see the future card")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            // Draws the card
            drawCard()

            break
        case "favor":
            $("#current_player_turn").html("Com 1 has played a favor card")
            
            // Adds the new favor card to com 1's hand
            addNewCardToHand(cardsInCom2Hand[Math.floor(Math.random() * cardsInCom2Hand.length)])

            // Draws the card
            drawCard()

            break
    }

    // Checks if a nope was played to re-choose 
    if(cardToPlay === "nope") {
        // Readds the played card back into com 1's hand
        cardsInCom2Hand.push(cardToPlay)

        // Re-chooses a card to play
        choseAndPlayCardForCom2()
    }
}

// Draws a card to com 1
const drawCard = () => {

    // Choses a card
    const cardIndex = Math.floor(Math.random() * cards.length)
    const card = cards[cardIndex];

    // Adds the drawn card the the list
    cardsInCom2Hand.push(card)

    // Removes the drawn card from the deck
    removeDrawnCardFromDeck(card)

    // Checks if there are 3 com players 
    const comAmount = localStorage.getItem("comAmount")

    // Checks if there are 3 selected computer players
    if(comAmount === "3comPlayer") {
        // Sets a time pause
        setTimeout(() => {
            $("#current_player_turn").html("It's now Com 3's turn")
        }, 2000);

        // Makes it be com 3's turn
        choseAndPlayCardForCom3()
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

// Adds a card gotten from a favor or by playing 2 cat cards to com 1's hand
const addNewCardToHand = (cardToAdd: string) => {
    console.log(`Com 2's new card is ${cardToAdd}`)

    // Adds the new card to the hand
    cardsInCom2Hand.push(cardToAdd)
}

// Exports as a modules
export {
    dealCardsToCom2,
    choseAndPlayCardForCom2,
    cardsInCom2Hand
}
