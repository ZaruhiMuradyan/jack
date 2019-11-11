import {combineReducers} from "redux";
import {
    HIT_CARD,
    STAND,
    SHOW_HIDDEN_CARD,
    REMAINING_CARDS,
    GET_DECK,
    CARDS_FOR_DEALER,
    CARDS_FOR_PLAYER,
    ROLES
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
    switch (action.type) {
        case GET_DECK:
            return Object.assign( {}, state, action.deck);
        case CARDS_FOR_DEALER:
            return Object.assign( {}, state, { dealer: action.cards });
        case CARDS_FOR_PLAYER:
            return Object.assign( {}, state, { player: action.cards });
            //Object.assign( {}, state,  { player: action.cards });
        default:
            return state;
    }
}

const hitCardReducer = (state = [], action) => {
    if (action.type === HIT_CARD) {
        return [...state, action.index];
    }
    return state;
};

const calculate = (state = {}, action) => {
    switch (action.type) {
        case REMAINING_CARDS:
            return Object.assign({}, state, { remainingCards: action.numberOfCards});

        case STAND:
            return Object.assign({}, state,{stand: action.stand});
        default:
            return state;

    }
};

const mainReducer = combineReducers({
    deckData,
    calculate,
    hitCardReducer,
    uiChanges
});

export default mainReducer;