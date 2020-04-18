import React, { Component } from 'react';
import Container from './components/Container'
import ImageCard from './components/ImageCard'
// import ImgContainer from './components/ImgContainer'
import Title from './components/Title'
import friends from './friends.json'
import './App.css';

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a friend's image to gain points! Click on the same one twice and you lose!";

class App extends Component {

  state = {
    friends,
    correctGuesses,
    bestScore,
    clickMessage
  }
  imageClick = id => {

    const friends = this.state.friends;
    const clickedFriend = friends.filter(friend => friend.id === id);

    if (clickedFriend[0].clicked) {

      console.log ("Correct Guesses: " + correctGuesses);
      console.log ("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Bummer! You already clicked on this one."

      for (let i = 0 ; i < friends.length ; i++) {
          friends[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({ correctGuesses });
      this.setState({friends});
    
  } else if (correctGuesses < 11) {

    // Set its value to true
    clickedFriend[0].clicked = true;

    // increment the appropriate counter
    correctGuesses++;
    
    clickMessage = "Great! You haven't click on that one yet! Keep going!";

    if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
    }

    // Shuffle the array to be rendered in a random order
    friends.sort(function(a, b){return 0.5 - Math.random()});

    // Set this.state.friends equal to the new matches array
    this.setState({ friends });
    this.setState({correctGuesses});
    this.setState({clickMessage});
} else {
  // Set its value to true
  clickedFriend[0].clicked = true;

  // restart the guess counter
  correctGuesses = 0;

  // Egg on the user to play again
  clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
  bestScore = 12;
  this.setState({ bestScore });
  
  for (let i = 0 ; i < friends.length ; i++){
      friends[i].clicked = false;
  }

  // Shuffle the array to be rendered in a random order
  friends.sort(function(a, b){return 0.5 - Math.random()});

  // Set this.state.friends equal to the new matches array
  this.setState({ friends });
  this.setState({correctGuesses});
  this.setState({clickMessage});

}
  }
  render() {
    return (
      <Container>
          <Title>Clicky Game</Title>
  
          <h3 className="scoreSummary">
              {this.state.clickMessage}
          </h3>
          
          <h3 className="scoreSummary card-header">
              Correct Guesses: {this.state.correctGuesses} 
              <br />
              Best Score: {this.state.bestScore} 
          </h3>
          <div className="container">
          <div className="row">
          {friends.map(friend => (
              <ImageCard
                  imageClick={this.imageClick}
                  id={friend.id}
                  key={friend.id}
                  image={friend.image}
              />
          ))}
          </div>
          </div>

      </Container>
  );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
