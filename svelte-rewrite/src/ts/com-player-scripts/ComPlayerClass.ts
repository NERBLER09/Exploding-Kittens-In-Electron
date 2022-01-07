import { get } from "svelte/store"
import { cards, remainingTurns, seeTheFutureCards } from "../../data/GameData"
import { isPlayerTurn } from "../../data/PlayerData"
import { setSeeTheFutureCards } from "../global/CardFunction"
import { removeFromSeeTheFutureCards } from "../global/Global"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

class comPlayerClass {
    private comPlayerName: "Com 1" | "Com 2" | "Com 3"
    public cards: string[] = []

    constructor(comPlayerName: "Com 1" | "Com 2" | "Com 3") {
        this.comPlayerName = comPlayerName
    }

    drawCard(passTurn: boolean = true) {
        let card = get(cards)[Math.floor(Math.random() * get(cards).length)]
        this.cards.push(card)
        
        if(get(seeTheFutureCards).length > 0) {
            card = get(seeTheFutureCards)[0]
            removeFromSeeTheFutureCards()
        }

        if(passTurn && get(remainingTurns) < 2) {
            setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has drawn a card it's now your turn`, "Play on", this.passTurnToNextPlayer)
            showMessageBox.set(true)
            remainingTurns.set(0)
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

    runDrawCard() {
        com1Player.drawCard()
    }

    playCard() {
        const card = get(cards)[Math.floor(Math.random() * get(cards).length)]
        this.cards.splice(this.cards.indexOf(card), 1)

        switch (card) {
            case "attack":
                this.playAttackCard()
                return
            case "skip":
                setDefaultMessageBoxProps(`${this.comPlayerName} has skipped their turn`, "It is now your turn.")
                this.passTurnToNextPlayer()
                return
            case "favor":
                this.drawCard()
                break
            case "shuffle":
                setDefaultMessageBoxProps(`${this.comPlayerName} has shuffled the deck`, `${this.comPlayerName} has shuffled the deck`, "Play on", this.runDrawCard)     
                showMessageBox.set(true)
                break
            case "see the future":
                setSeeTheFutureCards()
                setDefaultMessageBoxProps(`${this.comPlayerName} has played a see the future`, `${this.comPlayerName} has played a see the future`, "Play on", this.runDrawCard)
                showMessageBox.set(true)
                break
            default:
                break;
        }
    }

    private playAttackCard() {
        let turns = get(remainingTurns)
        turns = turns + 2
        remainingTurns.set(turns)

        setDefaultMessageBoxProps(`${this.comPlayerName} has attacked you!`, `You have ${get(remainingTurns)} turns you have to play`, "Play on", this.passTurnToNextPlayer)
    }
}

const com1Player = new comPlayerClass("Com 1")

export {
    com1Player
}