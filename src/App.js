import './App.css';
import firebase from './firebase.js';
import { useState, useEffect } from 'react';

function App() {
  // store data in state
  const [tattoos, setTattoos] = useState([]);
  const [votes, setVotes] = useState(0);
  // let [voteLucky, setVoteLucky] = useState(0);
  // let [voteSailor, setVoteSailor] = useState(0);
  // let [votePanther, setVotePanther] = useState(0);

  useEffect(() => {
    // ref to firebase db
    const dbRef = firebase.database().ref();

    // event listener to fire when a db change occurs
    dbRef.on('value', (response) => {
      // console.log(response.val());
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push(data[key]);
      }

      setTattoos(newState);
    });

  }, []);

  const handleChange = (event) => {
    setVotes(event.target.value);
  }
  
  return (
    <div>
      <ul>
        {
          tattoos.map((tattoo) => {
            return(
              <li key={tattoo.key}>
                <p>{tattoo}</p>
                <button onClick={handleChange} value={votes + 1}>Click To Vote</button>
                <p>Votes so far:</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
