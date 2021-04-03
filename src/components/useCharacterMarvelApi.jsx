import { useState, useEffect, useReducer } from "react";
import useIsMount from "./useIsMount.jsx";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isErrorAPI: false,
        isErrorCharacter: false,
        characterData: action.payload,
      };
    case "FETCH_ERROR_API":
      return { ...state, isErrorAPI: true, isLoading: false };
    case "FETCH_ERROR_CHARACTER":
      return { ...state, isErrorCharacter: true, isLoading: false };
    default:
      throw new Error();
  }
};

// Custom data fetching hook
const useCharacterMarvelApi = () => {
  const [url, setUrl] = useState("");
  // const [characterData, setCharacterData] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // // error checking
  // const [isErrorAPI, setisErrorAPI] = useState(false);
  // const [isErrorCharacter, setIsErrorCharacter] = useState(false);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isErrorAPI: false,
    isErrorCharacter: false,
    characterData: null,
  });

  //Custom Hook; first render check
  const isFirstRender = useIsMount();

  useEffect(() => {
    if (isFirstRender) {
      console.log("First Render");
    } else {
      console.log("Subsequent Render");
      // returns a promise
      function fetchMarvelAPI() {
        dispatch({ type: "FETCH_INIT" });
        return fetch(url)
          .then((response) => response.json())
          .then((character) => {
            // returns an object
            // console.log("API CHARACTER INFO", character.data);
            // display an error after you find out the character data is garbage
            if (character.data.count) {
              dispatch({
                type: "FETCH_SUCCESS",
                payload: character.data.results[0],
              });
            } else {
              console.log("CHARACTER NOT FOUND 🤷‍♂️");
              dispatch({ type: "FETCH_ERROR_CHARACTER" });
            }
          })
          .catch((err) => {
            dispatch({ type: "FETCH_ERROR_API" });
            return null;
          });
      }

      fetchMarvelAPI();
    }
  }, [url]);

  return [state, setUrl];
};

export default useCharacterMarvelApi;
