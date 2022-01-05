import { writable } from "svelte/store";

const playerHand = writable([])
const isPlayerTurn = writable(true)

export {
    playerHand,
    isPlayerTurn
}