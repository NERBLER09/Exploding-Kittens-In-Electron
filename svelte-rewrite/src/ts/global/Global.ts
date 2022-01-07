import { com1Player } from "../com-player-scripts/ComPlayerClass"

const passTurn = (passTurnToNextPlayer: boolean =  true) => {
    com1Player.playCard()
}

export {
    passTurn
}