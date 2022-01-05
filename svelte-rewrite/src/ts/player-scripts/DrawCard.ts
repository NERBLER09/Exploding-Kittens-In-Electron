import { get } from "svelte/store"
import { cards } from "../../data/GameData"
import { isPlayerTurn, playerHand } from "../../data/PlayerData"

/**
 * Draws a card for the player
 */
const drawCard = (passTurn: boolean = true) => {
    const card = get(cards)[Math.floor(Math.random() * get(cards).length)]

    playerHand.update(value => [card, ...value])

    if(passTurn) {
        isPlayerTurn.set(false)
        // TODO: Implement function to pass turn to Com 1
    }
}

export {
    drawCard
}