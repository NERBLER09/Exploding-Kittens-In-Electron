import { checkForMatchingCatCards } from "./comPlayerScripts/checkForMatchingCatCards.js"
import { card, catCard } from "./models/cards.interface"

/** Checks if the passed hand has any cards that it can play
 * Used to prevent an infinite loop
 */

const playableCards = ['attack',
'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon"]

const checkForPlayableCard = (hand: card[], cardToPlay: any): boolean => {
    for(const e of hand) {
        if(playableCards.includes(e) && e === cardToPlay) {
            if(catCard.includes(cardToPlay) && e === cardToPlay) {
                // If a com player wants to steal a card checks if there are 2 matching cat cards
                if(checkForMatchingCatCards(hand, cardToPlay)) {
                    console.log("2 matching cat cards")
                    return true
                }
                else return false
            }
            return true
        }
    }
    return false
}

export { checkForPlayableCard }