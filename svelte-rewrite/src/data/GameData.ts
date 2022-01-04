import { writable } from "svelte/store"

const username =  writable(localStorage.getItem("username")) 
const comPlayer = writable(localStorage.getItem("comPlayerAmount"))

export {
    username,
    comPlayer
}
