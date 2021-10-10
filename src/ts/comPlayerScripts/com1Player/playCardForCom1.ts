import { turnsNeedToPlay } from "../../gameFunctions.js"
import { displayMessageBox } from "../../messageBox.js"
import { card } from "../../models/cards.interface.js"
import { updateDiscardPile } from "../../updateDiscardPile.js"
import { choseCardForCom2 } from "../com2Player/playCardCom2.js"
import { com1Player } from "../comPlayerClass.js"
import { drawCardForCom1 } from "./drawCardForCom1.js"
import { askCardForFavor, catCardPlayed } from "./favorAndCatCardFor1.js"

const choseCardForCom1 = () => {
    com1Player.chooseCardToPlay(playCard, drawCardForCom1)
}

// Choses a card to play and plays the card
const playCard = (cardToPlay: card) => {        
    const comAmount = localStorage.getItem("comAmount")
        
    // Checks if a cat card was played
    if (cardToPlay == 'potato cat' || cardToPlay == 'taco cat' || cardToPlay == 'rainbow ralphing cat' ||
        cardToPlay == 'beard cat' || cardToPlay == 'cattermellon' || cardToPlay === "feral cat") {

        // Checks if there's a matching cat card
        catCardPlayed(cardToPlay)
    }

    // Plays the card (Checks what card was played)
    switch (cardToPlay) {
        case "skip":
            if(turnsNeedToPlay === 1) {
                displayMessageBox("Com 1 has skipped 1 of their turns", `Com 1 has ${turnsNeedToPlay} more turn(s) to play. It's now Com 1's turn`)
                choseCardForCom1()
                break
            }

            // Checks if there are more then 1 com player to pass turn to the right player
            if (localStorage.getItem("comAmount") === "1comPlayer") {
                com1Player.playSkipCard(false)
            }
            else {
                com1Player.playSkipCard(true, "Com 2", choseCardForCom2) 
            }

            break
        case "attack":
            // Checks if there are 2 or more com players (So it doesn't target the player)

            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "1comPlayer") {
                com1Player.playAttackCard(false)
            }

            // More then 1 com player
            else {
                com1Player.playAttackCard(true, "Com 2", choseCardForCom2)
            }

            break
        case "shuffle":
            com1Player.playShuffleCard(drawCardForCom1, choseCardForCom1)    

            break
        case "see the future":
            com1Player.playSeeTheFutureCard(drawCardForCom1, choseCardForCom1)

            break
        case "favor":
            com1Player.playFavorCard(askCardForFavor, drawCardForCom1)

            break

        case "nope":
            console.error("No cards to nope (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            com1Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom1()

            break

        case "defuse":
            console.error("No cards to defuse (Com 1)")

            // Re-chooses card to play

            // Readds the played card back into com 1's hand
            com1Player.hand.push(cardToPlay)

            // Re-chooses a card to play
            choseCardForCom1()

            break

        // Cards from the Imploding Kittens expansion pack
        case "draw from the bottom":
            updateDiscardPile("draw from the bottom")

            // Checks how many com players are there

            // There is only 1 com player
            if (comAmount === "1comPlayer") {
                com1Player.drawCardForComPlayer(false, "Com 1 has drawn from the button of the deck",null, choseCardForCom1)
            }

            // More then 1 com player
            else {
                com1Player.drawCardForComPlayer(true, "Com 1 has drawn from the button of the deck", choseCardForCom2, choseCardForCom1, "Com 2")
            }    

            break
        case "alter the future":
            com1Player.playAlterTheFutureCard(drawCardForCom1, choseCardForCom1)
        
            break
        case "targeted attack":
            if(comAmount === "1comPlayer") {
                com1Player.playTargetedAttackCard(2)
            }
            else if(comAmount === "2comPlayer") {
                com1Player.playTargetedAttackCard(3)
            }
            else if(comAmount === "3comPlayer") {
                com1Player.playTargetedAttackCard(4)
            }

            break

        // Cards from the Streaking Kittens expansion pack
        case "super skip":
            // Checks if there are more then 1 com player to pass turn to the right player
            if (localStorage.getItem("comAmount") === "1comPlayer") {
                com1Player.playSuperSkipCard(false)
            }
            else {
                com1Player.playSuperSkipCard(true, "Com 2", choseCardForCom2) 
            }

            break

        case "catomic bomb":
            // Checks if there are more then 1 com player to pass turn to the right player
            if (localStorage.getItem("comAmount") === "1comPlayer") {
                com1Player.playCatomicBomb(false)
            }
            else {
                com1Player.playCatomicBomb(true, "Com 2", choseCardForCom2) 
            }

            break
        case "see the future x5":
            com1Player.playSeeTheFutureCard(drawCardForCom1, choseCardForCom1)

            break
    }
}

export { choseCardForCom1 as choseCard }