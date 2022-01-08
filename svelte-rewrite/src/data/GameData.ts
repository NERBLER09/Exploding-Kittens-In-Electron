import { Writable, writable } from "svelte/store"

const showGameScreen = writable(JSON.parse(sessionStorage.getItem("showGameWindow")))

const username =  writable(localStorage.getItem("username")) 
const comPlayer = writable(localStorage.getItem("comPlayerAmount") || "1-com-player")

const cards = writable(['nope', 'attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon'])

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
    stealOrAskForCard
}
