import React from 'react';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="example.com">Smart Spaces</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="example.com">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="example.com">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="example.com">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="example.com">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;