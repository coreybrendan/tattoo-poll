import './App.css';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';

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
      <form onSubmit={(event) => {addEmUp(event, userChoice)}} action="submit" type="radio" name="tattoo-poll">
        <input onChange={handleUserChoice} type="radio" id="tattoo1" name="tattoo-poll" value={userChoice} />
        <label htmlFor="lucky">Lucky</label>

        <input onChange={handleUserChoice} type="radio" id="tattoo2" name="tattoo-poll" value={userChoice} />
        <label htmlFor="sailor">Sailor</label>

        <input onChange={handleUserChoice} type="radio" id="tattoo3" name="tattoo-poll" value={userChoice} />
        <label htmlFor="panther">Panther</label>

        <button type="submit">Lock In Your Vote!</button>
      {/* <button onClick={addEmUp}>Lock In Your Vote!</button> */}
      </form>
      
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