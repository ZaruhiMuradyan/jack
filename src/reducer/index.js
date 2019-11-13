import {combineReducers} from "redux";
import {
    HIT_CARD,
    STAND,
    SHOW_HIDDEN_CARD,
    REMAINING_CARDS,
    CARDS_FOR_DEALER,
    CARDS_FOR_PLAYER, GAME_SCORES
} from './../actions';

const uiChanges = (state = {}, action) => {
    switch (action.type) {
        case SHOW_HIDDEN_CARD:
            return Object.assign({}, state, {hiddenCard: action.bool});
        default:
            return state;
    }
};

const deckData = (state = {}, action) => {
    if (action.type) {
            return Object.assign( {}, state, action.deck);
    }
    return state;
};

const playerCards = (state = [], action) => {
    if(action.type === CARDS_FOR_PLAYER) {
        return [ ...state, ...action.cards];
    }
    return state;
};

const dealerCards = (state = [], action) => {
    if(action.type === CARDS_FOR_DEALER) {
        return [ ...state, ...action.cards];
    }
    return state;
};

const hitCardReducer = (state = [], action) => {
    if (action.type === HIT_CARD) {
        return [...state, action.index];
    }
    return state;
};

const calculations = (state = {}, action) => {
    switch (action.type) {
        case REMAINING_CARDS:
            return Object.assign({}, state, { remainingCards: action.numberOfCards});
        case STAND:
            return Object.assign({}, state,{stand: action.stand});
        default:
            return state;

    }
};

const gameScores = (state = [], action) => {
    if(action.type === GAME_SCORES) {
        return [
            ...state,
            {[action.role]: action.hand}
        ]
    }
    return state;
};








const mainReducer = combineReducers({
    deckData,
    dealerCards,
    playerCards,
    calculations,
    hitCardReducer,
    uiChanges,
    gameScores
});

export default mainReducer;

// return state.map((item, index) => {
//     if (index !== action.index) {
//         // This isn't the item we care about - keep it as-is
//         return item
//     }
//
//     // Otherwise, this is the one we want - return an updated value
//     return {
//         ...item,
//         ...action.item
//     }
// });