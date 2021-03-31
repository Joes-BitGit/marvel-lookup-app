import React, { useEffect, useRef, useState } from "react";
import { publicAPI } from "./API.js";

// custom hook: NEED TO EXPORT THIS
const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

function App() {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [characterData, setCharacterData] = useState();
  // Custom Hook
  const isFirstRender = useIsMount();

  useEffect(() => {
    if (isFirstRender) {
      console.log("First Render");
    } else {
      console.log("Subsequent Render");
      // returns a promise
      function fetchMarvelAPI() {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // console.log("API FETCH: ", data.data);
            // returns an object
            setCharacterData(data.data.results[0]);
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
      <h1 className="App-header">
        Welcome to the Marvel Character Search Engine
      </h1>

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
      {characterData && (
        <div className="Marvel-Info">
          <h2>{characterData.name}</h2>
          <img
            src={`${characterData.thumbnail.path}/portrait_uncanny.jpg`}
            alt={`portrait of ${characterData.name}`}
          />
          <p>{characterData.description}</p>
        </div>
      )}
      {characterData && console.log(characterData)}
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
