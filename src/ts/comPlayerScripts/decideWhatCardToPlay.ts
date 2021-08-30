import { checkForPlayableCard } from "../checkForAnyPlayableCards";
import { card } from "../models/cards.interface";

/** 
 * Takes the amount of card is the com player hand and creates a random number of the amount of cards it should play.
 * @param comPlayerHand - The com players hand
 */
const decideAmountOfCardsToPlay = (comPlayerHand: card[]): card[] => {
    const playableCards: card[] = []

    const cardAmountToPlay = Math.floor(Math.random() * comPlayerHand.length)

    for(let i = 0; i > cardAmountToPlay; i++) {
        if(checkForPlayableCard(comPlayerHand, comPlayerHand[i])) {
            playableCards.push(comPlayerHand[i])
        }
    }
    return playableCards
}

/** Decides is to play a card or draw a card, and how many cards to play
 * @param comPlayerHand - The com players hand
 */
const decideWhatCardToPlay = (comPlayerHand: card[]): card => {
    // Choses a card to play from com 1's hand
    const cardToPlay: card = comPlayerHand[Math.floor(Math.random() * comPlayerHand.length)]
    // Removes the played card from com 1's hand
    const cardIndex = comPlayerHand.indexOf(cardToPlay)
    

    console.log(decideAmountOfCardsToPlay(comPlayerHand))

    /** Checks if `cardToPlay` is playable */
    if(checkForPlayableCard(comPlayerHand, cardToPlay)) {
        comPlayerHand.splice(cardIndex, 1)
        return cardToPlay
    }
}

export { decideWhatCardToPlay }