import React, { useEffect, useState } from "react";
import { publicAPI } from "./API.js";
// Components
import Header from "./components/Header.jsx";
import Loading from "./components/Loading.jsx";
import CharacterCard from "./components/CharacterCard.jsx";

// Custom hook that checks initial mount
import useIsMount from "./components/useIsMount.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [characterData, setCharacterData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Custom Hook
  const isFirstRender = useIsMount();

  useEffect(() => {
    if (isFirstRender) {
      console.log("First Render");
    } else {
      console.log("Subsequent Render");
      // returns a promise
      function fetchMarvelAPI() {
        setIsLoading(true);
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // console.log("API FETCH: ", data.data);
            // returns an object
            setCharacterData(data.data.results[0]);
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn("ERR, in API call: ", err);
            return null;
          });
      }

      fetchMarvelAPI();
    }
  }, [url]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  // fetch the api on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(
      `https://gateway.marvel.com/v1/public/characters?name=${query}&apikey=${publicAPI}`
    );
  };

  return (
    <div className="App">
      <Header />

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Marvel Character Search
          <br />
          <input
            type="text"
            value={query}
            placeholder="Hulk, Spider-Man, Iron Man, etc."
            onInput={handleChange}
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {/* Stretch Goal: No need to rerender this part constantly when typing*/}
      {isLoading ? <Loading /> : characterData && CharacterCard(characterData)}

      {characterData && console.log(characterData)}
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
