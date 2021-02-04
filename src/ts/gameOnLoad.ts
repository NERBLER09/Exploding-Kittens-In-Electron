// Displays the username and that selected com amount
// when that game page loads

const $ = require("jquery")

let username = localStorage.getItem("username")
let comPlayerAmount = localStorage.getItem("comAmount")

// Function runs when the page loads
function onLoadFunc() {
    $("#username").html(`Username: ${username}`)

    if(comPlayerAmount == "1comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 1 computer player`)
    }

    else if(comPlayerAmount == "2comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 2 computer players`)
    }

    else if(comPlayerAmount == "3comPlayer") {
        $("#comAmount").html(`Selected amount of computer players: 3 computer players`)
    }
}
