import './App.css';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import leftSwallow from './assets/left-swallow.png';
import rightSwallow from './assets/right-swallow.png';
import lucky from './assets/lucky.png';
import sailor from './assets/sailor.png';
import panther from './assets/panther-head.png';

function App() {
  // data stored in state
  const [tattoos, setTattoos] = useState([]);
  const [userChoice, setUserChoice] = useState('lucky');

  // hook to call for firebase data
  useEffect(() => {
    const dbRef = firebase.database().ref();

    // event listener for db changes
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push({ key: key, name: data[key]  });
      }

      setTattoos(newState);
    });

  }, []);

  
  const addEmUp = (event, userChoice) => {
    event.preventDefault();

    // database reference with userChoice
    const dbRef = firebase.database().ref(userChoice);

    // increment count property
    dbRef.once('value', (snapshot) => {
      const data = snapshot.val();

      const updates = {};
      updates[`count`] = data.count + 1;
      dbRef.update(updates);
    });
    
  }
  
  // event handler on form 
  const handleUserChoice = (event) => {
    setUserChoice(event.target.id);
  }

  return (
    <div>
      <header>
        <h1>A tattoo tally</h1>
        <img className="left-swallow" src={leftSwallow} alt="a traditional swallow tattoo facing right" />
        <img className="right-swallow" src={rightSwallow} alt="a traditional swallow tattoo facing left" />
      </header>
      <section className="form-container wrapper">
        <p>Shops are opening in Toronto, the summer months are finally here and warmer weather means less clothing and more skin. Naturally, that signals tattoo season is upon us. Help me decide my next tattoo from the options below!</p>
        <form onSubmit={(event) => {addEmUp(event, userChoice)}} action="submit" type="radio" name="tattoo-poll">
          <input onChange={handleUserChoice} type="radio" id="tattoo1" name="tattoo-poll" value={userChoice} />
          <label className="grid-lucky" htmlFor="tattoo1">
            <img className="lucky-tatt" src={lucky} alt="a traditional tattoo with a lucky banner and four playing cards" />
          </label>

          <input onChange={handleUserChoice} type="radio" id="tattoo2" name="tattoo-poll" value={userChoice} />
          <label className="grid-sailor" htmlFor="tattoo2">
            <img className="sailor-tatt" src={sailor} alt="a traditional tattoo of a sailor framed with rope and an anchor" />
          </label>

          <input onChange={handleUserChoice} type="radio" id="tattoo3" name="tattoo-poll" value={userChoice} />
          <label className="grid-panther" htmlFor="tattoo3">
            <img className="panther-tatt" src={panther} alt="a traditional tattoo of a panther head growling" />
          </label>

          <button className="grid-button" type="submit">Lock It In?!</button>
        </form>
      </section>
      <section className="results-container">
        <ul>
        <h2>Track The Live Results:</h2>
          {
            tattoos.map((tattoo) => {
              // display tattoo name and count data
              return (
                <li key={tattoo.key}>
                  {tattoo.name.name}: {tattoo.name.count}
                </li>
              )
            })
          }
        </ul>
      </section>
    </div>
  );
}
export default App;