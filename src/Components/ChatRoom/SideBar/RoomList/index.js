import {useRef,useState,useContext} from 'react'
import { ref, child, get,update } from "firebase/database"

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
    const {user,setChatWindow,loading,setLoading} = useContext(context)
    function handleAddRoom()
    {
        let id =ID()
        writeData('chatrooms/',id,{
            name:inputName,
            description:inputDescription,
            members:{[user.accountName]:{avata:user.avata||''}},
            chatbox:[],
            host:user.accountName,
            id:id,
        })
        
        const updates = {}
        updates[`users/${user.accountName}/rooms/${id}`]={name:inputName}
        update(ref(db), updates)

        addRoombox.current.style.display='none'
        setInputName('')
        setInputDescription('')
    }
    function mapRooms(rooms){
        let arr =[]
        Object.keys(rooms).map((id)=>{
            arr.push({id,name:rooms[id].name})
        })
        return arr
    }
    function handleChatWindow(id)
    {
        setLoading(!loading)
        const dbRef = ref(db)
        get(child(dbRef, 'chatrooms/'+id)).then((snapshot) => {
        if (snapshot.exists()) {
            setChatWindow(snapshot.val())
            setLoading(false)
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
                {user.rooms?mapRooms(user.rooms).map((room)=>{
                    return (
                        <li onClick={()=>handleChatWindow(room.id)} key={room.id}>{room.name}</li>
                    )
                }):''}
                <li 
                    className={`${styles.addRoom}`} 
                    onClick={()=>{
                        addRoombox.current.classList.remove(styles.hide)
                        addRoombox.current.style.display='block'
                    }}>
                    <Plus/>
                    Thêm phòng
                </li>
            </ul>
        </div>

        <div ref={addRoombox} className={`${styles.addRoombox}  ${styles.hide}`}>
            <span onClick={()=>{
                addRoombox.current.classList.add(styles.hide)
                setInputName('')
                setInputDescription('')
            }} >&times;</span>
            <h4>Tên phòng</h4>
            <input 
                value={inputName} 
                placeholder='Nhập tên phòng...' 
                onChange={(e)=>setInputName(e.target.value)} 
            />
            <h4>Mô tả</h4>
            <textarea
                value={inputDescription}
                placeholder='Mô tả phòng...'
                onChange={e=>setInputDescription(e.target.value)}
            ></textarea>
            <button onClick={handleAddRoom} >Thêm</button>
        </div>
        </>
    )
}

export default RoomList
