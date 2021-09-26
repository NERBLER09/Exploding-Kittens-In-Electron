import { com3Player } from "../comPlayerClass.js"
import { choseCardForCom3 } from "./playCardCom3.js"

// Draws a card to com 3
const drawCardForCom3 = () => {
    com3Player.drawCardForComPlayer(false, "Com 3 has drawn a card", null, choseCardForCom3)
}

export { drawCardForCom3 }