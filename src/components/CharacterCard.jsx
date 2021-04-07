import React from "react";

export const CharacterCard = (props) => {
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
              <p>{props.characterData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
