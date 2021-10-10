type catCard = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon" | "feral cat"

type card = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon" | "nope" | "attack" | 
"favor" | "shuffle" | "see the future" | "defuse" | "exploding kitten" | "skip" | "draw from the bottom" | "alter the future" |
"feral cat" | "targeted attack" | "super skip" | "catomic bomb" | "see the future x5" | "alter the future x5" | "swap top and bottom"

type cardAmounts = {
    [key in card]: number
}

export {
    catCard,
    card,
    cardAmounts
}