import React, {useState, useEffect} from 'react';
import {showResult} from './../Helper';
import { connect } from "react-redux";

function Dealer({deckId}) {
    let [initialCards, setInitialCards] = useState([]);

    useEffect(()=>{
        if(deckId){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
                mode: 'cors', // no-cors
            }).then(response => response.json()).then(data => setInitialCards(data && data.cards));
        }
    },[deckId]);


    return (
        <div>
            <div className="cards-pair">
                {showResult(initialCards, "dealer")}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        deckId: state.deckData.deck_id
    }
};

export default connect(mapStateToProps)(Dealer);