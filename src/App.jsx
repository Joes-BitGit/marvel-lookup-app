import React, { useState } from "react";
import { publicAPI } from "./API.js";

// Components
import Header from "./components/Header.jsx";
import Loading from "./components/Loading.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import CharacterNameForm from "./components/CharacterNameForm.jsx";
import CharacterError from "./components/CharacterError.jsx";
// Custom hook that fetches to the marvel api for a character
import useCharacterMarvelApi from "./components/useCharacterMarvelApi.jsx";

function App() {
  const [query, setQuery] = useState("");

  // Custom Hook: checks the marvel api for character
  const [
    { marvelData, isLoading, isErrorAPI, isErrorCharacter },
    setFetch,
  ] = useCharacterMarvelApi();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  // fetch the api on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setFetch(
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
      {isErrorAPI && (
        <div>
          Something Went Horribly Wrong with the API😭 Please refresh the page
          to continue
        </div>
      )}
      {isErrorCharacter ? (
        <CharacterError />
      ) : isLoading ? (
        <Loading />
      ) : (
        marvelData && <CharacterCard characterData={marvelData} />
      )}
      {console.log("Character Data HERE:", marvelData)}
      <footer>
        <a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>
      </footer>
    </div>
  );
}

export default App;
