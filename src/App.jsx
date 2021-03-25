import React, { useEffect, useState } from "react";

// returns a promise
const searchMarvel = {
  fetchMarvelAPI(characterName) {
    const characterURL = encodeURI(
      `https://gateway.marvel.com/v1/public/characters?name=${characterName}&apikey=3a7a8c25e992e08f4c1620aa8398c36b`
    );

    return fetch(characterURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log("API FETCH: ", data.data.results[0]);
        return data.data.results[0];
      })
      .catch((err) => {
        console.warn("ERR, in API call: ", err);
        return null;
      });
  },
};

function App() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCharacter(info);
  }, [info]);

  const fetchCharacter = (character) => {
    searchMarvel.fetchMarvelAPI(character).then((res) => {
      console.log(res);
      setDescription(res.description);
    });
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  // fetch the api on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setInfo(name);
  };

  return (
    <div className="App">
      <h1 className="App-header">
        Welcome to the Marvel Character Search Engine
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Marvel Character Search
          <br />
          <input
            type="text"
            value={name}
            placeholder="Hulk, Spider-Man, Iron Man, etc."
            onInput={handleChange}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h2>{info}</h2>
      {description && <p>{description}</p>}

      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
