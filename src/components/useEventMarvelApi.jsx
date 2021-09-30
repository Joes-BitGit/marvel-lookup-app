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
        isErrorEvent: false,
        eventData: action.payload,
      };
    case "FETCH_ERROR_API":
      return { ...state, isErrorAPI: true, isLoading: false };
    case "FETCH_ERROR_EVENT":
      return { ...state, isErrorEvent: true, isLoading: false };
    default:
      throw new Error();
  }
};

// Custom data fetching hook
const useCharacterMarvelApi = () => {
  const [url, setUrl] = useState("");

  // dispatch is a function that alters the state object and sends info
  // args - action which has a type and an optional payload
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isErrorAPI: false,
    isErrorEvent: false,
    eventData: null,
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
          .then((event) => {
            // returns an object of Character info
            // display an error after you find out the character data is garbage
            if (event.data.count) {
              dispatch({
                type: "FETCH_SUCCESS",
                payload: event.data.results[0],
              });
            } else {
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
