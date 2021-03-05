// Stores commonly used functions
// such as removing a drawn card from the deck,
// drawing a card for a player, and
// and the onclick function for the player cards

import { playerCardsInHand, cards, cardAmounts } from "./messages.js"
import { choseAndPlayCardForCom1 } from "./com1Script.js";

const $ = require("jquery")

// Contains how many total cards are in the deck
let totalCardAmount = 51

// Stores if it is the player's turn
let isPlayerTurn = true

// Stores the amount of cards the player has
let turnsNeedToPlay = 0

let seeTheFutureCards = []

// Draws a card for the player
const drawCard = () => {
    // Checks if its the players turn
    if(isPlayerTurn === true) {
        // Checks if there are still cards in the deck
        if(totalCardAmount != 0) {
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
    // TODO: Update card functionality to not only print the played card

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
            // attackCardPlayed = true
            turnsNeedToPlay+=2
            $("#current_player_turn").html(`You now have ${turnsNeedToPlay} turns`)
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

            const favoredCard = cards[Math.floor(Math.random() * cards.length)]

            // Choses a random card to display to the player
            displayNewCard(favoredCard)

            // Displays what card was favored
            $("#current_player_turn").html(`You got a ${favoredCard} card`)

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
        
            

            // Displays the gotten card by choosing a random card
            const stolenCard = cards[Math.floor(Math.random() * cards.length)]

            displayNewCard(stolenCard)

            // Displays what card was favored
            $("#current_player_turn").html(`You stole a ${stolenCard} card`)

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
const updateVariable = (variableToUpdate: string, status?: boolean, amount?: number) => {
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
    }
}

// Exports as module
export {
    displayDrawnCard,
    drawCard,
    playCard,
    removeDrawnCardFromDeck,
    updateVariable
}
