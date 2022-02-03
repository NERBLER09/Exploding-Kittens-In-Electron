import { get } from "svelte/store"
import { cardAmounts, cards, seeTheFutureCards, totalCards } from "../../data/GameData"
import { com1Player } from "../com-player-scripts/ComPlayerClass"

const passTurn = (passTurnToNextPlayer: boolean =  true) => {
    com1Player.playCard()
}

const removeFromSeeTheFutureCards = () => {
    const cards = get(seeTheFutureCards)
    cards.splice(0, 1)
    seeTheFutureCards.set(cards)
}

const removeDrawnCard = (card) => {
    cardAmounts[card] -= 1

    if(cardAmounts[card] === 0) {
        cards.splice(cards.indexOf(card), 1)
    }

    totalCards.set(0)
    for(const item of cards) {
        let amountOfCards = get(totalCards)
        amountOfCards += cardAmounts[item]
        totalCards.set(amountOfCards)
    }
}

/**
 * Checks if there is a defuse card in the pass hand
 * @param hand Takes the hand of the player
 * @returns Returns if there is a defuse card in the passed hand
 */
const hasDefuseCard = (hand: string[]): boolean => {
    for(const card of hand) {
        if(card === "defuse") {
            return true 
        }
    }
    return false
}

/** 
 * Starts a new game by refreshing the window
 */
const startNewGame =  () => {
    location.reload()
}

export {
    passTurn,
    removeFromSeeTheFutureCards,
    removeDrawnCard,
    hasDefuseCard,
    startNewGame
}