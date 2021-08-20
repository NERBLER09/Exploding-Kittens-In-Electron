import { card } from "../models/cards.interface"

const goodCards: card[] = ["attack","defuse","see the future","skip", "nope"]

/** Checks if a com player is giving a way a good card.
 * 
 * eg, defuse, skip, attack, or see the future
*/
const checkIfGivingAWayAGoodCard = (cardToGive: card): boolean => {
    console.log(goodCards.includes(cardToGive))
    if(goodCards.indexOf(cardToGive) === 1) {
        return false
    }
    else {
        return true
    }
}

/** Choses a card to give as a favor when the player plays a */
const decideCardToGiveAsFavor = (comPlayerHand: card[]) => {
    // Choses a random card 
    const cardIndex = Math.floor(Math.random() * comPlayerHand.length)
    const cardToGive = comPlayerHand[cardIndex]

    if(checkIfGivingAWayAGoodCard(cardToGive)) return cardToGive 
    else decideCardToGiveAsFavor(comPlayerHand)
}

export { decideCardToGiveAsFavor }