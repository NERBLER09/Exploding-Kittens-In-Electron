type catCard = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon"

type card = "potato cat" | "taco cat" | "rainbow ralphing cat" | "beard cat" | "cattermellon" | "nope" | "attack" | 
"favor" | "shuffle" | "see the future" | "defuse" | "exploding kitten" | "skip"

type cardHyphened = "potato-cat" | "taco-cat" | "rainbow-ralphing-cat" | "beard-cat" | "cattermellon" | "nope" | "attack" | 
"favor" | "shuffle" | "see-the-future" | "defuse" | "exploding-kitten"| "skip"

interface cardAmounts {
    "nope": number,
    'attack': number,
    'skip': number,
    'favor': number,
    'shuffle': number,
    'see the future': number,
    'potato cat': number,
    'taco cat': number,
    'rainbow ralphing cat': number,
    'beard cat': number,
    'cattermellon': number,
    'defuse': number,
    'exploding-kitten'?: number
}

export {
    catCard,
    card,
    cardHyphened,
    cardAmounts
}