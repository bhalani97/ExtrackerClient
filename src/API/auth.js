import Axios from "axios";
import {API_URL} from "./const";
class Auth {
  login(username, password) {
    return Axios.post(API_URL + "/login");
  }
}

export default new Auth();
