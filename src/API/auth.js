import Axios from "axios";
import {API_URL} from "./const";
class Auth {
  login({username, password}) {
    return Axios.post(API_URL + "/login",{username,password});
  }
  register(user){
    return Axios.post(API_URL+"/register",user)
  }
}

export default new Auth();
