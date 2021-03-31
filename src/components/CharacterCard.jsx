import React from "react";

export const CharacterCard = (characterData) => {
  return (
    <div className="Marvel-Info">
      <h2>{characterData.name}</h2>
      <img
        src={`${characterData.thumbnail.path}/portrait_uncanny.jpg`}
        alt={`portrait of ${characterData.name}`}
      />
      <p>{characterData.description}</p>
    </div>
  );
};

export default CharacterCard;
