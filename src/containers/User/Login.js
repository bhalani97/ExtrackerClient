import React, { useState } from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import Axios from "axios";
import SocketApi from "../../API/socketApi";
import { useDispatch } from "react-redux";
import auth from "../../API/auth";
import {  UserOutlined,KeyOutlined } from '@ant-design/icons';

const Login = (props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    auth
      .login(values)
      .then((data) => {
        if (data.statusText === "OK") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", data.data.userid);
          Axios.defaults.headers.common["access-token"] = data.data.token;
          dispatch({ type: "SET", payload: data.data.userid });

          const socket = SocketApi(data.data.token);

          dispatch({ type: "SET_SOCKET", payload: socket });
          props.history.push("/home");
        } else {
          setError("Something Went Wrong");
        }
      })
      .catch((error) => {
        setError("Username or Password Invalid");
      });
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <div >
      {error ? error : null}
      <Form form={form} name="login" onFinish={onFinish} scrollToFirstError>
        <Form.Item
         name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username",
            },
          ]}
        >
          <Input 
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{width:"200px"}} />
        </Form.Item>
        <Form.Item
          name="password"
    
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          
        >
          <Input.Password 
          placeholder="Password"
            prefix={<KeyOutlined className="site-form-item-icon" />}
            style={{width:"200px"}} 
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
