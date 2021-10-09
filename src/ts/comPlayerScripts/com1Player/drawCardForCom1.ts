import { choseCardForCom2 } from "../com2Player/playCardCom2.js"
import { com1Player } from "../comPlayerClass.js"
import { choseCard } from "./playCardForCom1.js"

// Draws a card to com 1
const drawCardForCom1 = () => {
    // There are 2 or more com players
    const comAmount = localStorage.getItem("comAmount")

    // Checks how many com players are there

    // There is only 1 com player
    if (comAmount === "1comPlayer") {
        com1Player.drawCardForComPlayer(false, "Com 1 has drawn a card", null, choseCard)
    }

    // More then 1 com player
    else {
        com1Player.drawCardForComPlayer(true, "Com 1 has drawn a card", choseCardForCom2, choseCard, "Com 2")
    }
}

export { drawCardForCom1 }