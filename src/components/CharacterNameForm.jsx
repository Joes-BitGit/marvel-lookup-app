import React from "react";

const CharacterNameForm = (props) => {
  return (
    <div className="row">
      <form onSubmit={props.handleSubmit} className="col s12 ">
        <div className="input-field col s8">
          <i className="material-icons prefix">account_circle</i>
          <input
            type="text"
            value={props.query}
            // placeholder="Hulk, Spider-Man, Iron Man, etc."
            onInput={props.handleChange}
            className="validate"
            id="character_name"
            required
          />
          <label htmlFor="character_name">Marvel Character Name</label>
        </div>
        <div className="input-field col s4">
          <button
            className="btn wave-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterNameForm;
