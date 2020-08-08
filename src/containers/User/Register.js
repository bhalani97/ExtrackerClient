import React, { useEffect,useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Axios from 'axios';

const Register = (props)=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
const [msg,setMsg] = useState('')
    function onUserChange(e){
        setUsername(e.target.value)
    }
    
    function onPassChange(e){
        setPassword(e.target.value)
    }
    function changeRoute(){
      props.history.push('/login')
    }
    function handleSubmit(){

        Axios.post("/register",{username,password}).then(data=>{
            if(data.statusText==="OK"){
                console.log("Account")
                setMsg("Account Create Sucessfully")
                setPassword('')
                setUsername('')
            }else{
                setMsg('Something Went Wrong')
            }
        
        })
    }
    return(
        <div>
            {msg}<br/>
           UserName:<input type='text' name="username" onChange={onUserChange} value={username}></input><br/><br/>

           Password:<input type='password' name="password" onChange={onPassChange} value={password}  ></input><br/>
           <button onClick={handleSubmit}>Submit</button><br />
           <button onClick={changeRoute}>Already Have Account</button>
        </div>
    )
}
export default Register