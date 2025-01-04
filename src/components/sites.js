import React from "react";
import "../App.css";

class Sites extends React.Component {
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
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>

        <table className="table-striped table">
          <thead>
            <tr>
              <th>Site Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sites.map((item, t) => {
              return (
                <tr key={t}>
                  <td>{item.site_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Sites;
