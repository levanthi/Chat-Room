import { ref, child, get } from "firebase/database"
import {db} from '../Firebase/config'
async function useGetData(path)
{
    const dbRef = ref(db);
    let temp
    await get(child(dbRef, path)).then((snapshot) => {
    if (snapshot.exists()) {
        temp = snapshot.val()
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    })
    console.log(temp)
}

export default useGetData