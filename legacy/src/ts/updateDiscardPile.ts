import { card } from "./models/cards.interface";

const path = require('path');

let lastPlayedCard: card

/** Updates the discard pile to the played card */
const updateDiscardPile = (card: card) => {
    const formattedCard = card.split(" ").join("-")
    const cardPath = path.join(__dirname, `../assets/cards/${formattedCard}.svg`)

    $("#discard-pile-img").attr("src", cardPath)
    lastPlayedCard=card
}

export { 
    updateDiscardPile,
    lastPlayedCard
}