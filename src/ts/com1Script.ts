const $ = require("jquery")

import { cards } from "./messages.js"
import { removeDrawnCardFromDeck, updateVariable } from "./gameFunctions.js";
import { choseAndPlayCardForCom2 } from "./com2Script.js";

// Stores the cards in com 1's hand
let cardsInCom1Hand:string[] = []

// Deals the 7 cards to computer player 1
const dealCardsToCom1 = () => {
    // Deals the 7 cards to the player
    for(let i = 0; i<7; i++) {
        // Choses a card
        const cardIndex = Math.floor(Math.random() * cards.length)
        const card = cards[cardIndex];

        // Adds the drawn card the the list
        cardsInCom1Hand.push(card)

        // Removes the drawn card from the deck
        removeDrawnCardFromDeck(card)
    }

    // console.log("Com 1's hand")
    // console.table(cardsInCom1Hand)
}

// Choses a card to play and plays the card
const choseAndPlayCardForCom1 = () => {
    // Choses a card to play from com 1's hand
    const cardToPlay = cardsInCom1Hand[Math.floor(Math.random() * cardsInCom1Hand.length)]

    // console.log(`Com 1 card to play: ${cardToPlay}`)

    // Removes the played card from com 1's hand
    const cardIndex = cardsInCom1Hand.indexOf(cardToPlay)
    cardsInCom1Hand.splice(cardIndex, 1)

    // Sets a pause 
    setTimeout(() => {
        // Dose nothing here
    }, 2000);

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {

        let hasCatCard = false

        // Checks if there is a matching cat card
        for(const card of cardsInCom1Hand) {
            // Matching card
            if(cardToPlay === card) {
                // Removes the matching card from com 1's hand
                const cardIndex = cardsInCom1Hand.indexOf(card)
                cardsInCom1Hand.splice(cardIndex, 1)

                const cardToSteal = cardsInCom1Hand[Math.floor(Math.random() * cardsInCom1Hand.length)]

                // Steals a card and adds it to com 1's hand
                addNewCardToHand(cardToSteal)

                hasCatCard = true

                $("#current_player_turn").html(`Com 1 has stolen your ${cardToSteal}`)

                break
            }
        }

        // Checks if there are no matching 
        if(hasCatCard == false) {
            // Readds the played card back into com 1's hand
            cardsInCom1Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseAndPlayCardForCom1()
        }

        // Draws a card
        drawCardForCom1()
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            $("#current_player_turn").html("Com 1 has skipped there turn. It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            updateVariable("isPlayerTurn", true)
            updateVariable("turnsNeedToPlay")

            $("#current_player_turn").html("Com 1 has played an attack card. You now 2 turns")

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            $("#current_player_turn").html("Com 1 has played a shuffle card")

            // Draws the card
            drawCardForCom1()

            break
        case "see the future":
            $("#current_player_turn").html("Com 1 has played a see the future card")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            // Draws the card
            drawCardForCom1()

            break
        case "favor":
            $("#current_player_turn").html("Com 1 has played a favor card")
            
            // Adds the new favor card to com 1's hand
            addNewCardToHand(cardsInCom1Hand[Math.floor(Math.random() * cardsInCom1Hand.length)])

            // Draws the card
            drawCardForCom1()

            break
    }

    // Checks if a nope was played to re-choose 
    if(cardToPlay === "nope") {
        // Readds the played card back into com 1's hand
        cardsInCom1Hand.push(cardToPlay)

        // Re-chooses a card to play
        choseAndPlayCardForCom1()
    }
}

// Draws a card to com 1
const drawCardForCom1 = () => {

    // Choses a card
    const cardIndex = Math.floor(Math.random() * cards.length)
    const card = cards[cardIndex];

    // Adds the drawn card the the list
    cardsInCom1Hand.push(card)

    // Removes the drawn card from the deck
    removeDrawnCardFromDeck(card)

    // Checks if there are 2 selected computer players
    const comAmount = localStorage.getItem("comAmount")

    if(comAmount === "2comPlayer" || comAmount === "3comPlayer") {
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

// Adds a card gotten from a favor or by playing 2 cat cards to com 1's hand
const addNewCardToHand = (cardToAdd: string) => {
    console.log(`Com 1's new card is ${cardToAdd}`)

    // Adds the new card to the hand
    cardsInCom1Hand.push(cardToAdd)
}

// Exports as a module 
export {
    dealCardsToCom1,
    choseAndPlayCardForCom1,
    cardsInCom1Hand
}
