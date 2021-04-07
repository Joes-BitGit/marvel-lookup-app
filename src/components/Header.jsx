import React from "react";

const Header = () => {
  return (
    // <div>
    //   <h1 className="App-header">
    //     Welcome to the Marvel Character Search Engine
    //   </h1>
    // </div>
    <div className="navbar-fixed">
      <nav className="nav-wrapper">
        <a href="https://www.marvel.com/" className="brand-logo">
          Marvel Search
        </a>
      </nav>
    </div>
  );
};

export default Header;
