import { Writable, writable } from "svelte/store";

const playerHand = writable([])
const isPlayerTurn = writable(true)
const needGiveFavorCard = writable(false)

const favorTarget: Writable<"Com 1" | "Com 2" | "Com 3"> = writable()

export {
    playerHand,
    isPlayerTurn,
    needGiveFavorCard,
    favorTarget
}