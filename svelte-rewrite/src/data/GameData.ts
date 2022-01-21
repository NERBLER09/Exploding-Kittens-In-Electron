import { Writable, writable } from "svelte/store"

const showGameScreen = writable(JSON.parse(sessionStorage.getItem("showGameWindow")))

const username =  writable(localStorage.getItem("username")) 
const comPlayer = writable(localStorage.getItem("comPlayerAmount") || "1-com-player")

const cards = ['nope', 'attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

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

const totalCards = writable(0)

const previousPlayedCard = writable("")

const seeTheFutureCards: Writable<string[]> = writable([])

const remainingTurns = writable(0)

const stealOrAskForCard: Writable<"steal" | "favor"> = writable()

export {
    username,
    comPlayer,
    showGameScreen,
    cards,
    remainingTurns,
    seeTheFutureCards,
    stealOrAskForCard,
    previousPlayedCard,
    cardAmounts,
    totalCards
}
