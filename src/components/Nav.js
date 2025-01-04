import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "../App.css";

let check = sessionStorage.getItem("loginToken");

const onLinkClick = (e) => {
  e.preventDefault();
  check = sessionStorage.setItem("loginToken", "0");
  window.location.href = "./";
};

class Nav extends React.Component {
  render() {
    if (check !== "1") {
      return (
        <div>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          ></link>

          <nav className="navbar navbar-expand-sm bg-light navbar-default navbar-fixed-top">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sites">
                  Sites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/today">
                  Today
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/live">
                  Live
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livemap">
                  Live Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stats">
                  Stats
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          ></link>

          <nav className="navbar navbar-expand-sm bg-light navbar-default navbar-fixed-top">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sites">
                  Sites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livemap">
                  Live Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={onLinkClick}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Nav;
