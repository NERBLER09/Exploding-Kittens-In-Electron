// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { playerCardsInHand, cards, cardAmounts, comPlayerPlayedFavor } from "./messages.js"
import { choseAndPlayCardForCom1, cardsInCom1Hand, drawCardForCom1 } from "./com1Script.js";
import { cardsInCom2Hand, drawCardForCom2 } from "./com2Script.js";
import { cardsInCom3Hand, drawCardForCom3 } from "./com3Script.js";
import { displayMessageBox } from "./messageBox.js";

// const $ = require("jquery")

// Stores if it is the player's turn
let isPlayerTurn = true

// Stores the amount of cards the player has
let turnsNeedToPlay = 1

// Contains how many total cards are in the deck
let totalCardAmount = 51

// Stores the cards seen in a see the future
let seeTheFutureCards = []

// Stores if a exploding kittens card a drawn
let explodingKittenCardDrawn = false

// Draws a card for the player
const drawCardForPlayer = () => {
    // Checks if its the players turn
    // Checks if a com player has not played a favor card (Prevents the game from breaking)
    if(isPlayerTurn === true && comPlayerPlayedFavor["favorCardPlayed"] === false) {
        // Checks if there are still cards in the deck
        if(totalCardAmount > 1) {
            let cardDrawn: string

            // Checks a see the future card was drawn, if so gets the top card
            if(seeTheFutureCards.length !== 0) {
                // Gets the top card
                cardDrawn = seeTheFutureCards[0]

                // Removes the top card from the list
                seeTheFutureCards.splice(0, 1)
            } else {
                // Choses a card
                const cardIndex = Math.floor(Math.random() * cards.length)
                cardDrawn = cards[cardIndex];
            }

            // Checks if an Exploding Kittens card was drawn

            // Exploding Kitten card was not drawn
            if(cardDrawn !== "Exploding Kitten") {
                // Removes the drawn cardDrawn from the deck
                removeDrawnCardFromDeck(cardDrawn)

                // Displays the drawn cardDrawn
                displayDrawnCard(cardDrawn)

                // Removes 1 from the turnsNeedToPlay
                turnsNeedToPlay-=1

                // Checks if the player has any more cars
                isPlayerTurn = turnsNeedToPlay <= 0 ? false : true

                // Changes the current_player_turn text
                if(isPlayerTurn == false && comPlayerPlayedFavor["favorCardPlayed"] === false && turnsNeedToPlay <= 0) {
                    $("#current_player_turn").html(`You've drawn an ${cardDrawn} card. It's now com 1's turn`)

                    // Resets turnsNeedToPlay to 0 to fix some bugs
                    turnsNeedToPlay = 0

                    // Sets a time pause 
                    setTimeout(() => {
                        // Makes it be com 1's turn
                        choseAndPlayCardForCom1()
                    }, 2000);


                }
                else{
                    $("#current_player_turn").html(`You've drawn an ${cardDrawn} card. Amount of turns left: ${turnsNeedToPlay}`)
                }
            }

            // Exploding Kitten card was drawn

            else if(cardDrawn === "Exploding Kitten") {
                explodingKittenCardDrawn = true

                // Checks if the player has a diffuse card in hand
                let playerHasDiffuse = false

                for(const playerCard in playerCardsInHand) {
                    if(playerCardsInHand[playerCard] === "diffuse"){
                        $("#current_player_turn").html("You've drawn an Exploding Kitten card, play your diffuse card to diffuse the Exploding Kitten")

                        playerHasDiffuse = true

                        break
                    }
                }

                // Checks if the player has a diffuse card
                if(playerHasDiffuse === false) {
                    // Tells the player that they have exploded 
                    $("#current_player_turn").html("You've exploded! Go to: Options -> New Game to start a new game")

                    isPlayerTurn = false

                    // Removes the Exploding Kitten card from the deck
                    removeDrawnCardFromDeck("Exploding Kitten")
                }
            }
        }  
    }           
}

// Display the drawn card to the player
const displayDrawnCard = (cardToDisplay:string) => {
    // Displays the card and added an click command
    let card = $(`<button class="player_cards" value="${cardToDisplay}">${cardToDisplay}</button>`)

    // Adds onclick function
    $(card).click({param1: $(card).val()}, playCard)

    // Displays the card 
    $("#player_cards_container").append(card)

    // Adds the drawn card to the player's hand
    playerCardsInHand.push(cardToDisplay)
}

const playCard = (playerCard) => {
    const cardPlayed = playerCard.data.param1

    // Checks if its the player's turn 
    if(isPlayerTurn === true || comPlayerPlayedFavor["favorCardPlayed"] == true) {
        // Gets the index of the played card from the players hand
        const cardIndex = playerCardsInHand.indexOf(cardPlayed)

        // Checks if a com player has played a favor card
        if(comPlayerPlayedFavor["favorCardPlayed"] === false) {
            // Removes the played card from the players hand 
            playerCardsInHand.splice(cardIndex, 1)

            // Removes the played card from the player's view
            $(".player_cards").get(cardIndex).remove()

            // Checks what card is played
            checkPlayerCardPlayed(cardPlayed)
        }
        else {
            // Tells the player which card they game to a com player
            $("#current_player_turn").html(`You gave you ${playerCardsInHand[cardIndex]} to ${comPlayerPlayedFavor["comPlayerWhoPlayedFavor"]}`)
        
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

                    // Makes Com 1 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom1()

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

                    // Makes Com 2 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom2()

                    break

                case "Com 3":
                    // Adds the given card to Com 2's hand 
                    cardsInCom3Hand.push()

                    // Resets the comPlayerPlayedFavor list 
                    comPlayerPlayedFavor["comPlayerWhoPlayedFavor"] = false
                    comPlayerPlayedFavor["favorCardPlayed"] = null

                    // Removes the given card from the players hand
                    playerCardsInHand.splice(cardIndex, 1)

                    // Removes the given played card from the player's view
                    $(".player_cards").get(cardIndex).remove()

                    // Makes Com 3 draw a card (Allows the game to not get soft-locked)
                    drawCardForCom3()

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

            // Sets a time pause 
            setTimeout(() => {
                // Dose nothing here 
            }, 1000);
            
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

            // Re-adds the card back to the player's hand
            displayDrawnCard(cardPLayed)

            break

        case "diffuse":
            // Checks if the player has drawn an Exploding Kitten
            if(explodingKittenCardDrawn === true) {
                explodingKittenCardDrawn = false

                // Tells the player that they have diffused the Exploding Kitten
                $("#current_player_turn").html("You have successfully diffused the Exploding Kitten card. It's now Com 1's turn")

                turnsNeedToPlay = 0

                isPlayerTurn = false

                // Sets a time pause
                setTimeout(() => {                        
                    // Makes it now be Com 1's turn
                    choseAndPlayCardForCom1()            
                }, 1000);

                break
            }

            else {
                console.error("Player, you can't diffuse nothing.")

                displayDrawnCard(cardPLayed)
            }

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
        displayDrawnCard(catCard)

        displayMessageBox("No matching cat cards.", "They are no other matching cat cards.")
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
const updateVariable = (variableToUpdate: string, status?: boolean) => {
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
    drawCardForPlayer as drawCard,
    playCard,
    removeDrawnCardFromDeck,
    updateVariable,
    turnsNeedToPlay,
    seeTheFutureCards
}
