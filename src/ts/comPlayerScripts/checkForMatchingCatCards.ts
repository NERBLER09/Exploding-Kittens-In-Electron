type catCard = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon"

/** Check if there are to matching cards in the hand */
const checkForMatchingCatCards = (hand: string[], catCard: catCard): boolean => {
    for(const e of hand) {
        if(e === catCard) {
            return true
        }
    }

    return false
}

export {checkForMatchingCatCards}