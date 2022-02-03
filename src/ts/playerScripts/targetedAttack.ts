import { choseCard } from "../comPlayerScripts/com1Player/playCardForCom1.js"
import { choseCardForCom2 } from "../comPlayerScripts/com2Player/playCardCom2.js"
import { choseCardForCom3 } from "../comPlayerScripts/com3Player/playCardCom3.js"
import { turnsNeedToPlay, updateVariable } from "../gameFunctions.js"
import { displayMessageBox } from "../messageBox.js"

/** Asks what com player the player wants to target with a targeted attack */
const promptTargetedAttack = () => {
    let messageElement = []

    $("#message_box").show()

    // Enters switch statement to check amount of com players 
    // to display the right amount of elements

    switch(localStorage.getItem("comAmount")) {
        case "1comPlayer":
            messageElement = [$("<button value='com1'>Com 1</button>")]

            break
        case "2comPlayer":
            messageElement = [$("<button value='com1'>Com 1</button>"), 
            $("<button value='com2'>Com 2</button>")]

            break
        case "3comPlayer":
            messageElement = [$("<button value='com1'>Com 1</button>"), 
            $("<button value='com2'>Com 2</button>"),
            $("<button value='com3'>Com 3</button>")]

            break
    }

    $("#message_box").append($("<h2>Who do you want to attack?</h2>"))

    // Loops through the messageElement to display all the elements properly 
    for(const e of messageElement) {
        const messageElementIndex = messageElement.indexOf(e)

        $("#message_box").append(messageElement[messageElementIndex])

        // Adds onclick actionEvent
        $(messageElement[messageElementIndex]).click({param1: $(messageElement[messageElementIndex]).val()}, targetAttackPlayer)

    }
}

/** Attacks the targeted com player
 * 
 * @param comTarget Contains the targeted com player
 */
const targetAttackPlayer = (comTarget) => {
    $("#message_box").html("")
    $("#message_box").hide()
    
    comTarget = comTarget.data.param1
    let waitUntilMessageBoxIsClosed

    // Enters a switch statement to check what com player was selected 
    switch(comTarget) {
        case "com1":
            updateVariable("turnsNeedToPlay")

            displayMessageBox("Targeted Attack", `You have targeted Com 1, Com 1 has ${turnsNeedToPlay} turns to play`)

            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    
                    choseCard()
                }
            }, 100);

            break
        case "com2":
            updateVariable("turnsNeedToPlay")

            displayMessageBox("Targeted Attack", `You have targeted Com 2, Com 2 has ${turnsNeedToPlay} turns to play`)

            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    
                    choseCardForCom2()
                }
            }, 100);

            break
        case "com3":
            updateVariable("turnsNeedToPlay")

            displayMessageBox("Targeted Attack", `You have targeted Com 3, Com 3 has ${turnsNeedToPlay} turns to play`)

            waitUntilMessageBoxIsClosed = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    
                    choseCardForCom3()
                }
            }, 100);
    
            break
    }
}

export { promptTargetedAttack }