import { cardsInCom1Hand, drawCardForCom1 } from "../comPlayerScripts/com1Player/drawCardForCom1.js"
import { cardsInCom2Hand, drawCardForCom2 } from "../comPlayerScripts/com2Player/drawCardForCom2.js"
import { cardsInCom3Hand, drawCardForCom3 } from "../comPlayerScripts/com3Player/drawCardForCom3.js"
import { decideCardToGiveAsFavor } from "../comPlayerScripts/decideCardToGiveAsFavor.js"
import { updateVariable } from "../gameFunctions.js"
import { displayMessageBox } from "../messageBox.js"
import { comPlayerPlayedFavor, playerCardsInHand } from "../messages.js"
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
            // // Gives a random card from com 1's hand to the player
            // indexOfCard = Math.floor(Math.random() * cardsInCom1Hand.length)

            // cardToGive = cardsInCom1Hand[indexOfCard]

            // // Removes the given card from com 1's hand
            // cardsInCom1Hand.splice(indexOfCard, 1)

            cardToGive = decideCardToGiveAsFavor(cardsInCom1Hand)

            displayCardToPlayer(cardToGive)

            comTarget = "Com 1"

            break
        case "com2":
            cardToGive = decideCardToGiveAsFavor(cardsInCom2Hand)

            displayCardToPlayer(cardToGive)

            comTarget = "Com 2"

            break
        case "com3":
            cardToGive = decideCardToGiveAsFavor(cardsInCom3Hand)

            displayCardToPlayer(cardToGive)

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

const giveFavorCardToComPlayer = (cardIndex: number) => {
    let waitUntilMessageBoxIsClosed: NodeJS.Timeout

    // Tells the player which card they game to a com player
    displayMessageBox("Favor Card", `You gave you ${playerCardsInHand[cardIndex]} to ${comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]}`)

    updateVariable("isPlayerTurn", false)

    // Checks what com player played the favor card
    switch(comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]) {
        case "Com 1":
            // Adds the given card to Com 1's hand 
            cardsInCom1Hand.push()

            // Resets the comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
            comPlayerPlayedFavor["favorCardPlayed"] = null

            // Removes the given card from the players hand
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the given played card from the player's view
            $(".player_cards").get(cardIndex).remove()

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    
                    // Draws the card
                    drawCardForCom1()
                }
            }, 100);

            break
        
        case "Com 2":
            // Adds the given card to Com 2's hand 
            cardsInCom2Hand.push()

            // Resets the comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
            comPlayerPlayedFavor["favorCardPlayed"] = null

            // Removes the given card from the players hand
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the given played card from the player's view
            $(".player_cards").get(cardIndex).remove()

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom2()
                }
            }, 100);
            
            break

        case "Com 3":
            // Adds the given card to Com 3's hand 
            cardsInCom3Hand.push()

            // Resets the comPlayerPlayedFavor list 
            comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
            comPlayerPlayedFavor["favorCardPlayed"] = null

            // Removes the given card from the players hand
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the given played card from the player's view
            $(".player_cards").get(cardIndex).remove()

            waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if($("#message_box").is(":hidden") ) {
                    clearInterval(waitUntilMessageBoxIsClosed)
                    // Draws the card
                    drawCardForCom3()
                }
            }, 100);
            break                            
    }
}

export {
    catCardPlayed,
    promptFavorTarget,
    giveFavorCardToComPlayer
}