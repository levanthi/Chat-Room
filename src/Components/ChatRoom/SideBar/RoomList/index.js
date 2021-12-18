import {useRef,useState,useContext} from 'react'
import { ref, child, get } from "firebase/database"

import writeData from '../../../../Hooks/useFirebase'
import styles from './main.module.scss'
import {ReactComponent as Gthan} from '../../../../static/icon/greater-than-solid.svg'
import {ReactComponent as Plus} from '../../../../static/icon/plus-square-regular.svg'
import {context} from '../../../../App'
import {db} from '../../../../Firebase/config'

var ID = function () {
    return Math.random().toString(36).substr(2, 9);
}
function RoomList()
{
    const addRoombox = useRef()
    const [inputName,setInputName] = useState('')
    const [inputDescription,setInputDescription] = useState('')
    const {user,setChatWindow} = useContext(context)
    function handleAddRoom()
    {
        let id =ID()
        writeData('chatrooms/',id,{
            name:inputName,
            description:inputDescription,
            members:{[user.accountName]:{avata:user.avata||''}},
            chatbox:[],
            id:id,
        })
        let arrRoom = user.rooms||[]
        arrRoom.unshift({id,name:inputName})
        writeData('users/',user.accountName,{
            ...user,
            rooms:arrRoom
        })
        addRoombox.current.style.display='none'
        setInputName('')
        setInputDescription('')
    }
    function handleChatWindow(id)
    {
        const dbRef = ref(db)
        get(child(dbRef, 'chatrooms/'+id)).then((snapshot) => {
        if (snapshot.exists()) {
            setChatWindow(snapshot.val())
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        })
    }
    return(
        <>
        <div className={styles.roomList}>
            <input style={{display:'none'}} type='checkbox' id='roomlist' />
            <label htmlFor='roomlist'>
                <Gthan/>
            </label>
            <span>Danh sách phòng</span>
            <ul className={styles.list}>
                {user.rooms?user.rooms.map((room)=>{
                    return (
                        <li onClick={()=>handleChatWindow(room.id)} key={room.id}>{room.name}</li>
                    )
                }):''}
                <li className={styles.addRoom} onClick={()=>addRoombox.current.style.display='block'} >
                    <Plus/>
                    Thêm phòng
                </li>
            </ul>
        </div>
        <div ref={addRoombox} className={styles.addRoombox}>
            <span onClick={()=>{
                addRoombox.current.style.display='none'
                setInputName('')
                setInputDescription('')
            }} >&times;</span>
            <h4>Room name</h4>
            <input 
                value={inputName} 
                placeholder='Enter room name' 
                onChange={(e)=>setInputName(e.target.value)} 
            />
            <h4>Description</h4>
            <textarea
                value={inputDescription}
                placeholder='Description of room'
                onChange={e=>setInputDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddRoom} >ADD</button>
        </div>
        </>
    )
}

export default RoomList
