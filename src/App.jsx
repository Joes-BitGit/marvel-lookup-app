import React, { useEffect, useState } from "react";
import { publicAPI } from "./API.js";
// Components
import Header from "./components/Header.jsx";
import Loading from "./components/Loading.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import CharacterNameForm from "./components/CharacterNameForm.jsx";
import CharacterError from "./components/CharacterError.jsx";
// Custom hook that checks initial mount
import useIsMount from "./components/useIsMount.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [characterData, setCharacterData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // error checking
  const [isErrorAPI, setisErrorAPI] = useState(false);
  const [isErrorCharacter, setIsErrorCharacter] = useState(false);
  // Custom Hook: checks for the initial state of rendering
  const isFirstRender = useIsMount();

  useEffect(() => {
    if (isFirstRender) {
      console.log("First Render");
    } else {
      console.log("Subsequent Render");
      // returns a promise
      function fetchMarvelAPI() {
        setisErrorAPI(false);
        setIsErrorCharacter(false);
        setIsLoading(true);
        return fetch(url)
          .then((response) => response.json())
          .then((character) => {
            // returns an object
            // console.log("API CHARACTER INFO", character.data);
            // display an error after you find out the character data is garbage
            if (character.data.count) {
              setCharacterData(character.data.results[0]);
            } else {
              console.log("CHARACTER NOT FOUND 🤷‍♂️");
              setIsErrorCharacter(true);
            }

            setIsLoading(false);
          })
          .catch((err) => {
            setisErrorAPI(true);
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
    setQuery("");
  };

  return (
    <div className="App">
      <Header />
      <CharacterNameForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        query={query}
      />

      {isErrorAPI && <div>Something Went Horribly Wrong with the API😭</div>}
      {/* {isErrorCharacter && <div>Character Not Found 🤷‍♂️ </div>} */}
      {/* <CharacterError isErrorCharacter={isErrorCharacter} /> */}
      {isErrorCharacter ? (
        <CharacterError />
      ) : isLoading ? (
        <Loading />
      ) : (
        characterData && <CharacterCard characterData={characterData} />
      )}
      {/* {isLoading ? (
        <Loading />
      ) : (
        characterData && <CharacterCard characterData={characterData} />
      )} */}

      {console.log("Character Data:", characterData)}
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
