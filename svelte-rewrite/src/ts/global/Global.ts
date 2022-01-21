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

export {
    passTurn,
    removeFromSeeTheFutureCards,
    removeDrawnCard
}