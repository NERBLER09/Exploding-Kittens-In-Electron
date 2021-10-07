type catCard = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon"

type card = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon" | "nope" | "attack" | 
"favor" | "shuffle" | "see the future" | "defuse" | "exploding kitten" | "skip" | "draw from the bottom" | "alter the future"

type cardAmounts = {
    [key in card]: number
}

export {
    catCard,
    card,
    cardAmounts
}