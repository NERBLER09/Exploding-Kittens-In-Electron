// Script for titleScreen.html

let username:any
let comPlayerAmount:number

// onClick function for playButton
function startGame() {
    username =  $("#usrnameInput").val();

    if(username) {
        console.log(username)
        console.log("Let play!")
    } 
    else {
        console.error("Username input is empty")
    }
}

$("#playButton").click(startGame)