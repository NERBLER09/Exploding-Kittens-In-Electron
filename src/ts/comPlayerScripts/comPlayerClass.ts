import { removeDrawnCardFromDeck, seeTheFutureCards, turnsNeedToPlay, updateVariable } from "../gameFunctions.js";
import { displayMessageBox, explodedMessageBox } from "../messageBox.js";
import { cards } from "../messages.js";
import { card, catCard } from "../models/cards.interface";
import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../nopePlayedCard.js";
import { updateDiscardPile } from "../updateDiscardPile.js";

interface comPlayerInterface {
    hand: card[],
    checkForPlayableCard: Function,
    dealInitialHand: Function,
    playAttackCard: Function,
    playSkipCard: Function
}

const playableCards: card[] = ['attack',
    'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
    'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon"]

/** Class holds reusable functions from the com players 
 * 
 * @param comPlayerName Takes the name of the current com player 
*/
class comPlayerClass implements comPlayerInterface {
    hand = []
    private comPlayerName: "Com 1" | "Com 2" | "Com 3"
    private cardsToPlayList: card[] = []

    constructor(comName: "Com 1" | "Com 2" | "Com 3",) { this.comPlayerName = comName }

    checkForPlayableCard(card: any) {
        for (const e of this.hand) {
            if (playableCards.includes(e) && e === card) {
                if (catCard.includes(card) && e === card) {
                    // If a com player wants to steal a card checks if there are 2 matching cat cards
                    if (this.checkForMatchingCatCards(card)) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                return true
            }
        }
        return false
    }

    /** Checks if there are 2 or more matching car cards.
     * 
     * Counts how many times a cat card appears in the current com player hand
     * 
     * @param {card} catCardToPlay Takes the cat card that the com player wants to play
     * 
     * @returns {boolean} Returns true if there is 2 or more matching cat cards.
     * Returns false if there is only 1 cat card.
     */
    checkForMatchingCatCards(catCardToPlay: card): boolean {
        let countOfMatchingCatCards = 0

        for (let i = 0; i > this.hand.length; i++) {
            if (this.hand[i] === catCardToPlay) {
                countOfMatchingCatCards++
            }
        }

        if (countOfMatchingCatCards >= 2) {
            return true
        }
        else {
            return false
        }
    }

    /** Decides how many cards a com player should play */
    decideHowManyCardsToPlay() {
        const amountOfCardsToPlay = Math.floor(Math.random() * this.hand.length)

        for (let i = 0; i < amountOfCardsToPlay; i++) {
            if (this.checkForPlayableCard(this.hand[i])) {
                this.cardsToPlayList.push(this.hand[i])
            }
        }
    }

    dealInitialHand() {
        // Deals the 7 cards to the player
        for (let i = 0; i < 7; i++) {
            // Choses a card
            const cardIndex = Math.floor(Math.random() * cards.length)
            const card = cards[cardIndex];

            // Adds the drawn card the the list
            this.hand.push(card)

            // Removes the drawn card from the deck
            removeDrawnCardFromDeck(card)
        }

        // Deals the defuse card to the current com player 
        this.hand.push("defuse")

        // Removes the defuse card from the 
        removeDrawnCardFromDeck("defuse")
    }

    /** Attacks the next player 
     * 
     * Checks if to target the player or not
     * 
     * @param skipToNextComPlayer - Stores if to pass the turn to the next com player
     * 
     * @param choseCardForNextComPlayer - The choseCard function for the next com player
    */
    playAttackCard(skipToNextComPlayer: boolean, nextComPlayer?: string, choseCardForNextComPlayer?: Function) {
        updateVariable("turnsNeedToPlay")

        switch (skipToNextComPlayer) {
            case true:
                // Makes the next com player have 2 turns 

                // Displays the amount of turns Com 2 has 
                displayMessageBox(`${this.comPlayerName} has played an attack`, `It's now ${nextComPlayer}'s turn, ${nextComPlayer} has ${turnsNeedToPlay} turns`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForNextComPlayer()
                    }
                }, 100);

                break

            // Runs when the current com player or com 3 has played an attack card
            case false:
                // Makes the player have 2 turns

                // Displays that it's now the player's turn and how many turns that they have
                displayMessageBox(`${this.comPlayerName} has played an attack`, `It's now you turn, you have ${turnsNeedToPlay} turns`)

                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)

                break
        }
    }

    /** Skips to the next player 
     * 
     * Checks if to target the player or not
     * 
     * @param skipToNextComPlayer - Stores if to pass the turn to the next com player
     * 
     * @param choseCardForNextComPlayer - The choseCard function for the next com player
    */
    playSkipCard(skipToNextComPlayer: boolean, nextComPlayer?: string, choseCardForNextComPlayer?: Function) {
        if (turnsNeedToPlay === 1) {
            displayMessageBox(`${this.comPlayerName} has skipped 1 of their turns`, `${this.comPlayerName} has ${turnsNeedToPlay} more turn(s) to play. It's now ${this.comPlayerName}'s turn`)
            choseCardForNextComPlayer()
        }

        // Checks if there are more then 1 com player to pass turn to the right player

        switch (skipToNextComPlayer) {
            case true:
                // Tells the player that 
                displayMessageBox(`${this.comPlayerName} has skipped there turn`, `It's now ${nextComPlayer}'s turn.`)

                const waitUntilMessageBoxClosed = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(waitUntilMessageBoxClosed)
                        // Makes it be com 2's turn
                        choseCardForNextComPlayer()
                    }
                }, 100);

                break
            case false:
                displayMessageBox(`${this.comPlayerName} has skipped there turn`, "It's now your turn.")

                // Makes it be the players turn
                updateVariable("isPlayerTurn", true)

                break
        }
    }

    /** Tells the player that the deck has been shuffled */
    playShuffleCard(drawCardFunction, playCardFunction) {
        // Card is a placebo, this card really dose nothing
        displayMessageBox("The deck has been shuffled", `${this.comPlayerName} has shuffled the deck`)

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            // Checks if the player has closed the #message_box
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)

                // Checks if there are any more cards to card
                if (this.cardsToPlayList.length > 0) {
                    // Plays the card
                    playCardFunction()

                    return ""
                }
                else {
                    // Draws the card
                    drawCardFunction()

                    return ""
                }
            }
        }, 100);
    }

    /** Choses the top three cards */
    playSeeTheFutureCard(drawCardFunction, playCardFunction) {
        displayMessageBox(`${this.comPlayerName} has played a see the future card`, `${this.comPlayerName} has seen the top 3 cards of the deck`)

        updateVariable("seeTheFutureCards")

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            // Checks if the player has closed the #message_box
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)

                // Checks if there are any more cards to card
                if (this.cardsToPlayList.length > 0) {
                    // Plays the card
                    playCardFunction()
                }
                else {
                    // Draws the card
                    drawCardFunction()
                }
            }
        }, 100);
    }

    /** Ask the player or a com player for a favor card */
    playFavorCard(askFavorCardFunction: Function, drawCardFunction) {
        // Choses which player to ask for a favor
        // 1 - The Player
        // 2 - Com 2
        // 3 - Com 3

        let favorCardTarget: number

        // Check how many com players were selected 
        switch (localStorage.getItem("comAmount")) {
            case "1comPlayer":
                favorCardTarget = 1

                break
            case "2comPlayer":
                favorCardTarget = Math.floor(Math.random() * 3)

                break
            case "3comPlayer":
                favorCardTarget = Math.floor(Math.random() * 4)

                break
        }

        // Checks if selected target has a return in switch statement 
        if (favorCardTarget == 1) {
            askFavorCardFunction(favorCardTarget)
        }
        else {
            // Ask for a card from the player of choice
            const givenCard: card = askFavorCardFunction(favorCardTarget)

            // Adds the given card to the current com player's hand
            this.hand.push(givenCard)

            const waitUntilMessageBoxIsClosed = setInterval(() => {
                // Checks if the player has closed the #message_box
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxIsClosed)
    
                    drawCardFunction()
                }
            }, 100);

            // Draws the card
            drawCardFunction()
            return ""
        }
    }

    /** Choses a card to play, checks if that card is playable, and checks if the player wants to nope it 
     * 
     * @param {Function} playCardForComPlayer Takes the playCard function for the current com player
     * 
     * @param {Function} drawCardForComPlayer Takes the drawCard function for the current com player
     */
    chooseCardToPlay(playCardForComPlayer: Function, drawCardForComPlayer: Function) {
        // Checks if there are no cards in the cardToPlayList list
        if (this.cardsToPlayList.length <= 0) {
            this.decideHowManyCardsToPlay()
        }

        // Choses a card to play from the com players's hand
        const cardToPlay: card = this.cardsToPlayList[0]
        // Removes the played card from the com players's hand
        const cardIndex = this.hand.indexOf(cardToPlay)

        // Checks if the chosen card is a playable card
        if (this.checkForPlayableCard(cardToPlay)) {
            updateDiscardPile(cardToPlay)

            if (checkForNopeCardInHand()) {
                nopePlayedCard(cardToPlay, this.comPlayerName)

                const waitUntilMessageBoxClosed = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(waitUntilMessageBoxClosed)

                        if (!checkIfNopeCardPlayed()) {
                            const waitUntilMessageBoxClosed = setInterval(() => {
                                if ($("#message_box").is(":hidden")) {
                                    clearInterval(waitUntilMessageBoxClosed)

                                    this.hand.splice(cardIndex, 1)
                                    this.cardsToPlayList.splice(0, 1)

                                    playCardForComPlayer(cardToPlay)

                                    return ""
                                }
                            }, 100)
                        }
                        else {
                            this.cardsToPlayList.splice(0, 1)
                            this.hand.splice(cardIndex, 1)

                            drawCardForComPlayer()

                            return ""
                        }
                    }
                }, 100);
            }
            else {
                playCardForComPlayer(cardToPlay)

                return ""
            }
        }
        else {
            this.chooseCardToPlay(playCardForComPlayer, drawCardForComPlayer)
        }
    }

    /** Draws a card for the current com player 
     * 
     * @param {boolean} skipToNextComPlayer Stores a boolean if to skip to the next com player or to the player
     * 
     * @param {Function} choseCardForNextComPlayer Stores the choseCard function for the next com player
     * 
     * @param {Function} choseCardForCurrentComPlayer Stores the chooseCard function for the current com player
     * 
     * @param {string} nextComPlayer Stores the name of the next com player
    */
    drawCardForComPlayer(skipToNextComPlayer: boolean, choseCardForNextComPlayer?: Function, choseCardForCurrentComPlayer?: Function, nextComPlayer?: string) {
        let cardDrawn: card

        // Checks a see the future card was drawn, if so gets the top card
        if (seeTheFutureCards.length !== 0) {
            // Gets the top card
            cardDrawn = seeTheFutureCards[0]

            // Removes the top card from the list
            seeTheFutureCards.splice(0, 1)
        } else {
            // Choses a card
            const cardIndex = Math.floor(Math.random() * cards.length)
            cardDrawn = cards[cardIndex];
        }

        // Exploding Kitten was not drawn
        if (cardDrawn !== "exploding kitten") {
            // Adds the drawn card to com's hand
            this.hand.push(cardDrawn)

            // Removes the drawn card from the deck
            removeDrawnCardFromDeck(cardDrawn)

            // When the current com player draws, checks if the current com player has additional turns 
            // (If the player has played an attack card or not)

            // the current com player has no additional turns

            if (turnsNeedToPlay <= 0) {
                // Checks if there are more then 1 com player to pass turn to the right player

                switch (skipToNextComPlayer) {
                    case true:
                        displayMessageBox(`${this.comPlayerName} has drawn a card.`, `It's now ${nextComPlayer}'s turn`)

                        const setCom2Turn = setInterval(() => {
                            // Checks if the player has closed the #message_box
                            if ($("#message_box").is(":hidden")) {
                                clearInterval(setCom2Turn)
    
                                // Makes it be the next com players's turn
                                choseCardForNextComPlayer()
                                return ""
                            }
                        }, 100);

                        break
                    case false:
                        displayMessageBox(`${this.comPlayerName} has drawn card`, "It's now your turn")

                        // Makes it be the players turn
                        updateVariable("isPlayerTurn", true)

                        break
                }
            }

            // the current com player has additional turns

            else {
                // Removes 1 from turnsNeedToPlay to have the current com player has 1 less turn
                updateVariable("removeFromTurnsNeedToPlay")

                displayMessageBox(`It's ${this.comPlayerName}'s turn.`, `It's now ${this.comPlayerName}'s turn again. ${this.comPlayerName} has ${turnsNeedToPlay} more turn(s) remaining.`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(setCom2Turn)

                        choseCardForCurrentComPlayer()

                        return ""
                    }
                }, 100);
            }
        }

        // Exploding Kitten was drawn

        else {
            // Tells the player that the current com player has drawn an Exploding Kitten card
            displayMessageBox("An Exploding Kitten card has been drawn", `${this.comPlayerName} has drawn an Exploding Kitten!`)

            const waitUntilMessageBoxClosed: NodeJS.Timeout = setInterval(() => {
                if ($("#message_box").is(":hidden")) {
                    clearInterval(waitUntilMessageBoxClosed)
                    this.defuseExplodingKittenCard(cardDrawn, choseCardForNextComPlayer, nextComPlayer, skipToNextComPlayer)
                }
            }, 100)

        }
    }

    /** Defuses an Exploding Kitten card when a com player draws an Exploding Kitten card 
     * 
     * @param {card} cardDrawn Stores the card the current com player has drawn
     * 
     * @param {Function} choseCardForNextComPlayer Stores the choseCard function for the next com player
     * 
     * @param {string} nextComPlayer Stores the name of the next com player
     * 
     * @param {boolean} skipToNextComPlayer Stores if to pass turn to a com player or to the player
    */
    defuseExplodingKittenCard(cardDrawn: card, choseCardForNextComPlayer: Function, nextComPlayer: string, skipToNextComPlayer: boolean) {
        let com1HasDefuseCard = false

        // Checks if the current com player has a defuse card   
        for(const card of this.hand) {
            if(card === "defuse") {
                com1HasDefuseCard = true

                break   
            }
        }

        // Checks if the current com player didn't have a defuse card
        if(com1HasDefuseCard === false) {
            setTimeout(() => {
                // Dose nothing here
            }, 1000);

            // Tells the player that the current com player has exploded
            explodedMessageBox(`${this.comPlayerName} has exploded!`, `You won! Click on "Start new game" to start a new game or "Quit" to quit`)
        }
        else {
            // defuses the Exploding Kitten card

            // Removes the defuse card from the current com player's hand 
            const cardIndex = this.hand.indexOf(cardDrawn)

            this.hand.splice(cardIndex, 1)

            // Checks whenever to switch to next com player or to the player
            switch(skipToNextComPlayer) {
                case true:
                    displayMessageBox(`${this.comPlayerName} has defused the Exploding Kitten`, `It's now ${nextComPlayer}'s turn`)

                    const setCom1Turn = setInterval(() => {
                        // Checks if the player has closed the #message_box
                        if($("#message_box").is(":hidden") ) {
                            clearInterval(setCom1Turn)
    
                            // Makes it be the current com player's turn
                            choseCardForNextComPlayer()
                        }
                    }, 100);

                    break
                
                case false:
                    displayMessageBox(`${this.comPlayerName} has defused the Exploding Kitten`,"It's now your turn")

                    // Makes it be the players turn
                    updateVariable("isPlayerTurn", true)

                    break
            }
        }
    }
}

const com1Player = new comPlayerClass("Com 1")
const com2Player = new comPlayerClass("Com 2")
const com3Player = new comPlayerClass("Com 3")

export {
    com1Player,
    com2Player,
    com3Player
}