import React, { useState, useEffect } from 'react';
import Dealer from "./Dealer";
import Player from "./Player";
import './App.css';
import {arrayOfNumericValues} from "./Helper";
import {getDeck, showHiddenCard, stand} from './actions';
import { connect } from 'react-redux'

function App({dispatch}) {
  let [deck, setDeck] = useState();
  let [newCard, setNewCard] = useState(0);

  useEffect(()=> {
    // let url = "https://deckofcardsapi.com/api/qddssc6hnh40/shuffle/";
   let shuffle = 'https://deckofcardsapi.com/api/deck/ofgm3yo5tlu0/shuffle/?deck_count=6' ;
    fetch(shuffle, {
      mode: "cors"
    }).then(response => response.json()).then(final => {
        dispatch(getDeck(final));
        setDeck(final);
    });
  },[]);

  useEffect( ()=> {
      if(arrayOfNumericValues){
        console.log(arrayOfNumericValues);
      }
  }, [arrayOfNumericValues]);

  const hitCard = () => {
      console.log(1);
      setNewCard(newCard++);
      dispatch(showHiddenCard(true));
  };

  const standCards = () => {
      dispatch(stand(true));
  };

  return (
    <div className="App">
      {/*<p className="all-cards text">Remaining cards : {deck && deck.remaining}</p>*/}
      <Dealer />
      <div className="buttons-container">
          <button disabled={false} title="Hit" id="hit" onClick={hitCard} />
          <button className="deal text">100</button>
          <button title="Stand" id="stand" onClick={standCards}/>
      </div>
      <Player hit={newCard+1}/>
    </div>
  );
}

export default connect()(App);
