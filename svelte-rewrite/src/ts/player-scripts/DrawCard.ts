import { get } from "svelte/store"
import { cards, remainingTurns, seeTheFutureCards } from "../../data/GameData"
import { isPlayerTurn, playerHand } from "../../data/PlayerData"
import { com1Player } from "../com-player-scripts/ComPlayerClass"
import { removeFromSeeTheFutureCards } from "../global/Global"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

/**
 * Draws a card for the player
 */
const drawCard = (passTurn: boolean = true) => {
    let card = get(cards)[Math.floor(Math.random() * get(cards).length)]

    if(get(seeTheFutureCards).length > 0) {
        card = get(seeTheFutureCards)[0]
        removeFromSeeTheFutureCards()
    }

    playerHand.update(value => [card, ...value])

    if(passTurn && get(remainingTurns) < 2) {
        isPlayerTurn.set(false)
        remainingTurns.set(0)

        setDefaultMessageBoxProps("Drawn Card", `The card you have drawn is a ${card}. It's now Com 1's turn`, "Play on", passTurnToComPlayer)
        showMessageBox.set(true)
    }
    else if(passTurn && get(remainingTurns) > 0) {
        let turns = get(remainingTurns)
        turns--
        remainingTurns.set(turns)

        showMessageBox.set(true)
        setDefaultMessageBoxProps("Drawn Card", `The card you have drawn is a ${card}. You have ${get(remainingTurns)} ${get(remainingTurns) > 1 ? "turns" : "turn"} remaining.`)
    }
}

const passTurnToComPlayer = () => {
    com1Player.playCard()
}

export {
    drawCard
}