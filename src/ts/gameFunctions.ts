// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { playerCardsInHand, cards, cardAmounts } from "./messages.js"
import { choseAndPlayCardForCom1, cardsInCom1Hand } from "./com1Script.js";
import { cardsInCom2Hand } from "./com2Script.js";
import { cardsInCom3Hand } from "./com3Script.js";

const $ = require("jquery")

// Contains how many total cards are in the deck
let totalCardAmount = 51

// Stores if it is the player's turn
let isPlayerTurn = true

// Stores the amount of cards the player has
let turnsNeedToPlay = 1

let seeTheFutureCards = []

// Draws a card for the player
const drawCard = () => {
    // Checks if its the players turn
    if(isPlayerTurn === true) {
        // Checks if there are still cards in the deck
        if(totalCardAmount > 1) {
            // Checks a see the future card was drawn, if so add from the top three cards
            if(seeTheFutureCards.length !== 0) {
                // Gets the top card
                const card = seeTheFutureCards[0]

                // Removes the top card from the list
                seeTheFutureCards.splice(0, 1)

                // Removes the drawn card from the deck
                removeDrawnCardFromDeck(card)

                // Displays the drawn card
                displayDrawnCard(card)
            } else {
                // Choses a card
                const cardIndex = Math.floor(Math.random() * cards.length)
                const card = cards[cardIndex];

                // Adds the drawn card the the list
                playerCardsInHand.push(card)

                // console.log(`Card drawn is: ${card}. Index ${cardIndex}`)

                // Removes the drawn card from the deck
                removeDrawnCardFromDeck(card)

                // Displays the drawn card
                displayDrawnCard(card)
            }

            // Removes 1 from the turnsNeedToPlay
            turnsNeedToPlay-=1

            // Checks if the player has any more cars
            isPlayerTurn = turnsNeedToPlay <= 0 ? false : true

            // Changes the current_player_turn text
            if(isPlayerTurn == false && turnsNeedToPlay <= 0) {
                $("#current_player_turn").html("It's com 1's turn")

                // Resets turnsNeedToPlay to 0 to fix some bugs
                turnsNeedToPlay = 0

                // Makes it be com 1's turn
                choseAndPlayCardForCom1()
            }
            else{
                $("#current_player_turn").html(`Amount of turns left: ${turnsNeedToPlay}`)
            }
        }        
    }        
}

// Deal the cards to the player
const displayDrawnCard = (cardToDisplay:string) => {
    // Displays the card and added an click command
    let card = $(`<button class="player_cards" value="${cardToDisplay}">${cardToDisplay}</button>`)

    // Adds onclick function
    $(card).click({param1: $(card).val()}, playCard)

    // Displays the card 
    $("#player_cards_container").append(card)
}

// Function for when the player plays a card
const playCard = (playerCard) => {
    // Checks if its the player's turn
    if(isPlayerTurn === true) {
        const cardPlayed = playerCard.data.param1

        // Loops through the cards in the player hand
        for(const checkForCardInHand of playerCardsInHand) {
            // Checks if the looped card matches the played card
            if(checkForCardInHand === cardPlayed) {
                let cardIndex = playerCardsInHand.indexOf(cardPlayed)

                // Removes the played card from the playerCardsInHand list
                playerCardsInHand.splice(cardIndex, 1)

                // Hides the played card
                $(".player_cards").get(cardIndex).remove()

                // Checks what card is played
                checkPlayerCardPlayed(checkForCardInHand)

                // Breaks the loop
                break
            } 
        }   
    }   
}

// Removes the drawn card from the deck
const removeDrawnCardFromDeck = (cardToRemoveFromDeck: string) => {
    cardAmounts[cardToRemoveFromDeck] -= 1
    // console.log(totalCardAmount)
    totalCardAmount -= 1

    // Checks of there are no more remaining cards
    if(cardAmounts[cardToRemoveFromDeck] == 0) {
        // Removes the card from the deck
        cards.splice(cards.indexOf(cardToRemoveFromDeck), 1)
    }

    // Checks if there are no more cards in the deck
    if(totalCardAmount == 0) {
        // Changes the #remaining_card element text
        $("#remaining_card").html("There are no more cards in the deck. Reload the page to restart the page (Window -> Reload or Ctrl+R)")
    }
    else {
        // Displays remaining the cards in the deck
        $("#remaining_card").html(`Remaining Cards: ${totalCardAmount}`)
    }
}

// Checks what card the player played so it can do its respective action
const checkPlayerCardPlayed = (cardPLayed:string) => {
    // Checks if the player played a cat card (can't be in the switch statement because of the multiple cards)
    if(cardPLayed == 'potato cat' || cardPLayed == 'taco cat' || cardPLayed == 'rainbow ralphing cat' || 
    cardPLayed == 'beard cat' || cardPLayed == 'cattermellon') {
        console.log(`Player played a cat card (${cardPLayed})`)

        catCardPlayed(cardPLayed)
    }

    switch(cardPLayed) {
        case "skip":
            isPlayerTurn = false // Makes it not be the players turn
            turnsNeedToPlay-=1
            $("#current_player_turn").html("You have skipped your turn")

            // Makes it be com 1's turn
            choseAndPlayCardForCom1()

            break
        case "attack":
            console.log("Player played a attack")

            // Displays that it's now com 1's turn and that com 1 has 2 turns
            $("current_player_turn").html(`It it now Com 1's turn. Com 1 has 2 turns because you played an attack card`)
            
            // Makes com 1 have 2 turns 
            turnsNeedToPlay += 2 

            // Makes it be Com 1's turn
            choseAndPlayCardForCom1()

            break
        case "shuffle":
            // Card is a placebo, this card really dose nothing
            console.log("Player played a shuffle") 
            break
        case "see the future":
            console.log("Player played a see the future")
            seeTheFutureCards = [cards[Math.floor(Math.random() * cards.length)],
                cards[Math.floor(Math.random() * cards.length)], 
                cards[Math.floor(Math.random() * cards.length)]]

                $("#current_player_turn").html(`The Current Top 3 Cards: 1. ${seeTheFutureCards[0]},
                2. ${seeTheFutureCards[1]}, 3. ${seeTheFutureCards[2]} `)
            
            break
        case "favor":
            console.log("Player played a favor")

            // Asks what com player the player wants a favor from
            promptFavorTarget()

            break
        case "nope":
            console.error("There are no actions to nope")

            break
    }
}

// Runs when the player has played a cat card
const catCardPlayed = (catCard:string) => {
    let playerHasCatCard = false

    // Loops through the players hand to see if there is a matching card
    for(const cardsInPlayerHand of playerCardsInHand) {
        if(cardsInPlayerHand === catCard) {
            const cardIndex = playerCardsInHand.indexOf(catCard)
                        
            // Removes the card from the players hand
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
        displayNewCard(catCard)
    }
}

// Displays a card gotten from a favor or by playing 2 cat cards to the player
const displayNewCard = (displayCard) => {
    console.log(`New card is: ${displayCard}`)

    // Displays the card and added an click command
    const card = $(`<button class="player_cards" value="${displayCard}">${displayCard}</button>`)

    // Adds the drawn card the the list
    playerCardsInHand.push(displayCard)

    // Adds onclick function
    $(card).click({param1: $(card).val()}, playCard)

    // Displays the card 
    $("#player_cards_container").append(card)
}

// Updates a specified variable
const updateVariable = (variableToUpdate: "isPlayerTurn" | "turnsNeedToPlay" | "seeTheFutureCards" | "removeFromTurnsNeedToPlay", 
                        status?: boolean) => {
    // Enters a switch statement
    switch(variableToUpdate) {
        case "isPlayerTurn":
            // Sets isPlayerTurn to true
            if(status === true) {
                isPlayerTurn = true
            }
            // Sets isPlayerTurn to false
           else {
               isPlayerTurn = false
           }
           
           break
        
        case "turnsNeedToPlay":
            // Adds 2 to the turnsNeedToPlay
            turnsNeedToPlay+=2

            break
        case "seeTheFutureCards":
            // Adds the top 3 cards to the list
            seeTheFutureCards = [cards[Math.floor(Math.random() * cards.length)],
                cards[Math.floor(Math.random() * cards.length)], 
                cards[Math.floor(Math.random() * cards.length)]]

                console.log(`The Current Top 3 Cards: 1. ${seeTheFutureCards[0]},
                2. ${seeTheFutureCards[1]}, 3. ${seeTheFutureCards[2]} `)

            break
        case "removeFromTurnsNeedToPlay":
            turnsNeedToPlay-=1

            break
    }
}

// Asks what com player the player wants to ask a favor from
const promptFavorTarget = () => {
    let messageElement = []

    $("#message_box").show()

    // Enters switch statement to check amount of com players 
    // to display the right amount of elements

    switch(localStorage.getItem("comAmount")) {
        case "1comPlayer":
            messageElement = [$("<button value='com1'>Ask For A Card From Com 1</button>")]

            break
        case "2comPlayer":
            messageElement = [$("<button value='com1'>Ask For A Card From Com 1</button>"), 
            $("<button value='com2'>Ask For A Card From Com 2</button>")]

            break
        case "3comPlayer":
            messageElement = [$("<button value='com1'>Ask For A Card From Com 1</button>"), 
            $("<button value='com2'>Ask For A Card From Com 2</button>"),
            $("<button value='com3'>Ask For A Card From Com 3</button>")]

            break
    }

    // Loops through the messageElement to display all the elements properly 
    for(const e of messageElement) {
        const messageElementIndex = messageElement.indexOf(e)

        $("#message_box").append(messageElement[messageElementIndex])

        // Adds onclick actionEvent
        $(messageElement[messageElementIndex]).click({param1: $(messageElement[messageElementIndex]).val()}, askComPLayerForFavorCard)

    }
}    

// Gives a random card to the player after com player favor target is selected 
const askComPLayerForFavorCard = (comTarget) => {
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

            // Tells what card com 1 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`Com 1 has given you there ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
        case "com2":
            // Gives a random card from com 2's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToGive = cardsInCom2Hand[indexOfCard]

            // Removes the given card from com 2's hand
            cardsInCom2Hand.splice(indexOfCard, 1)

            // Tells what card com 2 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`Com 2 has given you there ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
        case "com3":
            // Gives a random card from com 3's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToGive = cardsInCom3Hand[indexOfCard]

            // Removes the given card from com 3's hand
            cardsInCom3Hand.splice(indexOfCard, 1)

            // Tells what card com 3 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`Com 3 has given you there ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
    }

    // Resets the message_box element
    $("#message_box").html("")
    
    // Hides the message_box element
    $("#message_box").hide()
}   

// Asks what com player the player wants to steal a card from
const promptCatCardTarget = () => {
    let messageElement = []

    $("#message_box").show()

    // Enters switch statement to check amount of com players 
    // to display the right amount of elements

    switch(localStorage.getItem("comAmount")) {
        case "1comPlayer":
            messageElement = [$("<button value='com1'>Steal A Card From Com 1</button>")]

            break
        case "2comPlayer":
            messageElement = [$("<button value='com1'>Steal A Card From Com 1</button>"), 
            $("<button value='com2'>Steal A Card From Com 2</button>")]

            break
        case "3comPlayer":
            messageElement = [$("<button value='com1'>Steal A Card From Com 1</button>"), 
            $("<button value='com2'>Steal A Card From Com 2</button>"),
            $("<button value='com3'>Steal A Card From Com 3</button>")]

            break
    }

    // Loops through the messageElement to display all the elements properly 
    for(const e of messageElement) {
        const messageElementIndex = messageElement.indexOf(e)

        $("#message_box").append(messageElement[messageElementIndex])

        // Adds onclick actionEvent
        $(messageElement[messageElementIndex]).click({param1: $(messageElement[messageElementIndex]).val()}, stealCardFromComPlayer)

    }
} 

// Steals a random card from a com player for the player
const stealCardFromComPlayer = (comTarget) => {
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

            // Tells what card com 1 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`You stole Com 1's ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
        case "com2":
            // Gives a random card from com 2's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom2Hand.length)

            cardToGive = cardsInCom2Hand[indexOfCard]

            // Removes the given card from com 2's hand
            cardsInCom2Hand.splice(indexOfCard, 1)

            // Tells what card com 2 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`You stole Com 2's ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
        case "com3":
            // Gives a random card from com 3's hand to the player
            indexOfCard = Math.floor(Math.random() * cardsInCom3Hand.length)

            cardToGive = cardsInCom3Hand[indexOfCard]

            // Removes the given card from com 3's hand
            cardsInCom3Hand.splice(indexOfCard, 1)

            // Tells what card com 3 gave to the player and adds the card to the players hand
            $("#current_player_turn").html(`You stole Com 3's ${cardToGive} card`)

            displayNewCard(cardToGive)

            break
    }

    // Resets the message_box element
    $("#message_box").html("")
    
    // Hides the message_box element
    $("#message_box").hide()
}

// Exports as module
export {
    displayDrawnCard,
    drawCard,
    playCard,
    removeDrawnCardFromDeck,
    updateVariable,
    turnsNeedToPlay
}
