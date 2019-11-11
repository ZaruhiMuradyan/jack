import React, {useState, useEffect} from 'react';
import {showResult} from './../Helper';
import {connect} from "react-redux";
import {URL, ROLES, getDeck, cardsForDealer, cardsForPlayer} from "../actions";

function Player({hit, cards, deckId, dispatch}) {

    useEffect(() => {
        if(deckId){
            getData(deckId, 2, ROLES.PLAYER);
        }
        },[deckId]);


    function getData (deckId, numberOfCardsOrDecks, playerRole) {
        fetch( `${URL}/${deckId}/draw/?count=${numberOfCardsOrDecks}`, {
        mode: 'cors' //temporary solution ... no-cors throws error for localhost
        }).then( response => response.json()).then( data => {
            switch (playerRole) {
                case "PLAYER":
                    dispatch(cardsForPlayer( data.cards));
                    return;
                case "DEALER" :
                    dispatch(cardsForDealer(data.cards));
                    return;
                default:
                    dispatch(getDeck(data));
            }

        });
    }

    useEffect( () => {
        console.log(hit);
        getData(deckId, 1, ROLES.PLAYER);
            // fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
            //     mode: 'cors', // no-cors
            // }).then(response => response.json()).then(data => setInitialCards(initialCards.concat(data && data.cards)));
    }, [hit]);

    return (
        <div>
            <div className="cards-pair">
                {showResult(cards, "PLAYER" )}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        deckId: state && state.deckData && state.deckData.deck_id,
        cards: state && state.deckData && state.deckData.player
    }
};

export default connect(mapStateToProps)(Player);