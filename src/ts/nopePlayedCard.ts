import { displayMessageBox } from "./messageBox.js";
import { playerCardsInHand } from "./messages.js";
import { card } from "./models/cards.interface";
import { updateDiscardPile } from "./updateDiscardPile.js";

let isNopeCardPlayed = false

/** Checks if there is a nope card was played */
const checkIfNopeCardPlayed = (): boolean => {
    if(isNopeCardPlayed) return true

    else return false
}

/** Checks for a nope card in the player's hand */
const checkForNopeCardInHand = (): boolean => {
    for(const e of playerCardsInHand) {
        if(e === "nope")  { 
            const cardIndex = playerCardsInHand.indexOf("nope")

            // Removes the played card from the players hand 
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the played card from the player's view
            $(".player_cards").get(cardIndex).remove()
            
            return true     
        }
    }

    return false
}

/** Nopes a played card (card played from a com player) */
const nopePlayedCard = (card: card, comPlayer: "Com 1" | "Com 2" | "Com 3") => {
    const messageBoxPrompt = `
       <h2>${comPlayer} has played a ${card}.</h2>
       <p>Do you want to nope it?</p>
       <button id="nope-played-card-button">Nope ${comPlayer}'s ${card} card</button> 
       <button id="skip-nope-played-card-button">Don't Nope ${comPlayer}'s ${card} card</button> 
    `
    $("#message_box").append(messageBoxPrompt)
    $("#nope-played-card-button").click(() => {
        $("#message_box").hide()
        $("#message_box").html("")    
    
        if(checkForNopeCardInHand() === true) {
            isNopeCardPlayed = !isNopeCardPlayed

            updateDiscardPile("nope")

            displayMessageBox("NOPE!", `You have noped ${comPlayer}'s ${card} card`)
        }
        else {
            displayMessageBox("No nope card", "Sorry, but it looks like you have no nope cards in your hand.")
        }
    })
    $("#skip-nope-played-card-button").click(() => {
        $("#message_box").html("")
        displayMessageBox(`Okay... you can play your ${card} card`, `You have not noped ${comPlayer}'s ${card} card`)
    })
    $("#message_box").show()
}
export { nopePlayedCard, checkIfNopeCardPlayed }