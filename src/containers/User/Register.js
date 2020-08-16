import React, { useState } from "react";
import {
  Form,
  Input,
  
  Select,
  
  Button,
  AutoComplete,
} from "antd";

import auth from "../../API/auth";


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = (props) => {
  const [form] = Form.useForm();
const [error,setError] = useState('')
  const onFinish = (values) => {
    auth.register(values).then((data)=>{
        if(data.statusText==="OK"){
            props.history.push("/login")
        }
        else{
setError('Something Went Wrong')
        }
    }).catch(error=>{
        setError('Something went wrong')
    })
  };


  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
      <div>
          {error?error:null}
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="firstname"
        label="FirstName"
        rules={[
          {
            required: true,
            message: "Please input your First Name",
          },
        ]}
      >
        <Input />
      </Form.Item>{" "}
      <Form.Item
        name="lastname"
        label="LastName"
        rules={[
          {
            required: true,
            message: "Please input your Last Name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your Username",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="mobile"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
          {
              len:10,
              message:'Please Enter Valid Number'
          },
          
        ]}
      >
        <Input
         
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register;
