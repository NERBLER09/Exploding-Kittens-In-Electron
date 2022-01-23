// TODO: Allow a com player to play multiple cards
// TODO: Allow a com player to play on the last played card

import { get } from "svelte/store"
import { cards, comPlayer, previousPlayedCard, remainingTurns, seeTheFutureCards } from "../../data/GameData"
import { favorTarget, isPlayerTurn, needGiveFavorCard, playerHand } from "../../data/PlayerData"
import { setSeeTheFutureCards } from "../global/CardFunction"
import { hasDefuseCard, removeDrawnCard, removeFromSeeTheFutureCards, startNewGame } from "../global/Global"
import { setDefaultMessageBoxProps, showMessageBox } from "../global/MessageBox"

type ComPlayerNameType = "Com 1" | "Com 2" | "Com 3"

class comPlayerClass {
    private comPlayerName: ComPlayerNameType
    public cards: string[] = []

    constructor(comPlayerName: "Com 1" | "Com 2" | "Com 3") {
        this.comPlayerName = comPlayerName
    }

    public drawCard(passTurn: boolean = true) {
        let card = cards[Math.floor(Math.random() * cards.length)]
      
        if(get(seeTheFutureCards).length > 0) {
            card = get(seeTheFutureCards)[0]
            removeFromSeeTheFutureCards()
        }

        if(card === "exploding kitten") {
            const hasDefuse = hasDefuseCard(this.cards)
            if(hasDefuse) {
                const cardIndex = this.cards.indexOf("defuse")
                this.cards.splice(cardIndex, 1)    
            }
            this.handleDrawingAnExplodingKitten(this.comPlayerName, hasDefuse)
            
            return
        }

        removeDrawnCard(card)
        this.cards.push(card)
 
        if(passTurn && get(remainingTurns) < 2) {
            const {passTurnToPlayer, nextComPlayer} = this.getNextPlayer(this.comPlayerName) 
            if(passTurnToPlayer) {
                setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has drawn a card it's now your turn`, "Play on", () => {this.passTurnToNextPlayer(this.comPlayerName)})
            }
            else {
                setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has drawn a card it's ${nextComPlayer}'s turn now`, "Play on", () => {this.passTurnToNextPlayer(this.comPlayerName)})
            }
            showMessageBox.set(true)
            remainingTurns.set(0)
        }
        else if(passTurn && get(remainingTurns) > 0) {
            let turns = get(remainingTurns)
            turns--
            remainingTurns.set(turns)

            showMessageBox.set(true)
            setDefaultMessageBoxProps(`${this.comPlayerName} has drawn a card.`, `${this.comPlayerName} has ${get(remainingTurns)} ${get(remainingTurns) > 1 ? "turns" : "turn"} remaining.`, "Play on", () => {this.haveAnotherTurn(this.comPlayerName)})
        }
    }

    private handleDrawingAnExplodingKitten(currentComPlayer: ComPlayerNameType, hasDefuse: boolean) {
        if(hasDefuse) {
            const { nextComPlayer, passTurnToPlayer } = this.getNextPlayer(currentComPlayer)
            setDefaultMessageBoxProps(`${currentComPlayer} has drawn an exploding kitten card`, `${currentComPlayer} has defused the exploding kitten, its now ${passTurnToPlayer ? "your" : nextComPlayer + "'s"} turn`, "Play on", () => {this.passTurnToNextPlayer(currentComPlayer)})
        }
        else {
            setDefaultMessageBoxProps(`${currentComPlayer} has drawn an exploding kitten`, `${currentComPlayer} has exploded you win!`, "Start A New Game", () => {startNewGame()})
        }
    }

    private passTurnToNextPlayer(currentComPlayer: ComPlayerNameType) {
        const comAmount = get(comPlayer)

        switch(comAmount) {
            case "1-com-player":
                // Allows the player to have a turn
                isPlayerTurn.set(true)

                break
            case "2-com-player":
                if(currentComPlayer === "Com 1" && get(remainingTurns) === 0) {
                    // Allows Com 2 to have a turn
                    com2Player.playCard()
                }
                else {
                    // Allows the player to have a turn
                    isPlayerTurn.set(true)
                }

                break
            case "3-com-player":
                if(currentComPlayer === "Com 1" && get(remainingTurns) === 0) {
                    // Allows Com 2 to have a turn
                    com2Player.playCard()
                }
                if(currentComPlayer === "Com 2" && get(remainingTurns) === 0) {
                    // Allows Com 3 to have a turn
                    com3Player.playCard()
                }
                else {
                    // Allows the player to have a turn
                    isPlayerTurn.set(true)
                }

 
        }
    }

    private haveAnotherTurn(comName: ComPlayerNameType) {
        switch(comName) {
            case "Com 1":
                com1Player.playCard()
                break
            case "Com 2":
                com2Player.playCard()
                break
            case "Com 3":
                com3Player.playCard()
        }
    }

    private runDrawCard(comName: ComPlayerNameType) {
        switch(comName) {
            case "Com 1":
                com1Player.drawCard()
                break
            case "Com 2":
                com2Player.drawCard()
                break
            case "Com 3":
                com3Player.drawCard()
                break
        }
        
    }

    public playCard() {
        const card = cards[Math.floor(Math.random() * cards.length)]
        this.cards.splice(this.cards.indexOf(card), 1)

        previousPlayedCard.set(card)        

        if(card === "potato cat" || card === "taco cat" || card === "rainbow ralphing cat" || card === "beard cat" || card === "cattermellon") {
            if(this.checkForMatchingCatCards(card)) {
                let {target, targetName} = this.choseTarget(this.comPlayerName, this.comPlayerName)
                this.stealCard(target, this.comPlayerName, targetName)
            }
            else {
                this.cards.push(card)
            }
        }
 
        switch (card) {
            case "attack":
                this.playAttackCard()
                return
            case "skip":
                setDefaultMessageBoxProps(`${this.comPlayerName} has skipped their turn`, "It is now your turn.")
                this.passTurnToNextPlayer(this.comPlayerName)
                return
            case "favor":
                let {target, targetName} = this.choseTarget(this.comPlayerName, this.comPlayerName)
                this.askForFavor(target, this.comPlayerName, targetName)
                break
            case "shuffle":
                setDefaultMessageBoxProps(`${this.comPlayerName} has shuffled the deck`, `${this.comPlayerName} has shuffled the deck`, "Play on", () => {this.runDrawCard(this.comPlayerName)})     
                showMessageBox.set(true)
                break
            case "see the future":
                setSeeTheFutureCards()
                setDefaultMessageBoxProps(`${this.comPlayerName} has played a see the future`, `${this.comPlayerName} has played a see the future`, "Play on", () => {this.runDrawCard(this.comPlayerName)})
                showMessageBox.set(true)
                break
            default:
                this.cards.push(card)
                this.runDrawCard(this.comPlayerName)
                break;
        }
    }

    /**
     * Returns if the next player is a com player and if so what is the next com player
     * @param currentComPlayer Takes the current com player name
     */
    private getNextPlayer(currentComPlayer: ComPlayerNameType): {passTurnToPlayer: boolean, nextComPlayer?: ComPlayerNameType}  {
        const comAmount = get(comPlayer)

        switch(comAmount) {
            case "1-com-player":
                return {passTurnToPlayer: true} 
            case "2-com-player":
                if(currentComPlayer === "Com 1" && get(remainingTurns) === 0) {
                    return {passTurnToPlayer: false, nextComPlayer: "Com 2"}
                }
                else {
                    return {passTurnToPlayer: true}
                }
            case "3-com-player":
                if(currentComPlayer === "Com 1" && get(remainingTurns) === 0) {
                    return {passTurnToPlayer: false, nextComPlayer: "Com 2"}
                }
                if(currentComPlayer === "Com 2" && get(remainingTurns) === 0) {
                    return {passTurnToPlayer: false, nextComPlayer: "Com 3"}
                }
                else {
                    return {passTurnToPlayer: true}
                }
        }
    }

    private playAttackCard() {
        let turns = get(remainingTurns)
        turns = turns + 2
        remainingTurns.set(turns)

        setDefaultMessageBoxProps(`${this.comPlayerName} has attacked you!`, `You have ${get(remainingTurns)} turns you have to play`, "Play on", () => {this.passTurnToNextPlayer(this.comPlayerName)})
    }

    /**
     * Choses a target for when a com player plays a favor or two matching cat cards
     * 
     * Targets: 
     * 
     * 0 - Player

     * 1 - Com 1
     * 
     * 2 - Com 2
     * 
     * 3 - Com 3
     * 
     * @param exclusion excludes the current com player
     * @param comName takes the name of the current com player
     */
    private choseTarget(exclusion: ComPlayerNameType, comName: ComPlayerNameType) {
        let target = 0 // Set to the player by default when playing with one com player

        switch(comName) {
            case "Com 2":
                target = Math.floor(Math.random() * 2)
                break
        }

        let targetName: ComPlayerNameType

        if(target === 1 || target === 0) {
            targetName = "Com 1"
        }
        else if(target === 2) {
            targetName = "Com 3"
        }
        else if(target === 3) {
            targetName = "Com 3"
        }

        return {target, targetName}

   }

    private askForFavor(target, comName: ComPlayerNameType, targetName: ComPlayerNameType) {
        if(target === 0) {
            favorTarget.set(targetName)
            needGiveFavorCard.set(true)
            setDefaultMessageBoxProps(`${comName} has asked for a favor`, `${comName} has ask for a favor, click on a card from your hand to give it to ${comName}`)
        }
        else {
            setDefaultMessageBoxProps(`${comName} has asked for a favor from ${targetName}`,`${comName} has asked for a favor from ${targetName}`)
        }
 
    }

    private checkForMatchingCatCards(query: string): boolean {
        let cardAmount = 1
        for(const card of this.cards) {
            if(card === query) {
                cardAmount++
            } 
        }

        if(cardAmount >= 2) {
            this.cards.splice(this.cards.indexOf(query), 1)

            return true
        }
        else {
            return false
        }
    }

    private stealCard(target, comName: ComPlayerNameType, targetName: ComPlayerNameType) {
        if(target === 0) {
            const hand = get(playerHand)
            const card: string = hand[Math.floor(Math.random() * hand.length)]
            hand.splice(hand.indexOf(card), 1)
            playerHand.set(hand)

            setDefaultMessageBoxProps(`${comName} has stolen a card from your hand`, `${comName} has ${card.substring(0, 1) === "a" ? "an": "a"} ${card} from your hand`, `Thanks ${comName}!`, () => {this.runDrawCard(this.comPlayerName)})
        }
        else {
            let card: string

            if(targetName === "Com 1") {
                card = com1Player.cards[Math.floor(Math.random() * com1Player.cards.length)]
                com1Player.cards.splice(com1Player.cards.indexOf(card), 1)
            }

            if(comName === "Com 1") {
                com1Player.cards.push(card)
            }

            setDefaultMessageBoxProps(`${comName} has asked for a favor from ${targetName}`,`${comName} has asked for a favor from ${targetName}`)
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