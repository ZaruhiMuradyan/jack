import React, {useState, useEffect} from 'react';
import {getData, showResult} from './../Helper';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {ROLES} from "../actions";

function Dealer({hand, cards, deckId, showHiddenCard, dispatch}) {

    useEffect(() => {
        if(deckId){
            getData(dispatch, deckId, 2, ROLES.DEALER);
        }
    },[deckId]);

    return (
        <div>
            <div className="cards-pair">
                {showResult(cards && cards, ROLES.DEALER, showHiddenCard)}
            </div>
            <div>
                <p className="text">{hand}</p>
            </div>
        </div>
    )
    }

Dealer.propTypes = {
    deckId: PropTypes.string,
    cards: PropTypes.array,
    hand: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        deckId: state.deckData.deck_id,
        cards: state && state.dealerCards,
        hand: state && state.gameScores && state.gameScores[0] && state.gameScores[0].DEALER,
        showHiddenCard: state && state.uiChanges && state.uiChanges.hiddenCard
    }
};

export default connect(mapStateToProps)(Dealer);