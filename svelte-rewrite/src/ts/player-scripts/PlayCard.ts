import { get } from "svelte/store";
import { remainingTurns, seeTheFutureCards } from "../../data/GameData";
import { isPlayerTurn, playerHand } from "../../data/PlayerData";
import { setSeeTheFutureCards } from "../global/CardFunction";
import { passTurn } from "../global/Global";
import { setDefaultMessageBoxProps, showMessageBox, showSeeTheFutureMessageBox } from "../global/MessageBox";

/**
 * Plays a card for the player
 * @param card Takes the card the player wants to play
 */
const playCard = (card) => {
    // Removes the played card from the players hand
    const playerHandList = get(playerHand)
    playerHandList.splice(playerHandList.indexOf(card), 1)
    playerHand.set(playerHandList)
    
    switch (card) {
        case "attack":
            let turns = get(remainingTurns)
            turns = turns + 2
            remainingTurns.set(turns)
            
            setDefaultMessageBoxProps("Attack!", `You have attacked Com 1. Com 1 has ${turns}, it's now Com 1's turns.`, "Attack", passTurn)
            showMessageBox.set(true)

            break;
        case "skip":
            setDefaultMessageBoxProps("Skip.", "You have skipped your turn", "Skip your turn", passTurn)
            showMessageBox.set(true)

            break
        case "favor":
            console.log("Playing a favor card")
            break
        case "shuffle":
            setDefaultMessageBoxProps("Shuffle", "You have shuffled the deck", "Shuffle")
            showMessageBox.set(true)

            break
        case "see the future":
            setSeeTheFutureCards()
            showSeeTheFutureMessageBox.set(true)
            showMessageBox.set(true)
            setDefaultMessageBoxProps("See The Future", `Here are the top ${get(seeTheFutureCards).length} cards`, "Hide the cards")
            break
    
        default:
            break;
    }
}

export {
    playCard
}