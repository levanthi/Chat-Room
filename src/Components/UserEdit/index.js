import { useContext ,useEffect,useState} from 'react'
import {ref,update,set} from 'firebase/database'
import {useNavigate} from 'react-router-dom'
import { db } from '../../Firebase/config'
import {context} from '../../App'
import styles from './main.module.scss'

function UserEdit()
{
    console.log('useredit:rerender')
    const {user} = useContext(context)
    const [name,setName] = useState()
    const [avata,setAvata] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        setName(user.name)
        setAvata(user.avata)
    },[user])
    function handleEdit(e)
    {
        e.preventDefault()
        if(!name)
            return
        else{
            const updates = {}
            updates[`users/${user.accountName}/name`] = name
            updates[`users/${user.accountName}/avata`] = avata
            update(ref(db),updates)
            let rooms = Object.keys(user.rooms||{})||[]
            console.log(rooms)
            rooms.forEach((room)=>
            {
                set(ref(db, 'chatrooms/' + room +'/members/'+user.accountName), {
                    avata:avata
                  })
            })

            navigate('/Chat-Room/chatroom')
        }
    }
    return(
        <form className={styles.editForm}>
            <span>Tên đầy đủ</span>
            <input 
                spellCheck='false'
                value={name}
                onChange={e=>{setName(e.target.value)}}
                className={styles.name}
            />
            <span>Avatar URL</span>
            <input
                spellCheck='false'
                value={avata}
                onChange={e=>{setAvata(e.target.value)}}
                className={styles.avata}
            />
            <button onClick={handleEdit} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Lưu
            </button>
        </form>
    )
}

export default UserEdit

