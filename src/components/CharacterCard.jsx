import React from "react";

export const CharacterCard = (props) => {
  return (
    <div className="Marvel-Info">
      <h2>{props.characterData.name}</h2>
      <img
        src={`${props.characterData.thumbnail.path}/portrait_uncanny.jpg`}
        alt={`portrait of ${props.characterData.name}`}
      />
      <p>{props.characterData.description}</p>
    </div>
  );
};

export default CharacterCard;
