import React from "react";
import "../App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sites: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3005/users")
      .then((data) => data.json())
      .then((data) => this.setState({ users: data }));
  }

  handleEnter = (e) => {
    if (e.key === "Enter") {
      this.checklogin();
    }
  };

  checklogin = () => {
    const checkUser = document.getElementById("email").value;
    const checkPass = document.getElementById("password").value;

    const filteredUsers = this.state.users.filter(
      (user) => user.email === checkUser
    );

    if (filteredUsers[0].password === checkPass) {
      sessionStorage.setItem("loginToken", "1");
      document.getElementById("password").value = "";
      window.location.href = "./admin";
    } else {
      sessionStorage.setItem("loginToken", "0");
      document.getElementById("password").value = "";
    }
  };

  render() {
    return (
      <form>
        <br />
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            // placeholder="Enter email"
            defaultValue={"flargle@gargle.com"}
            onKeyDown={this.handleEnter}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            autoFocus
            onKeyDown={this.handleEnter}
          />
        </div>
        <div className="d-grid">
          <button
            onClick={this.checklogin}
            type="button"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
export default Login;
