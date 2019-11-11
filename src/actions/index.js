export const HIT_CARD = "HIT_CARD";
export const STAND = "STAND";

export const REMAINING_CARDS = "REMAINING_CARDS";
export const SHOW_HIDDEN_CARD = "SHOW_HIDDEN_CARD";

export const GET_DECK = "GET_DECK";
export const CARDS_FOR_DEALER = "CARDS_FOR_DEALER";
export const CARDS_FOR_PLAYER = "CARDS_FOR_PLAYER";


export const URL = "https://deckofcardsapi.com/api/deck";
export const ROLES = {
    DEALER : "DEALER",
    PLAYER : "PLAYER",
    FOR_BOTH : "FOR_BOTH"
};

//GET DATA
export const getDeck = (deck) => {
    return { type: GET_DECK, deck };
};

export const cardsForPlayer = (cards) => {
    return {type: CARDS_FOR_PLAYER, cards };
};

export const cardsForDealer = (cards) => {
    return {type: CARDS_FOR_DEALER, cards };
};
/////

export const hitCard = (index) => {
    return { type: HIT_CARD, index };
};

export const stand = (stand) => {
    return { type: STAND, stand };
};

export const remainingCards = (numberOfCards) => {
    return { type: REMAINING_CARDS, numberOfCards };
};

export const showHiddenCard = (bool) => {
    return { type: SHOW_HIDDEN_CARD, bool}
};