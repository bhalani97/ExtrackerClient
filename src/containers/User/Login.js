import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import Axios from "axios";
import Auth from "../../API/auth";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  function onUserChange(e) {
    setUsername(e.target.value);
  }

  function onPassChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit() {

   Auth.login(username,password)
      .then((data) => {
        console.log(data);
        if (data.statusText === "OK") {
          props.history.push("/main");
        } else {
          setMsg("Something Went Wrong");
        }
      })
      .catch((error) => {
        setMsg("Username or Password is invalid");
      });
  }
  return (
    <div>
      {msg}
      <br />
      UserName:
      <input
        type="text"
        name="username"
        onChange={onUserChange}
        value={username}
      ></input>
      <br />
      <br />
      Password:
      <input
        type="password"
        name="password"
        onChange={onPassChange}
        value={password}
      ></input>
      <br />
      <button onClick={handleSubmit}>Login</button>
      <br />
    </div>
  );
};
export default Login;
