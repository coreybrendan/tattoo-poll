import './App.css';
import firebase from './firebase.js';
import ChangeHighlight from "react-change-highlight";
import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import lucky from './assets/lucky.png';
import sailor from './assets/sailor.png';
import panther from './assets/panther-head.png';

function App() {
  // data stored in state
  const [tattoos, setTattoos] = useState([]);
  const [userChoice, setUserChoice] = useState('lucky');
  const [disable, setDisable] = useState(false);
  const [show, toggleShow] = useState(true);
  const ref = React.createRef();
  
  const addEmUp = (event, userChoice) => {
    event.preventDefault();
    
    const dbRef = firebase.database().ref(userChoice);
    
    // snapshot method reads current data in firebase
    dbRef.once('value', (snapshot) => {
      const data = snapshot.val();
      
      // update method increments count property in firebase
      const updates = {};
      // // error handling for no tattoo select
      if (data !== null) {
        updates[`count`] = data.count + 1;
        dbRef.update(updates);
      } else if (data === null) {
        alert(`Select a tattoo to vote!`);
      }
      
      const location = document.querySelector('.results-container');
      location.scrollIntoView();
    });
    
  }
  
  // form event handler
  const handleUserChoice = (event) => {
    setUserChoice(event.target.id);
  }
  
  // hook to call for firebase data
  useEffect(() => {
    const dbRef = firebase.database().ref();

    // event listener for db changes
    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }

      setTattoos(newState);
    });

  }, []);

  return (
    <div>
      <Header />
      <main>
        <section className="form-container wrapper">
          <p>Shops are opening in Toronto, the summer months are finally here and warmer days mean less clothing — and more skin. Naturally, that signals tattoo season is upon us. Help me decide my next tattoo from the options below!</p>
          <form onSubmit={(event) => {addEmUp(event, userChoice)}} action="submit" type="radio" name="tattoo-poll">
            <input onChange={handleUserChoice} type="radio" id="tattoo1" name="tattoo-poll" value={userChoice} />
            <label className="grid-lucky" htmlFor="tattoo1" >
              <img src={lucky} alt="a traditional tattoo with a lucky banner and four playing cards" title="Lucky" />
            </label>

            <input onChange={handleUserChoice} type="radio" id="tattoo2" name="tattoo-poll" value={userChoice} />
            <label className="grid-sailor" htmlFor="tattoo2" >
              <img src={sailor} alt="a traditional tattoo of a sailor framed with rope and an anchor" title="Sailor" />
            </label>

            <input onChange={handleUserChoice} type="radio" id="tattoo3" name="tattoo-poll" value={userChoice} />
            <label className="grid-panther" htmlFor="tattoo3" >
              <img src={panther} alt="a traditional tattoo of a panther head growling" title="Panther" />
            </label>

            <button 
              className="grid-button" 
              type="submit" 
              disabled={disable}
              onClick={() => {
                setDisable(!setDisable);
                toggleShow(!show)
              }} > {show ? 'Vote Now' : 'Thanks For Voting'}
            </button>
          </form>
        </section>
        <section className="results-container">
          <ul>
          <h2>Track The Results Live:</h2>
            {
              tattoos.map((tattoo) => {
                // display tattoo name and count data
                return (
                  <ChangeHighlight key={tattoo.key}>
                    <li ref={ref}>
                      {tattoo.name.name}: {tattoo.name.count}
                    </li>
                  </ChangeHighlight>
                )
              })
            }
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default App;