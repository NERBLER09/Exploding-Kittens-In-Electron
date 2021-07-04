import { cardsInCom1Hand } from "../comPlayerScripts/com1/drawCardForCom1.js"
import { cardsInCom2Hand } from "../comPlayerScripts/com2/drawCardForCom2.js"
import { cardsInCom3Hand } from "../comPlayerScripts/com3/drawCardForCom3.js"
import { displayMessageBox } from "../messageBox.js"
import { playerCardsInHand } from "../messages.js"
import { displayCardToPlayer } from "./displayCardToPlayer.js"

// Runs when the player has played a cat card
const catCardPlayed = (catCard:string) => {
    let playerHasCatCard = false

    // Loops through the players hand to see if there is a matching card
    for(const cardsInPlayerHand of playerCardsInHand) {
        if(cardsInPlayerHand === catCard) {
            const cardIndex = playerCardsInHand.indexOf(catCard)
                        
            // Removes the matching card from the players hand
            playerCardsInHand.splice(cardIndex, 1)
            $(".player_cards").get(cardIndex).remove()

            // Asks what com player the player wants to target`
            promptCatCardTarget()

            playerHasCatCard = true

            break
     
       }
    }

    // Checks if there are no matching cat cards
    if(playerHasCatCard === false) {
        console.error("There are no matching cat cards")

        // Readds the clicked card to the players hand
        displayCardToPlayer(catCard)

        displayMessageBox("No matching cat cards.", "They are no other matching cat cards.")
    }
}

/** Asks what com player the player wants to ask a favor from */ 
const promptFavorTarget = () => {
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

    $("#message_box").append($("<h2>Who do you want to ask for a favor?</h2>"))

    // Loops through the messageElement to display all the elements properly 
    for(const e of messageElement) {
        const messageElementIndex = messageElement.indexOf(e)

        $("#message_box").append(messageElement[messageElementIndex])

        // Adds onclick actionEvent
        $(messageElement[messageElementIndex]).click({param1: $(messageElement[messageElementIndex]).val()}, askComPLayerForFavorCard)

    }
}    

/** Gives a random card to the player after com player favor target is selected  */ 
const askComPLayerForFavorCard = (comTarget) => {
    $("#message_box").html("")
    $("#message_box").hide()
    
    comTarget = comTarget.data.param1

    let indexOfCard, cardToGive

    // Enters a switch statement to check what com player was selected 
    switch(comTarget) {
        case "com1":
            // Gives a random card from com 1's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom1Hand.length)

            cardToGive = cardsInCom1Hand[indexOfCard]

            // Removes the given card from com 1's hand
            cardsInCom1Hand.splice(indexOfCard, 1)

            displayCardToPlayer(cardToGive)

            comTarget = "Com 1"

            break
        case "com2":
            // Gives a random card from com 2's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToGive = cardsInCom2Hand[indexOfCard]

            // Removes the given card from com 2's hand
            cardsInCom2Hand.splice(indexOfCard, 1)

            comTarget = "Com 2"

            displayCardToPlayer(cardToGive)

            break
        case "com3":
            // Gives a random card from com 3's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToGive = cardsInCom3Hand[indexOfCard]

            // Removes the given card from com 3's hand
            cardsInCom3Hand.splice(indexOfCard, 1)

            comTarget = "Com 3"

            displayCardToPlayer(cardToGive)

            break
    }

    setTimeout(() => {
        displayMessageBox("Thanks for the card" , `${comTarget} has given you there ${cardToGive} card`)
    }, 100)
}   

/** Asks what com player the player wants to steal a card from */ 
const promptCatCardTarget = () => {
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

    $("#message_box").append("<h2>Who do you want to steal a card from?</h2>")

    // Loops through the messageElement to display all the elements properly 
    for(const e of messageElement) {
        const messageElementIndex = messageElement.indexOf(e)

        $("#message_box").append(messageElement[messageElementIndex])

        // Adds onclick actionEvent
        $(messageElement[messageElementIndex]).click({param1: $(messageElement[messageElementIndex]).val()}, stealCardFromComPlayer)

    }
} 

/** Steals a random card from a com player for the player */
const stealCardFromComPlayer = (comTarget) => {
    // Resets the message_box element
    $("#message_box").html("")
    
    // Hides the message_box element
    $("#message_box").hide()

    comTarget = comTarget.data.param1

    let indexOfCard, cardToGive

    // Enters a switch statement to check what com player was selected 
    switch(comTarget) {
        case "com1":
            // Gives a random card from com 1's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom1Hand.length)

            cardToGive = cardsInCom1Hand[indexOfCard]

            // Removes the given card from com 1's hand
            cardsInCom1Hand.splice(indexOfCard, 1)

            comTarget = "Com 1"

            displayCardToPlayer(cardToGive)

            break
        case "com2":
            // Gives a random card from com 2's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToGive = cardsInCom2Hand[indexOfCard]

            // Removes the given card from com 2's hand
            cardsInCom2Hand.splice(indexOfCard, 1)

            comTarget = "Com 2"

            displayCardToPlayer(cardToGive)

            break
        case "com3":
            // Gives a random card from com 3's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToGive = cardsInCom3Hand[indexOfCard]

            // Removes the given card from com 3's hand
            cardsInCom3Hand.splice(indexOfCard, 1)

            comTarget = "Com 3"

            displayCardToPlayer(cardToGive)

            break
    }

    
    setTimeout(() => {
        displayMessageBox("Card has been stolen" , `You have stolen ${comTarget}'s ${cardToGive} card`)
    }, 100)
}

export {
    catCardPlayed,
    promptFavorTarget
}