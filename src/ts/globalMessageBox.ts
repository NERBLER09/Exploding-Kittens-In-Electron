const electron = require('electron')
const {ipcRenderer} = electron;
const {app} = electron

const closeMessageBox = ()  => {
    $("#message_box").html("")
    $("#message_box").hide()
}

const showAboutMessageBox = () => {
    const messageBoxElement = `
        <h2>About</h2>
        <p>Version: 1.0</p>
        <p>Created by NERBLER09 on Github</p>
        <p>Licenced under the MIT Licence</p>
        <p>Go to: Other -> Open Issuse to report a bug or submit a feature sugestion</p>
        <button id="close_button">Close</button>
    `

    $("#message_box").show()
    $("#message_box").html(messageBoxElement)
    $("#close_button").click(closeMessageBox)
}

ipcRenderer.on("showAboutMessageBox", showAboutMessageBox)
