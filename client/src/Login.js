import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "./Contexts";

export default function Login() {
  const { dispatch } = useContext(StateContext);
  const [username, setAppUsername] = useState("");
  const [password, setAppPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: {
      email: username,
      password: password,
    },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: "LOGIN", username: user.data.user.email });
    } else {
      let d_res = JSON.parse(JSON.stringify(user));
      if (d_res.isLoading === false) {
        try {
          if (d_res.error.data) {
            alert(d_res.error.data);
          }
        } catch {
          console.log(d_res);
        }
      }
    }
  }, [user]);

  function handleLoginRequest(e) {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter username");
      return;
    }
    if (!password.trim()) {
      alert("Password can not be empty!");
      return;
    }
    login(username, password);
  }

  function handleChangeAppUsername(e) {
    setAppUsername(e.target.value);
  }

  function handleChangeAppPassword(e) {
    setAppPassword(e.target.value);
  }

  return (
    <div className="container">
      <hr></hr>
      <h1>Login</h1>
      <form onSubmit={handleLoginRequest}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="login-username"
                id="login-username"
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
                name="login-password"
                id="login-password"
                onChange={handleChangeAppPassword}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3">
            <br />
            <input type="submit" value="Login" className="mt-2" />
            <br></br>
          </div>
        </div>
      </form>
    </div>
  );
}
