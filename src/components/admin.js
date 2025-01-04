import React from "react";
import "../App.css";

let check = sessionStorage.getItem("loginToken");

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sites: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3005/sites")
      .then((data) => data.json())
      .then((data) => this.setState({ sites: data }));
  }

  render() {
    if (check !== "1") {
      window.location.href = "./";
    } else {
      return (
        <div>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          />

          <table className="table-striped table">
            <thead>
              <tr>
                <th>Site Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sites.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <input type="text" defaultValue={item.site_name} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="button" />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
export default Admin;
