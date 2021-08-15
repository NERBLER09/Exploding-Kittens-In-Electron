// import { checkForPlayableCard } from "../checkForAnyPlayableCards.js";
// import { card } from "../models/cards.interface";
// import { checkForNopeCardInHand, checkIfNopeCardPlayed, nopePlayedCard } from "../nopePlayedCard.js";
// import { updateDiscardPile } from "../updateDiscardPile.js";

// type comPLayerName = "Com 1" | "Com 2" | "Com 3"

// const decideCardToPlay = (comPlayerHand: card[], comPLayerName: comPLayerName): card => {
//     // Choses a card to play from com 1's hand
//     const cardToPlay: card = comPlayerHand[Math.floor(Math.random() * comPlayerHand.length)]

//     console.table(comPlayerHand)

//     // Sets a pause 
//     setTimeout(() => {
//         // Dose nothing here
//     }, 1000);

//     console.log("Choosing card to play (com 1)")

//     if (checkForPlayableCard(comPlayerHand, cardToPlay) == true) {
//         updateDiscardPile(cardToPlay)

//         // Removes the played card from com 1's hand
//         const cardIndex = comPlayerHand.indexOf(cardToPlay)
//         comPlayerHand.splice(cardIndex, 1)

//         if(checkForNopeCardInHand()) {
//             nopePlayedCard(cardToPlay, comPLayerName)
                        
//             const waitUntilMessageBoxClosed: NodeJS.Timeout = setInterval(() => {
//                 // Checks if the player has closed the #message_box
//                 if ($("#message_box").is(":hidden")) {
//                     clearInterval(waitUntilMessageBoxClosed)

//                     if (!checkIfNopeCardPlayed()) {
//                         console.log("Playing card")
//                         return cardToPlay
//                     }
//                     else if(checkIfNopeCardPlayed()) {
//                         console.log("Drawing card2")
//                         return null
//                     }     
//                 }
//                 else {
//                     console.log("pngrip")
//                 }
//             }, 100);
//         }
//         else {
//             console.log("Playing card2")
//             return cardToPlay
//         }
//     }
//     else {
//         console.log("Drawing card2")
//         return null
//     }
// }

// export { decideCardToPlay }