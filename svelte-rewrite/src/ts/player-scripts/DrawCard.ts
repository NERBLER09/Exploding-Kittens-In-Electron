import { get } from "svelte/store"
import { cards, remainingTurns, seeTheFutureCards } from "../../data/GameData"
import { isPlayerTurn, playerHand } from "../../data/PlayerData"
import { com1Player } from "../com-player-scripts/ComPlayerClass"
import { hasDefuseCard, removeDrawnCard, removeFromSeeTheFutureCards, startNewGame } from "../global/Global"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

/**
 * Draws a card for the player
 */
const drawCard = (passTurn: boolean = true) => {
    let card = cards[Math.floor(Math.random() * cards.length)]

    if(get(seeTheFutureCards).length > 0) {
        card = get(seeTheFutureCards)[0]
        removeFromSeeTheFutureCards()
    }
    
    if(card === "exploding kitten") {
        explodingKittenDrawn()
        return
    }

    playerHand.update(value => [card, ...value])
    removeDrawnCard(card)

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

/** 
 * Handles when the player draws an exploding kitten card
 */
const explodingKittenDrawn = () => {
    // TODO: Add drag and drop interface to defusing an exploding kitten
    // TODO: Allow player to re-add the exploding kitten card back to the deck
    const defuseCard = () => {
        const playerHandListTemp = get(playerHand)
        for(const card of playerHandListTemp) {
            if(card === "defuse") {
                const cardIndex = playerHandListTemp.indexOf(card)
                playerHandListTemp.splice(cardIndex, 1)
            }
        }

        setDefaultMessageBoxProps("Defused!", "You have defused the exploding kitten card it's now Com 1's turn", "Play on", passTurnToComPlayer)
    }

    isPlayerTurn.set(false)
    if(hasDefuseCard(get(playerHand))) {
        setDefaultMessageBoxProps("Exploding Kitten!", "You have drawn an exploding kitten.", "Defuse!", defuseCard)
    }
    else {
        setDefaultMessageBoxProps("Exploding Kitten Drawn", "You have exploded as you didn't have a defuse card to defuse the exploding kitten.", "Start A New Game", () => {startNewGame()})
    }
}

export {
    drawCard
}