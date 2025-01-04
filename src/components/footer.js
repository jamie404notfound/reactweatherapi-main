import React from "react";
import "../App.css";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>

        <hr />

        <div className="text-center p-3">
          <footer id="footer">Copyright © 2023 - Jamie404</footer>
        </div>
      </div>
    );
  }
}

export default Footer;
