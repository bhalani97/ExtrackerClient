import Axios from "axios";
import {API_URL} from "./const";
class Transcation {
  add(transcation) {
    return Axios.post(API_URL + "/transcation",transcation);
  }
  get(data){
    console.log(data)
      return Axios.post(API_URL+"/transcations",data)
  }
  update(transcation){
    return Axios.put(API_URL + "/transcation",transcation);
      
  }
  delete(id){
    console.log("sdfs",id)
      return Axios.delete(API_URL + "/transcation",{data:{id}});
      
  }
 
}

export default new Transcation();
