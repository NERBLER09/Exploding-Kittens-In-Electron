import { removeDrawnCardFromDeck, turnsNeedToPlay, updateVariable } from "../gameFunctions.js";
import { displayMessageBox } from "../messageBox.js";
import { cards } from "../messages.js";
import { card, catCard } from "../models/cards.interface";
import { checkForMatchingCatCards } from "./checkForMatchingCatCards.js";
import { choseCardForCom2 } from "./com2Player/playCardCom2.js";

interface comPlayerInterface {
    hand: card[],
    checkForPlayableCard: Function,
    dealInitialHand: Function,
    playAttackCard: Function
}

const playableCards = ['attack',
'skip', 'favor', 'shuffle', 'see the future', 'potato cat',
'taco cat', 'rainbow ralphing cat', 'beard cat', 'cattermellon']

const catCard: catCard[] = ["potato cat", "taco cat", "rainbow ralphing cat", "beard cat", "cattermellon"]


/** Class holds reusable functions from the com players  */
class comPlayerClass implements comPlayerInterface {
    hand = []
    private comAmount = localStorage.getItem("comAmount")
    private comPlayerName: "Com 1" | "Com 2" | "Com 3"

    constructor(comName) { this.comPlayerName = comName}

    checkForPlayableCard(card: any) {
        for(const e of this.hand) {
            if(playableCards.includes(e) && e === card) {
                if(catCard.includes(card) && e === card) {
                    // If a com player wants to steal a card checks if there are 2 matching cat cards
                    if(checkForMatchingCatCards(this.hand, card)) {
                        return true
                    }
                    else return false
                }
                return true
            }
        }
        return false
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

        // Deals the defuse card to com 1 
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
    playAttackCard(skipToNextComPlayer: boolean, choseCardForNextComPlayer?: Function) {
        updateVariable("turnsNeedToPlay")

        switch(skipToNextComPlayer) {
            case true:
                // Makes the next com player have 2 turns 

                // Displays the amount of turns Com 2 has 
                displayMessageBox(`${this.comPlayerName} has played an attack`, `It's now ${this.comPlayerName}'s turn, ${this.comPlayerName} has ${turnsNeedToPlay} turns`)

                const setCom2Turn = setInterval(() => {
                    // Checks if the player has closed the #message_box
                    if ($("#message_box").is(":hidden")) {
                        clearInterval(setCom2Turn)

                        // Makes it be com 2's turn
                        choseCardForNextComPlayer()
                    }
                }, 100);

                break
            
            // Runs when com 1 or com 3 has played an attack card
            case false:
                // Makes the player have 2 turns

                // Displays that it's now the player's turn and how many turns that they have
                displayMessageBox(`${this.comPlayerName} has played an attack`, `It's now you turn, you have ${turnsNeedToPlay} turns`)

                // Makes it be the player's turn
                updateVariable("isPlayerTurn", true)

                break
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