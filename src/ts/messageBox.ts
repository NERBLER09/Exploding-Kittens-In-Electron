const path = require('path');

const closeMessageBox = ()  => {
    $("#message_box").html("")
    $("#message_box").hide()
}

const displayMessageBox = (header: string, mainText: string) => {
    const messageBoxElement = $(`<h2>${header}</h2> <p>${mainText}</p> <button id="close-button">Close</button>`)

    $("#message_box").append(messageBoxElement)
    $("#close-button").click(closeMessageBox)
    $("#message_box").show()
}

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

export {
    displayMessageBox,
    displaySeeTheFutureCards
}