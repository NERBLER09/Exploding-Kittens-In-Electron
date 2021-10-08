import { catCard } from "../../models/cards.interface.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { catCardPlayed } from "../com1Player/favorAndCatCardFor1.js"
import { choseCardForCom3 } from "../com3Player/playCardCom3.js"
import { com2Player } from "../comPlayerClass.js"
import { drawCardForCom2 } from "./drawCardForCom2.js"
import { askCardForFavorForCom2 } from "./favorAndCatCard.js"

const choseCardForCom2 = () => {
    com2Player.chooseCardToPlay(playCardForCom2, drawCardForCom2)
}

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon", "feral cat"]

// Choses a card to play and plays the card
const playCardForCom2 = (cardToPlay) => {
    let comAmount = localStorage.getItem("comAmount")

    // Checks if a cat card was played
    if(catCard.includes(cardToPlay)) {
        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch(cardToPlay) {
        case "skip":            
            // Checks if there are 3 com player to pass turn to the right player
            if(localStorage.getItem("comAmount") === "3comPlayer") {
                com2Player.playSkipCard(true, "Com 3", choseCardForCom3) 
            }
            else {
                com2Player.playSkipCard(false)
            }

            break
        case "attack":
            // Checks if there are 2 or more com players (So it doesn't target the player)

            // There are 2 or more com players
            comAmount = localStorage.getItem("comAmount")

            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "2comPlayer") {
                com2Player.playAttackCard(false)
            }
            // More then 1 com player
            else {
                com2Player.playAttackCard(true, "Com 3", choseCardForCom3)
            }

            break
        case "shuffle":
            com2Player.playShuffleCard(drawCardForCom2, choseCardForCom2)

            break
        case "see the future":
            com2Player.playSeeTheFutureCard(drawCardForCom2, choseCardForCom2)

            break
        case "favor":
            com2Player.playFavorCard(askCardForFavorForCom2, drawCardForCom2)

            break

        case "nope":
            console.error("No cards to nope (Com 2)")

            // Readds the played card back into com 2's hand
            com2Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
        
        case "defuse":
            console.error("No cards to defuse (Com 2)")

            // Re-chooses card to play

            // Readds the played card back into com 2's hand
            com2Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom2()
            
            break

        // Cards from the Imploding Kittens expansion pack
        case "draw from the bottom":
            updateDiscardPile("draw from the bottom")
 
            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "2comPlayer") {
                com2Player.drawCardForComPlayer(false, "Com 2 has drawn from the button of the deck",null, choseCardForCom2)
            }

            // More then 1 com player
            else {
                com2Player.drawCardForComPlayer(true, "Com 2 has drawn from the button of the deck", choseCardForCom2, choseCardForCom3, "Com 2")
            }    

            break
        case "alter the future":
            com2Player.playAlterTheFutureCard(drawCardForCom2, choseCardForCom2)

            break
        case "targeted attack":
            if(comAmount === "2comPlayer") {
                com2Player.playTargetedAttackCard(3)
            }
            else if(comAmount === "3comPlayer") {
                com2Player.playTargetedAttackCard(4)
            }

            break
    }
}
export { choseCardForCom2 }
