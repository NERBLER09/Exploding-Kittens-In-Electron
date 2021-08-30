import { removeDrawnCardFromDeck } from "../gameFunctions.js";
import { cards } from "../messages.js";
import { card, catCard } from "../models/cards.interface";
import { checkForMatchingCatCards } from "./checkForMatchingCatCards.js";

interface comPlayerInterface {
    hand: card[],
    checkForPlayableCard: Function,
    dealInitialHand: Function
}

const playableCards = ['attack',
'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon"]


/** Class holds reusable functions from the com players  */
class comPlayerClass implements comPlayerInterface {
    hand = []

    checkForPlayableCard(card: any) {
        for(const e of this.hand) {
            if(playableCards.includes(e) && e === card) {
                if(catCard.includes(card) && e === card) {
                    // If a com player wants to steal a card checks if there are 2 matching cat cards
                    if(checkForMatchingCatCards(this.hand, card)) {
                        return true
                    }
                    else return false
                }
                return true
            }
        }
        return false
    }

    dealInitialHand() {
        // Deals the 7 cards to the player
        for (let i = 0; i < 7; i++) {
            // Choses a card
            const cardIndex = Math.floor(Math.random() * cards.length)
            const card = cards[cardIndex];

            // Adds the drawn card the the list
            this.hand.push(card)

            // Removes the drawn card from the deck
            removeDrawnCardFromDeck(card)
        }

        // Deals the defuse card to com 1 
        this.hand.push("defuse")

        // Removes the defuse card from the 
        removeDrawnCardFromDeck("defuse")

    }
}

const com1Player = new comPlayerClass()
const com2Player = new comPlayerClass()
const com3Player = new comPlayerClass()

export {
    com1Player,
    com2Player,
    com3Player
}