// Script for titleScreen.html

// const $ = require("jquery")
const electron = require('electron')
const {ipcRenderer} = electron;
import { messages } from "./messages.js";

let username:any
let comPlayerAmount:any

// onClick function for playButton
function startGame() {
    $("#errorMsg").html("")

    username =  $("#usrnameInput").val();
    comPlayerAmount = $(".comSelection[type='radio']:checked").val();

    // Checks if the player inputted a username
    if(username) {
        console.log(username)
    } 
    else if(!username) {
        console.error("Username input is empty")

        $("#errorMsg").html(messages["no_username"])
    }

    // Checks if the player selected the amount of com players
    if(comPlayerAmount) {
        console.log(comPlayerAmount)
    }

    else if(!comPlayerAmount) {
        console.error("Com player amount not selected")
        $("#errorMsg").html(messages["no_com_selected"])
    }

    // Checks if the player hasn't entered a username or selected the amount of com players
    if(!comPlayerAmount && !username) {
        console.error(messages["no_username_no_com"])
        $("#errorMsg").html(messages["no_username_no_com"])
    }

    // Checks is a username is selected and a com amount is selected
    if(comPlayerAmount && username) {
        localStorage.setItem("username", username) // Stores the username
        localStorage.setItem("comAmount", comPlayerAmount) // Stores the amount of com players

        ipcRenderer.send("createGameWindow")
    }
}

$("#playButton").click(startGame)