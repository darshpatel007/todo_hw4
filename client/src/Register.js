import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

import "bootstrap/dist/css/bootstrap.css";

export default function Register() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [user, register] = useResource((username, password) => ({
    url: "/users",
    method: "post",
    data: { email: username, password },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "REGISTER", username: user.data.user.email });
    }
  }, [user]);

  function handleRegisterRequest(e) {
    e.preventDefault();
    if (username.length === 0) {
      alert("Please enter username.");
      return;
    }
    if (password.length === 0 || passwordRepeat.length === 0) {
      alert("Please enter password.");
      return;
    }
    if (password !== passwordRepeat) {
      alert("Both Passwords must be same");
      return;
    }
    register(username, password);
    setUsername("");
    setPassword("");
    setPasswordRepeat("");
  }

  function handleChangeAppUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangeAppPassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeAppPasswordRepeat(e) {
    setPasswordRepeat(e.target.value);
  }

  return (
    <div className="container">
      <hr></hr>
      <form onSubmit={handleRegisterRequest} method="POST">
        <h1>Register</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="register-username"
                id="register-username"
                onChange={handleChangeAppUsername}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="register-password"
                id="register-password"
                onChange={handleChangeAppPassword}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="register-password-repeat"
                id="register-password-repeat"
                onChange={handleChangeAppPasswordRepeat}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3">
            <br />
            <input type="submit" value="Register" className="mt-2" />
          </div>
        </div>
      </form>
    </div>
  );
}
