import React from "react";

const CharacterNameForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="">
        Marvel Character Search
        <br />
        <input
          type="text"
          value={props.query}
          placeholder="Hulk, Spider-Man, Iron Man, etc."
          onInput={props.handleChange}
          required
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CharacterNameForm;
