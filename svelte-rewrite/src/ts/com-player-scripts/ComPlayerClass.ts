import { get } from "svelte/store"
import { cards, remainingTurns } from "../../data/GameData"
import { isPlayerTurn } from "../../data/PlayerData"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

class comPlayerClass {
    private comPlayerName: "Com 1" | "Com 2" | "Com 3"
    public cards: string[] = []

    constructor(comPlayerName: "Com 1" | "Com 2" | "Com 3") {
        this.comPlayerName = comPlayerName
    }

    drawCard(passTurn: boolean = true) {
        const card = get(cards)[Math.floor(Math.random() * get(cards).length)]
        this.cards.push(card)

        if(passTurn && get(remainingTurns) < 2) {
            setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has drawn a card it's now your turn`, "Play on", this.passTurnToNextPlayer)
            showMessageBox.set(true)
        }
        else if(passTurn && get(remainingTurns) > 0) {
            let turns = get(remainingTurns)
            turns--
            remainingTurns.set(turns)

            showMessageBox.set(true)
            setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has ${get(remainingTurns)} ${get(remainingTurns) > 1 ? "turns" : "turn"} remaining.`, "Play on", this.haveAnotherTurn)
        }
    }

    passTurnToNextPlayer() {
        isPlayerTurn.set(true)
    }

    haveAnotherTurn() {
        com1Player.playCard()
    }

    playCard() {
        const card = get(cards)[Math.floor(Math.random() * get(cards).length)]
        this.cards.splice(this.cards.indexOf(card), 1)

        switch (card) {
            case "attack":
                console.log("Playing an attack card")
                break;
            case "skip":
                console.log("Playing a skip card")
                break
            case "favor":
                console.log("Playing a favor card")
                break
            case "shuffle":
                console.log("Playing a shuffle card")
                break
            case "see the future":
                console.log("Playing a see the future card")
                break
            default:
                break;
        }
        
        this.drawCard()
    }
}

const com1Player = new comPlayerClass("Com 1")

export {
    com1Player
}