import { card, cardAmounts } from "./models/cards.interface"

// Messages that might get displayed to the player
const messages = {
    "no_username": "You have not entered a username",
    "no_com_selected": "You have to selected how many computer players that you want",
    "no_username_no_com": "You haven't entered you username and haven't selected how many computer players that you want",
}

// Keeps track of how many of each cards are in the deck
const cardAmounts: cardAmounts = {
    'nope': 5,
    'attack': 4,
    'skip': 4,
    'favor': 4,
    'shuffle': 4,
    'see the future': 5,
    'potato cat': 5,
    'taco cat': 5,
    'rainbow ralphing cat': 5,
    'beard cat': 5,
    'cattermellon': 5,
    'diffuse': 6
}

// Creates a list containing the cards in the player hands
let playerCardsInHand = []

// Stores the cards in the deck
let cards: card[] = ['nope', 'attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

// Stores if a com player has played a favor and who played the favor
// Used when a com player asks a card from the player to give it to the right com player
const comPlayerPlayedFavor = {
    favorCardPlayed: false,
    comPlayerWhoPlayedFavor: null
}

// Exports as module
export {
    cardAmounts,
    messages,
    cards,
    playerCardsInHand,
    comPlayerPlayedFavor
}
