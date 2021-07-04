import { playerCardsInHand } from "../messages.js"
import { playCard } from "./playCard.js";
const path = require('path');

/** Displays the card to the player.
 * Runs when dealing to the player,
 * and when getting a card by player a favor card 
 * or by stealing a card from com 1, com 2, or com 3 
 */
const displayCardToPlayer = (displayCard) => {
    let cardHyphened = displayCard.split(" ").join("-")

    let card = $(`<button class="player_cards" value="${displayCard}"/b>
        <img src="${path.join(__dirname, `../assets/cards/${cardHyphened}.png`)}" class="player-card-img" >
        </button>`)

    // Adds the drawn card the the list
    playerCardsInHand.push(displayCard)

    // Adds onclick function
    $(card).click({param1: $(card).val()}, playCard)

    // Displays the card 
    $("#player_cards_container").append(card)
}

export {
    displayCardToPlayer
}