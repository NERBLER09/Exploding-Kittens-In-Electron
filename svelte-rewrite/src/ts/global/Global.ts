import { get } from "svelte/store"
import { seeTheFutureCards } from "../../data/GameData"
import { com1Player } from "../com-player-scripts/ComPlayerClass"

const passTurn = (passTurnToNextPlayer: boolean =  true) => {
    com1Player.playCard()
}

const removeFromSeeTheFutureCards = () => {
    const cards = get(seeTheFutureCards)
    cards.splice(0, 1)
    seeTheFutureCards.set(cards)
}

export {
    passTurn,
    removeFromSeeTheFutureCards
}