import React from "react";

export const CharacterCard = (props) => {
  return (
    <div className="Marvel-Info">
      <h2 className="center-align">{props.characterData.name}</h2>
      <div className="row">
        <div className="col s12 m4 offset-m4">
          <div className="card">
            <div className="card-image">
              <img
                src={`${props.characterData.thumbnail.path}/portrait_uncanny.jpg`}
                alt={`portrait of ${props.characterData.name}`}
              />
              <span className="card-title">{props.characterData.name}</span>
            </div>
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
