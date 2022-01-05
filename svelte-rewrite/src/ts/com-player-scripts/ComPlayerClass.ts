import { get } from "svelte/store"
import { cards } from "../../data/GameData"

class comPlayerClass {
    private comPlayerName: "Com 1" | "Com 2" | "Com 3"
    public cards: string[] = []

    constructor(comPlayerName: "Com 1" | "Com 2" | "Com 3") {
        this.comPlayerName = comPlayerName
    }

    drawCard(passTurn: boolean = true) {
        const card = get(cards)[Math.floor(Math.random() * get(cards).length)]
        this.cards.push(card)
    }
}

const com1Player = new comPlayerClass("Com 1")

export {
    com1Player
}