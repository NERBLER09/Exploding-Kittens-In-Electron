import { displayMessageBox } from "./messageBox.js";

const electron = require('electron')
const {ipcRenderer} = electron;
const path = require('path');

const closeMessageBox = ()  => {
    $("#message_box").html("")
    $("#message_box").hide()
}

const showAboutMessageBox = () => {
    const messageBoxElement = `
        <h2>About</h2>
        <p>Version: 1.2.1</p>
        <p>Created by NERBLER09 on Github</p>
        <p>Licensed under the MIT Licence</p>
        <p>Go to: Other -> Open Issue to report a bug or submit a feature suggestion</p>
        <button id="close_button">Close</button>
    `

    $("#message_box").show()
    $("#message_box").html(messageBoxElement)
    $("#close_button").click(closeMessageBox)
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

const handleShowHowToPlay = () => {
    window.open(path.join(__dirname, `howToPlay.html`))
}

ipcRenderer.on("updateGameConfig", () => {
    updateGameConfig()
    $("#message_box").show()
})

ipcRenderer.on("showAboutMessageBox", showAboutMessageBox)

ipcRenderer.on("showHowToPlay", handleShowHowToPlay)
