const $ = require("jquery")

import { cards } from "./messages.js"
import { removeDrawnCardFromDeck, turnsNeedToPlay, updateVariable } from "./gameFunctions.js";

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
        let hasCatCard = false

        // Checks if there is a matching cat card
        for(const card of cardsInCom3Hand) {
            // Matching card
            if(cardToPlay === card) {
                // Removes the matching card from com 3's hand
                const cardIndex = cardsInCom3Hand.indexOf(card)
                cardsInCom3Hand.splice(cardIndex, 1)

                const cardToSteal = cardsInCom3Hand[Math.floor(Math.random() * cardsInCom3Hand.length)]

                // Steals a card and adds it to com 3's hand
                addNewCardToHand(cardToSteal)

                hasCatCard = true

                $("#current_player_turn").html(`Com 3 has stolen your ${cardToSteal}`)

                break
            }
        }

        // Checks if there are no matching 
        if(hasCatCard == false) {
            // Readds the played card back into com 3's hand
            cardsInCom3Hand.push(cardToPlay)

            // Re-chooses a card to play
            choseAndPlayCardForCom3()
        }

        // Draws a card
        drawCard()
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            $("#current_player_turn").html("Com 3 has skipped there turn. It's now your turn.")

            // Makes it be the players turn
            updateVariable("isPlayerTurn", true)

            break
        case "attack":
            updateVariable("isPlayerTurn", true)
            updateVariable("turnsNeedToPlay")

            $("#current_player_turn").html("Com 3 has played an attack card. You now 3 turns")

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            $("#current_player_turn").html("Com 3 has played a shuffle card")

            // Draws the card
            drawCard()

            break
        case "see the future":
            $("#current_player_turn").html("Com 3 has played a see the future card")

            // Choses the top three cards
            updateVariable("seeTheFutureCards")

            // Draws the card
            drawCard()

            break
        case "favor":
            $("#current_player_turn").html("Com 3 has played a favor card")
            
            // Adds the new favor card to com 3's hand
            addNewCardToHand(cardsInCom3Hand[Math.floor(Math.random() * cardsInCom3Hand.length)])

            // Draws the card
            drawCard()

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
const drawCard = () => {
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

export {
    dealCardsToCom3,
    choseAndPlayCardForCom3,
    cardsInCom3Hand
}
