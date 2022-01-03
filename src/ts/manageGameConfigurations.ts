import { comPlayerAmount, username } from "./titleScreen.js"

const electron = require('electron')
const {ipcRenderer} = electron;

/** Checks if a username and com player amount is saved */
const checkIfGameDataIsSaved = (): boolean => {
    const isGameDataSaved = localStorage.getItem("isGameDataSaved")
    
    if(isGameDataSaved !== null) {
        return true
    }
    else return false
}

/** Asks the user is they want to save there game config
 * ie, username and com player amount
 */
const askToSaveGameConfigs = () => {
    const messageBoxElement = `
        <h2>Would you like to save your game configuration</h2>
        <p>By saving your game configuration you will not have to enter a username and the amount of computer players you want to play with. </p>
        <p>If you want to change your game configuration go to: Game -> Update Game Config</p>
        <button id="save-config">Save Game Configuration</button>
        <button id="ignore-save-config">Don't Save Game Configuration</button>
    `
    $("#message_box").append(messageBoxElement)
    $("#save-config").click(handleSaveGameConfig)
    $("#ignore-save-config").click(() => ipcRenderer.send("createGameWindow"))
    $("#message_box").show()
}

/** Saves all the game configuration */
const handleSaveGameConfig = () => {
    $("#message_box").html()
    $("#message_box").hide()

    localStorage.setItem("isGameDataSaved", "true")
    localStorage.setItem("username", username)
    localStorage.setItem("comAmount", comPlayerAmount)

    ipcRenderer.send("createGameWindow")
}

export {
    checkIfGameDataIsSaved,
    askToSaveGameConfigs
}