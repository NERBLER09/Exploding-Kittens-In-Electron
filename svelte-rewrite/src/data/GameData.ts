import { writable } from "svelte/store"

const showGameScreen = writable(JSON.parse(sessionStorage.getItem("showGameWindow")))

const username =  writable(localStorage.getItem("username")) 
const comPlayer = writable(localStorage.getItem("comPlayerAmount"))

const cards = writable(['nope', 'attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon'])

export {
    username,
    comPlayer,
    showGameScreen,
    cards
}
