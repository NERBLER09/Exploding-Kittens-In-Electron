import { get } from "svelte/store"
import { cards, seeTheFutureCards } from "../../data/GameData"

const setSeeTheFutureCards = (amount: number = 3) => {
    const cardsList: string[] = []
    for(let i = 0; i < amount; i++) {
        const card = cards[Math.floor(Math.random() * cards.length)]
        cardsList.push(card)
    }
    seeTheFutureCards.set(cardsList) 
}

export {
    setSeeTheFutureCards
}