import { card } from "./models/cards.interface"

/** Checks if the passed hand has any cards that it can play
 * Used to prevent an infinite loop
 */

const playableCards = ['nope', 'attack',
'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']


const checkForPlayableCard = (hand: card[], cardToPlay: card): boolean => {
    console.log("Card to play: " + cardToPlay)

    for(const e of hand) {
        console.log(e)
        if(playableCards.includes(e) && e === cardToPlay) {
            console.log("Playable card: " + e)

            return true
        }
    }

    console.log("No playable cards")
    return false
}

export { checkForPlayableCard }