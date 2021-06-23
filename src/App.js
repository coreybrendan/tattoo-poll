import './App.css';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import leftSwallow from './assets/left-swallow.png';
import rightSwallow from './assets/right-swallow.png';
// import smallStar from './assets/small.png';
// import mediumStar from './assets/medium.png';
// import largeStar from './assets/large.png';
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
        <form onSubmit={(event) => {addEmUp(event, userChoice)}} action="submit" type="radio" name="tattoo-poll">
          <label htmlFor="lucky">
            <img className="lucky-tatt" src={lucky} alt="" />
            <input onChange={handleUserChoice} type="radio" id="tattoo1" name="tattoo-poll" value={userChoice} />
          </label>

          <label htmlFor="sailor">
            <img className="sailor-tatt" src={sailor} alt="" />
            <input onChange={handleUserChoice} type="radio" id="tattoo2" name="tattoo-poll" value={userChoice} />
          </label>

          <label htmlFor="panther">
            <img className="panther-tatt" src={panther} alt="" />
            <input onChange={handleUserChoice} type="radio" id="tattoo3" name="tattoo-poll" value={userChoice} />
          </label>

          <button type="submit">Lock In Your Vote!</button>
        </form>
      </section>
      
      <ul>
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
    </div>
  );
}
export default App;