import React from "react";
import { publicAPI } from "../API.js";
// Custom hook that fetches to the marvel api for a character
import useEventMarvelApi from "./useEventMarvelApi";

export const CharacterCard = (props) => {
  const handleEventSearch = (uri) => {
    // display image of event
    setFetch(`${uri}?apikey=${publicAPI}`);
  };

  // Custom Hook: checks the marvel api for character
  const [
    { eventData, isLoading, isErrorAPI, isErrorCharacter },
    setFetch,
  ] = useEventMarvelApi();

  return (
    <div className="Marvel-Info container">
      <div className="col s12 l6">
        <h2 className="header">{props.characterData.name}</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              src={`${props.characterData.thumbnail.path}/portrait_uncanny.jpg`}
              alt={`portrait of ${props.characterData.name}`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>
                {props.characterData.description !== ""
                  ? props.characterData.description
                  : "CLASSIFIED INFORMATION"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Display events url here */}
      <ol>
        {props.characterData.events.items.map((eventObj, i) => (
          // use arrow function to not immediately invoke the handleEventSearch
          <li key={i} onClick={() => handleEventSearch(eventObj.resourceURI)}>
            {eventObj.name}
          </li>
        ))}
      </ol>
      {eventData && (
        <img
          src={`${eventData.thumbnail.path}/portrait_uncanny.jpg`}
          alt={`portrait of ${eventData.title}`}
        />
      )}
    </div>
  );
};

export default CharacterCard;
