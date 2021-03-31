import { useState, useEffect } from "react";
import useIsMount from "./useIsMount.jsx";

// Custom data fetching hook
const useCharacterMarvelApi = () => {
  const [url, setUrl] = useState("");
  const [characterData, setCharacterData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // error checking
  const [isErrorAPI, setisErrorAPI] = useState(false);
  const [isErrorCharacter, setIsErrorCharacter] = useState(false);

  //Custom Hook; first render check
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

  return [{ characterData, isLoading, isErrorAPI, isErrorCharacter }, setUrl];
};

export default useCharacterMarvelApi;
