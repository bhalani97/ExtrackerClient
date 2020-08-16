import Axios from "axios";
import {API_URL} from "./const";
class Account {
  add(account) {
    return Axios.post(API_URL + "/account",account);
  }
  get(userid){
    console.log(userid)
      return Axios.post(API_URL+"/accounts",{userid})
  }
 
}

export default new Account();
