import { useContext ,useEffect,useState} from 'react'
import {ref,update} from 'firebase/database'
import {useNavigate} from 'react-router-dom'
import { db } from '../../Firebase/config'
import {context} from '../../App'
import styles from './main.module.scss'

function UserEdit()
{
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
            navigate('/chatroom')
        }
    }
    return(
        <form className={styles.editForm}>
            <span>Name</span>
            <input 
                value={name}
                onChange={e=>{setName(e.target.value)}}
                className={styles.name}
            />
            <span>Avata URL</span>
            <input
                value={avata}
                onChange={e=>{setAvata(e.target.value)}}
                className={styles.avata}
            />
            <button onClick={handleEdit} >UPDATE</button>
        </form>
    )
}

export default UserEdit

