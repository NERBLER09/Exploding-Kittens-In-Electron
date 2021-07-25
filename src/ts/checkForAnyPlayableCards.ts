/** Checks if the passed hand has any cards that it can play
 * Used to prevent an infinite loop
 */

const checkForPlayableCard = (hand: string[]): boolean => {
    let noPlayableCard = true
    
    for(const e of hand) {
        if(e !== "exploding kittens" && e !== "diffuse" && e !== "nope") {
            console.log("Playable card")
            noPlayableCard = false
            return true
        }
    }
    if(noPlayableCard === true) {
        console.log("no playable card")
        
        return false
    }
}

export { checkForPlayableCard }