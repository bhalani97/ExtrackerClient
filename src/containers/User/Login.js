import React, {  useState } from "react";
import Auth from "../../API/auth";

import Axios from "axios";
import SocketApi from "../../API/socketApi";
import { useDispatch,  } from "react-redux";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  function onUserChange(e) {
    setUsername(e.target.value);
  }

  function onPassChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit() {
    console.log(username + password);
    Auth.login(username, password)
      .then((data) => {
        console.log(data);
        if (data.statusText === "OK") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem('user',data.data.userid)
          Axios.defaults.headers.common["access-token"] = data.data.token;
         dispatch({type:'SET',payload:data.data.userid})
        
         const socket = SocketApi(data.data.token)

         dispatch({type:'SET_SOCKET',payload:socket})
          props.history.push("/main");
        } else {
          setMsg("Something Went Wrong");
        }
      })
      .catch((error) => {
        console.log(error)
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
