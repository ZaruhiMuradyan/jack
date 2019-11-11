import React from 'react';
import hiddenCard from './../images/card-background.jpg';
import { ROLES} from "../actions";

export function getNumericValue(card){
    if(["KING", "JACK", "QUEEN"].includes(card)) {
        return 10;
    } else if(card === "ACE"){
        return 11;
    }
    return card;
};

export var arrayOfNumericValues = 0;

export function showResult(currentCards = [], role = "PLAYER") {
    let result = currentCards.map((card, index) => {
        arrayOfNumericValues += getNumericValue(card.value);
        if(role === "DEALER" && index === 0){

            return (
                <div className="image-container" key={index}>
                    <img src={hiddenCard} alt={card.suit} />
                </div>
                )
        }
        return (
            <div className="image-container" key={index}>
                <img src={card.image} alt={card.suit} />
                <p className="text">{getNumericValue(card.value)}</p>
            </div>
        )
    });
    return result;
};