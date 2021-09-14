import { choseCardForCom3 } from "../com3Player/playCardCom3.js"
import { com2Player } from "../comPlayerClass.js"
import { choseCardForCom2 } from "./playCardCom2.js"

// Draws a card to com 2
const drawCardForCom2 = () => {
    // There are 2 or more com players
    const comAmount = localStorage.getItem("comAmount")

    // Checks how many com players are there

    // There is only 1 com player
    if (comAmount === "2comPlayer") {
        com2Player.drawCardForComPlayer(false, null, choseCardForCom2)
    }

    // More then 2 com players
    else {
        com2Player.drawCardForComPlayer(true, choseCardForCom3, choseCardForCom2, "Com 3")
    }
}

export { drawCardForCom2 }