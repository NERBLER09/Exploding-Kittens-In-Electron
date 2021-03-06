import { removeDrawnCardFromDeck } from "../gameFunctions.js";
import { cards } from "../messages.js";
import { cardsInCom1Hand } from "./com1/drawCardForCom1.js";
import { cardsInCom2Hand } from "./com2/drawCardForCom2.js";
import { cardsInCom3Hand } from "./com3/drawCardForCom3.js";

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

export {
    dealCardsToCom1,
    dealCardsToCom2,
    dealCardsToCom3
}