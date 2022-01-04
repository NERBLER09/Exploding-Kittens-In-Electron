import { writable } from "svelte/store"

const showGameScreen = writable(false)

const username =  writable(localStorage.getItem("username")) 
const comPlayer = writable(localStorage.getItem("comPlayerAmount"))

export {
    username,
    comPlayer,
    showGameScreen
}
