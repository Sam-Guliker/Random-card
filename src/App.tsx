import React, { FunctionComponent, useState, useEffect} from 'react';
import axios from 'axios'

import logo from './logo.svg';
import './App.css';

/*

  Wat wil je doen ?
  Een shuffle card game maken.

  Functies:
  1. API call - connect to deck 👌
  2. Render it's propperties 👌
  3. Get random card from the same deck. 👌
  4. Shuffle knop. 👌
  5. Tap and get a random card. 👌

  Optional:
  5. List of the previous cards.
  6. Shuffle on gesture card press

  Technologies: 
  - Typescript 👌
  - Use Axios 👌
    https://github.com/axios/axios

  Update *
  1. Zorg ervoor dat er een state is dat bijhoudt welke deck je gebruikt.
  2. Wanneer er een random kaart gepakt wordt moet het van dezelfde deck komen.

  Game states:
  - Start, draw a card! 👌
  - Out of cards , restart. 👌

*/

function App() {
  const [deckData, setDeckData] = useState<any>(null)
  const [deckDataID, setDeckDataID] = useState<any>(null)
  const [randomCard, setRandomCard] = useState<any>(null)
  const [remainingCard, setRemainingCard] = useState<number>(52)
  const [width, setWidth] = useState<number>(window.innerWidth)

  let isMobile: boolean = (width < 768)

  useEffect(() => {
     async function getCardsData() {
      try {
        let request = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        setDeckDataID(request.data.deck_id)
        setDeckData(request.data)
      } catch(e) {
        console.error(e)
      }
    } 
    getCardsData()
  }, [])

  const hanldeWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const getRandomCard = () => {
    async function getRandomCardFetch() {
      try {
        let request = await axios.get(`https://deckofcardsapi.com/api/deck/${deckDataID}/draw/?count=1`)
        if(remainingCard === 0 ) {
          return
        } else {
          setRandomCard(request.data.cards[0])
          setRemainingCard(request.data.remaining)
        }
      } catch(e) {
        console.error(e)
      }
    }

    getRandomCardFetch()
  }

  const shuffleDeck = () => {
    async function shuffleDeckFetch() {
      try {
        let request = await axios.get(`https://deckofcardsapi.com/api/deck/${deckDataID}/shuffle/`)
        setRemainingCard(request.data.remaining)
        setDeckData(request.data)
      } catch(e) {
        console.error(e)
      }
    }
    shuffleDeckFetch()
  }

  return (
    <div className="App">
      <div className="card-container">

        {randomCard === null ? (
            <button onClick={() => {getRandomCard()}}> Press to start!</button>
          ):
          (
            <img 
              onClick={() => {getRandomCard()}}
              onTouchEnd={() => {getRandomCard()}}
              src={randomCard.image}>
            </img>
          )

        }
        {remainingCard || remainingCard === 0 && 
          <button onClick={() => {shuffleDeck()}}> Shuffle Deck!</button>
        } 
      </div>
    </div>
  );
}

export default App;