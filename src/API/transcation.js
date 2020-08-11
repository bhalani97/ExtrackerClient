import Axios from "axios";
import {API_URL} from "./const";
class Transcation {
  add(transcation) {
    return Axios.post(API_URL + "/transcation",transcation);
  }
  get(userid){
    console.log(userid)
      return Axios.post(API_URL+"/transcations",{userid})
  }
 
}

export default new Transcation();
