import React from "react";
import "../App.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>

        <table className="table-striped table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="http://localhost:3005/sites">
                  http://localhost:3005/sites
                </a>
              </td>
              <td>GET sites ordered by name</td>
            </tr>
            <tr>
              <td>
                <a href="http://localhost:3005/today/2023-03-01">
                  http://localhost:3005/today/2023-03-01
                </a>
              </td>
              <td>GET data for today (2023-03-01)</td>
            </tr>
            <tr>
              <td>
                <a href="http://localhost:3005/sitedata/M1 Dublin Airport">
                  http://localhost:3005/sitedata/M1 Dublin Airport
                </a>
              </td>
              <td>GET data for a site order by date and time</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Home;
