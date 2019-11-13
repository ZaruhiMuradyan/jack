import React from 'react';
import hiddenCard from './../images/card-background.jpg';
import {cardsForDealer, cardsForPlayer, getDeck, ROLES, storeGameScores, URL} from "../actions";

export function showResult(currentCards = [], role, showHiddenCard = false) {
    let result = currentCards.map((card, index) => {
        if(role === ROLES.DEALER && index === 0){
            return (
                <div className="image-container" key={index}>
                    <img src={showHiddenCard ? card.image : hiddenCard} alt={card.suit} />
                </div>
                )
        }
        return (
            <div className="image-container" key={index}>
                <img src={card.image} alt={card.suit} />
            </div>
        )
    });
    return result;
}

export function getData (dispatch, deckId, numberOfCardsOrDecks, playerRole) {
    fetch( `${URL}/${deckId}/draw/?count=${numberOfCardsOrDecks}`, {
        mode: 'cors' //temporary solution ... no-cors throws error for localhost
    }).then( response => response.json()).then( data => {
        let calculatedResult = calculateHand(data.cards);
        switch (playerRole) {
            case "PLAYER":
                dispatch(cardsForPlayer( data.cards));

                dispatch(storeGameScores(ROLES.PLAYER, calculatedResult));
                return;
            case "DEALER" :
                dispatch(cardsForDealer(data.cards));
                dispatch(storeGameScores(ROLES.DEALER, calculatedResult));
                return;
            default:
                dispatch(getDeck(data));
        }

    }).catch( (error) => console.log("failed to get data as " , error));
}

export function calculateHand (hand) {
    let values = hand.map((item, index) => {
        if(["KING", "JACK", "QUEEN"].includes(item.value)) {
            return 10;
        } else if(item.value === "ACE"){
            return "ACE";
        }
        return Number(item.value);
    });

    if(values.includes("ACE")){
        let indexOfAce = values.indexOf("ACE");
        let ace = values.splice(indexOfAce, 1);
        values.push(ace[0]);
    }

    const result = values.reduce( (acc, nextVal) => {
        if((acc < 6 || acc === 10) && nextVal === "ACE" ) {
            return acc + 11;
        } else if(acc >= 6 && nextVal === "ACE"){
            return acc + 1;
        }
        return acc + nextVal;

    });
    return result;
}