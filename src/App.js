import React, { useEffect } from 'react';
import Dealer from "./Dealer";
import Player from "./Player";
import './App.css';
import { getData} from "./Helper";
import {getDeck, ROLES, showHiddenCard, stand} from './actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function App({dispatch, deckId, playerCards}) {

  useEffect(()=> {
    // let url = "https://deckofcardsapi.com/api/qddssc6hnh40/shuffle/";
   let shuffle = 'https://deckofcardsapi.com/api/deck/ofgm3yo5tlu0/shuffle/?deck_count=6' ;
    fetch(shuffle, {
      mode: "cors"
    }).then(response => response.json()).then(final => {
        dispatch(getDeck(final));
    }).catch( error => console.log("failed to get deck data", error));
  },[]);

  const hitCard = () => {
      dispatch(showHiddenCard(true));
      getData(dispatch, deckId, 1, ROLES.PLAYER);
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
      <Player />
    </div>
  );
};

 App.propTypes = {
     dispatch: PropTypes.func,
     deckId: PropTypes.string
 };

const mapStateToProps = (state) => {
    return {
        deckId: state && state.deckData && state.deckData.deck_id,
        playerCards: state && state.playerCards,
        showHiddenCard: state && state.uiChanges && state.uiChanges.hiddenCard
    }
};

export default connect(mapStateToProps)(App);
