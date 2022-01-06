import { get } from "svelte/store"
import { cards } from "../../data/GameData"
import { isPlayerTurn, playerHand } from "../../data/PlayerData"
import { com1Player } from "../com-player-scripts/ComPlayerClass"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

/**
 * Draws a card for the player
 */
const drawCard = (passTurn: boolean = true) => {
    const card = get(cards)[Math.floor(Math.random() * get(cards).length)]

    playerHand.update(value => [card, ...value])

    if(passTurn) {
        isPlayerTurn.set(false)
        // TODO: Implement function to pass turn to Com 1
        setDefaultMessageBoxProps("Drawn Card", `The card you have drawn is a ${card}. It's now Com 1's turn`, "Play on", passTurnToComPlayer)
        showMessageBox.set(true)
    }
}

const passTurnToComPlayer = () => {
    com1Player.playCard()
}

export {
    drawCard
}