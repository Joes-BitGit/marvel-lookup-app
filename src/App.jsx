import React from 'react';

const characterURL = encodeURI('https://gateway.marvel.com/v1/public/characters?name=Spider-Man&apikey=3a7a8c25e992e08f4c1620aa8398c36b');

const character = fetch(characterURL)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    return data.data.results[0]

  })

function App() {
  return (
    <div className="App">
      <h1 className="App-header">
        Welcome to the Marvel Character Search
      </h1>
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
