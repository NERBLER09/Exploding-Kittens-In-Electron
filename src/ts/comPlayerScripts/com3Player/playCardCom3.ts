import { askCardForFavor } from "../com3Player/favorAndCatCard.js"
import { catCardPlayedForCom2 } from "../com2Player/favorAndCatCard.js"
import { com3Player } from "../comPlayerClass.js"
import { drawCardForCom3 } from "./drawCardForCom3.js"

const choseCardForCom3 = () => {
    com3Player.chooseCardToPlay(playCardForCom3, drawCardForCom3)
}

// Choses a card to play and plays the card
const playCardForCom3 = (cardToPlay) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Checks if a cat card was played
    if(cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' || 
    cardToPlay == 'beard cat' || cardToPlay == 'cattermellon') {
        // Checks if there's a matching cat card
        catCardPlayedForCom2(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":
            com3Player.playSkipCard(false)

            break
        case "attack":
            // Makes the player have 2 turns
            com3Player.playAttackCard(false)

            break
        case "shuffle":
            com3Player.playShuffleCard(drawCardForCom3)

            break
        case "see the future":
            com3Player.playSeeTheFutureCard(drawCardForCom3)

            break
        case "favor":
            com3Player.playFavorCard(askCardForFavor, drawCardForCom3)

            break

        case "nope":
            // Re-chooses the card to play

            // Readds the played card back into com 3's hand
            com3Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
        case "defuse":
            console.error("No cards to defuse (Com 3)")

            // Re-chooses card to play

            // Readds the played card back into com 3's hand
            com3Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom3()
            
            break
    }
}
export { choseCardForCom3 }
