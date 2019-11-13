import React, { useEffect} from 'react';
import {showResult, getData, calculateHand} from './../Helper';
import {connect} from "react-redux";
import {ROLES, storeGameScores} from "../actions";
import PropTypes from 'prop-types';

function Player({ hand, cards, deckId, dispatch}) {

    useEffect(() => {
        if(deckId){
            getData(dispatch, deckId, 2, ROLES.PLAYER);
        }
        },[deckId]);

    return (
        <div>
            <div className="cards-pair">
                {showResult(cards && cards, "PLAYER")}
            </div>
            <div>
                <p className="text">{hand}</p>
            </div>
        </div>
    )
}

Player.propTypes = {
    deckId: PropTypes.string,
    cards: PropTypes.array,
    hand: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        deckId: state && state.deckData && state.deckData.deck_id,
        cards: state && state.playerCards,
        hand: state && state.gameScores && state.gameScores[0] && state.gameScores[0].PLAYER
    }
};

export default connect(mapStateToProps)(Player);