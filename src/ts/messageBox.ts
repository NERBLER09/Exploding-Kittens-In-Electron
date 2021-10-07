import { seeTheFutureCards } from "./gameFunctions.js";

const path = require('path');

const closeMessageBox = ()  => {
    $("#message_box").html("")
    $("#message_box").hide()
}
/** Displays a basic message box to the player */
const displayMessageBox = (header: string, mainText: string) => {
    const messageBoxElement = $(`<h2>${header}</h2> <p>${mainText}</p> <button id="close-button">Close</button>`)

    $("#message_box").append(messageBoxElement)
    $("#close-button").click(closeMessageBox)
    $("#message_box").show()
}
/** Displays a message box to the player with the top 3 cards */
const displaySeeTheFutureCards = (card1: string, card2: string, card3: string) => {
    const card1PathFormatted = card1.split(" ").join("-") 
    const card2PathFormatted = card2.split(" ").join("-") 
    const card3PathFormatted = card3.split(" ").join("-") 
    
    const messageBoxElement = `
        <h2>The top three cards are:</h2>
        <p>(from top to bottom)</p>
        <div class="see-the-future-cards-container">
            <button>
                <img class="see-the-future-card" src="${path.join(__dirname, `../assets/cards/${card1PathFormatted}.png`)}">
            </button>
            <button>
                <img class="see-the-future-card" src="${path.join(__dirname, `../assets/cards/${card2PathFormatted}.png`)}">
            </button>
            <button>
                <img class="see-the-future-card" src="${path.join(__dirname, `../assets/cards/${card3PathFormatted}.png`)}">
            </button>
        </div>


        <button id="close-button">Close</button>
    `

    $("#message_box").append(messageBoxElement)
    $("#close-button").click(closeMessageBox)
    $("#message_box").show()
}

const explodedMessageBox = (header: string, mainText: string) => {
    const messageBoxElement = `
        <h2>${header}</h2>
        <p>${mainText}</p>
        <button id="quit-button">Quit</button>
        <button id="start-new-game">Start a new game</button>
    `
    $("#message_box").append(messageBoxElement)
    $("#quit-button").click(() => window.close())
    $("#start-new-game").click(() => location.reload())
    $("#message_box").show()

}

const showAlterTheFutureMessageBox = (card1: string, card2: string, card3: string) => {
    const card1PathFormatted = card1.split(" ").join("-") 
    const card2PathFormatted = card2.split(" ").join("-") 
    const card3PathFormatted = card3.split(" ").join("-") 

    // TODO: Have selected card change the card face in prompt 
    
    const messageBoxElement = `
        <h2>Alter the future. Here are the top 3 cards :</h2>
        <p>(from top to bottom)</p>
        <div class="see-the-future-cards-container">
            <div class="alter-the-future-card-container">
                <button id="alter-the-future-card1">
                    <img class="see-the-future-card" id="card1" src="${path.join(__dirname, `../assets/cards/${card1PathFormatted}.png`)}">
                </button>

                <label for="card1-select">First Card:</label>
                <select name="card1-select" id="card1-select">
                    <option value="${card1}" selected>${card1}</option>
                    <option value="${card2}">${card2}</option>
                    <option value="${card3}">${card3}</option>
                </select>
            </div>
            <div class="alter-the-future-card-container">
                <button id="alter-the-future-card2">
                    <img class="see-the-future-card" src="${path.join(__dirname, `../assets/cards/${card2PathFormatted}.png`)}">
                </button>

                <label for="card2-select">Second Card:</label>
                <select id="card2-select">
                    <option value="${card1}">${card1}</option>
                    <option value="${card2}" selected>${card2}</option>
                    <option value="${card3}">${card3}</option>
                </select>
            </div>
            <div class="alter-the-future-card-container">    
                <button id="alter-the-future-card3">
                    <img class="see-the-future-card" src="${path.join(__dirname, `../assets/cards/${card3PathFormatted}.png`)}">
                </button>
                
                <label for="card3-select">Third Card:</label>
                <select id="card3-select">
                    <option value="${card1}">${card1}</option>
                    <option value="${card2}">${card2}</option>
                    <option value="${card3}" selected>${card3}</option>
                </select>
            </div>
        </div>


        <button id="close-button">Alter!</button>
    `

    $("#message_box").append(messageBoxElement)
    $("#close-button").click(() => {
        handleAlterTheFutureSubmit($('#card1-select :selected').text(), $('#card2-select :selected').text(), $('#card3-select :selected').text())
    })
    
    $("#message_box").show()
}

const handleAlterTheFutureSubmit = (selectedTopCard: string, selectedMiddleCard: string, selectedBottomCard: string) => {
    // FIXME: Throws error if there a 2 matching cards of the same type (eg, 2 nope cards will throw an error)
    
    if(selectedTopCard === selectedMiddleCard || selectedTopCard === selectedBottomCard) {
        displayMessageBox("Alter the future", "It looks like you were trying to place a card in 2 places")

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)
                showAlterTheFutureMessageBox(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2])
            }
        }, 100);
    }
    else if(selectedMiddleCard === selectedTopCard || selectedMiddleCard === selectedBottomCard) {
        displayMessageBox("Alter the future", "It looks like you were trying to place a card in 2 places")

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)
                showAlterTheFutureMessageBox(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2])
            }
        }, 100);
    }
    else if(selectedBottomCard === selectedTopCard || selectedBottomCard === selectedMiddleCard) {
        displayMessageBox("Alter the future", "It looks like you were trying to place a card in 2 places")

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)
                showAlterTheFutureMessageBox(seeTheFutureCards[0],seeTheFutureCards[1], seeTheFutureCards[2])
            }
        }, 100);
    }
    else {
        seeTheFutureCards[0] = selectedTopCard
        seeTheFutureCards[1] = selectedMiddleCard
        seeTheFutureCards[2] = selectedBottomCard

        closeMessageBox()
        displayMessageBox("Alter the future", "You have altered the future.")

        const waitUntilMessageBoxIsClosed = setInterval(() => {
            if ($("#message_box").is(":hidden")) {
                clearInterval(waitUntilMessageBoxIsClosed)
                closeMessageBox()
            }
        }, 100);
    }
}

export {
    displayMessageBox,
    displaySeeTheFutureCards,
    explodedMessageBox,
    showAlterTheFutureMessageBox
}