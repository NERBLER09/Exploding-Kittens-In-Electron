const path = require('path');

/** Updates the discard pile to the played card */
const updateDiscardPile = (card: string) => {
    const formattedCard = card.split(" ").join("-")
    const cardPath = path.join(__dirname, `../assets/cards/${formattedCard}.png`)

    $("#discard-pile-img").attr("src", cardPath)
}

export { updateDiscardPile }