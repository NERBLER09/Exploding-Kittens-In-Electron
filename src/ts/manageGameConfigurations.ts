import { displayMessageBox } from "./messageBox.js";
import { comPlayerAmount, username } from "./titleScreen.js"

const electron = require('electron')
const {ipcRenderer} = electron;

/** Checks if a username and com player amount is saved */
const checkIfGameDataIsSaved = (): boolean => {
    const isGameDataSaved = localStorage.getItem("isGameDataSaved")
    
    if(isGameDataSaved) {
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
        <p>This will save the username you inputted and how many computer players you want to have,
            so you don't have to input your selection the next time you play.
        </p>
        <p>If you want to change your game configuration go to: Game -> Update Game Config</p>
        <button id="save-config">Save Your Game Configuration</button>
        <button id="ignore-save-config">Don't Save Your Game Configuration</button>
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

/** Displays a prompt to update the game config */
const updateGameConfig = () => {
    const messageBoxElement = `
        <h2>What game configurations do you want to change?</h2>
        <p>Username: </p>
        <input type="text" placeholder="New username" id="new-usrnameInput">
        <p>Computer player amount</p>
        <input type="radio" value="1comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">1 Computer Player</label>
        <input type="radio" value="2comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">2 Computer Players</label>
        <input type="radio" value="3comPlayer" name="comPlayer" class="update-comSelection">
        <label for="1comPlayer">3 Computer Players</label>
        <div class="update-game-config-container">
            <button id="update-game-config-button">Update Game Config</button>
            <button id="cancel-update-game-config">Cancel</button>
        </div>
    `

    $("#message_box").append(messageBoxElement)
    $("#cancel-update-game-config").click(() => {
        $("#message_box").html("")
        $("#message_box").hide()
    })
    $("#update-game-config-button").click(handleGameConfigUpdate)
}

const handleGameConfigUpdate = () => {
    const newComAmount:any = $(".update-comSelection[type='radio']:checked").val()
    const newUsername:any = $("#new-usrnameInput").val()

    localStorage.setItem("username", newUsername)
    localStorage.setItem("comAmount", newComAmount)
    localStorage.setItem("isGameDataSaved", "true")

    $("#message_box").html("")
    $("#message_box").hide()

    displayMessageBox("Updated game config", "You have updated you game config. If you want the changes to take affect you'll need to start a new game")
}

ipcRenderer.on("updateGameConfig", () => {
    updateGameConfig()
    $("#message_box").show()
})

export {
    checkIfGameDataIsSaved,
    askToSaveGameConfigs
}