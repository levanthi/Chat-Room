import {db} from '../Firebase/config'
import { ref, set } from "firebase/database"

function writeData(collection,slug='',state) {
    set(ref(db,collection+slug), {
      ...state
    })
    .then(()=>{
      console.log('susscess')
    })
    .catch(err=>console.log(err))
  }

export default writeData