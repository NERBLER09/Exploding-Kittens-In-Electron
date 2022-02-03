import { get } from "svelte/store"
import { cardAmounts, cards, comPlayer, totalCards } from "../data/GameData"
import { playerHand } from "../data/PlayerData"
import { com1Player, com2Player, com3Player } from "./com-player-scripts/ComPlayerClass"

const addExplodingKittensToDeck = () => {
    let totalAmountOfExplodingKittens = 0

    switch(get(comPlayer)) {
        case "1-com-player":
            totalAmountOfExplodingKittens = 1
            break
        case "2-com-player":
            totalAmountOfExplodingKittens = 2 
            break
         case "3-com-player":
            totalAmountOfExplodingKittens = 3 
            break
    }

    cardAmounts["exploding kitten"] = totalAmountOfExplodingKittens 
    cards.push("exploding kitten")
}

const recalculateRemainingCards = () => {
    totalCards.set(0)
    for(const item of cards) {
        let amountOfCards = get(totalCards)
        amountOfCards += cardAmounts[item]
        totalCards.set(amountOfCards)
    }
} 

const dealDefuseCards = () => {
    let totalDefuseCards = 6

    playerHand.update(value => [...value, "defuse"])
    totalDefuseCards--

    switch(get(comPlayer)) {
        case "1-com-player":
            com1Player.cards.push("defuse")

            totalDefuseCards--
            break
        case "2-com-player":
            com1Player.cards.push("defuse") 
            com2Player.cards.push("defuse") 
            
            totalDefuseCards=-2
            break
         case "3-com-player":
            com1Player.cards.push("defuse") 
            com2Player.cards.push("defuse") 
            com3Player.cards.push("defuse") 

            totalDefuseCards=-3
            break
    }

    cardAmounts["defuse"] = totalDefuseCards
    cards.push("defuse")
}

export {
    addExplodingKittensToDeck,
    recalculateRemainingCards,
    dealDefuseCards
}