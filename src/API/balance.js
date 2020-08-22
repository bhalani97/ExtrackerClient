
import Axios from 'axios'
import { API_URL } from './const';  
class Balance {
     getBalance(userid) {
        return Axios.get(API_URL+`/home?userid=${userid}`)
    }
}
export default new Balance()