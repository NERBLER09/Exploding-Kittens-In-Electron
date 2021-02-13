// Messages that might get displayed to the player
const messages = {
    "no_username": "You have to enter your username",
    "no_com_selected": "You have to selected how many computer players that you want",
    "no_username_no_com": "You haven't entered you username and haven't selected how many computer players that you want",
}

// Keeps track of how many of each cards are in the deck
const cardAmounts = {
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
}

// Creates a list containing the cards in the player hands
let playerCardsInHand = []

// Stores the cards in the deck
let cards = ['nope', 'attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

// Exports as module
export {
    cardAmounts,
    messages,
    cards,
    playerCardsInHand
}
