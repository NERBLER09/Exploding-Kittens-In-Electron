import { get } from "svelte/store";
import { playerHand } from "../../data/PlayerData";

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
            console.log("Playing an attack card")
            break;
        case "skip":
            console.log("Playing a skip card")
            break
        case "favor":
            console.log("Playing a favor card")
            break
        case "shuffle":
            console.log("Playing a shuffle card")
            break
        case "see the future":
            console.log("Playing a see the future card")
            break
    
        default:
            break;
    }
}

export {
    playCard
}