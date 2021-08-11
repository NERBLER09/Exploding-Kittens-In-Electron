// Script for titleScreen.html

// const $ = require("jquery")
const electron = require('electron')
const {ipcRenderer} = electron;
import { askToSaveGameConfigs, checkIfGameDataIsSaved } from "./manageGameConfigurations.js";
import { displayMessageBox } from "./messageBox.js";
import { messages } from "./messages.js";

let username:any = null
let comPlayerAmount:any = null

/** Checks if a username is entered or a com player amount is selected */
const checkForGameConfigs = (): boolean => {
    if(username !== "" && comPlayerAmount !== undefined ) {
        console.log("Meets requirements")
        return true
    }
    else {
        if(username === "" && comPlayerAmount !== undefined) {
            displayMessageBox("Error when starting game",messages["no_username"])
        }
        else if(username !== "" && comPlayerAmount === undefined) {
            displayMessageBox("Error when starting game",messages["no_com_selected"])
        }
        else {
            displayMessageBox("Error when starting game",messages["no_username_no_com"]) 
        }
    }
}

// onClick function for playButton
function startGame() {
    $("#errorMsg").html("")

    username =  $("#usrnameInput").val();
    comPlayerAmount = $(".comSelection[type='radio']:checked").val();

    // Checks is a username is selected and a com amount is selected
    if(checkForGameConfigs()) {
        localStorage.setItem("username", username)
        localStorage.setItem("comAmount", comPlayerAmount)
        
        checkIfGameDataIsSaved() ? ipcRenderer.send("createGameWindow") : askToSaveGameConfigs()
    }
} 

$("#playButton").click(startGame)
$("body").ready(() => {
    if(checkIfGameDataIsSaved()) { ipcRenderer.send("createGameWindow") }
})

export {
    username,
    comPlayerAmount
}