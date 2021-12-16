import { useContext,useState,useRef } from 'react'
import {  ref, child, get,update } from "firebase/database"

import { db } from '../../../../Firebase/config'
import {context} from '../../../../App'
import styles from './main.module.scss'
import {ReactComponent as UserAdd} from '../../../../static/icon/user-plus-solid.svg'
import Avata from '../../../../static/image/defaultAvatar.png'
function Header()
{
    const {chatWindow} = useContext(context)
    const [userInvite,setUserInvite] = useState()
    const userInviteRef = useRef()
    const errRef = useRef()
    function handleInviteUser()
    {
        const dbRef = ref(db)
        get(child(dbRef, `users/${userInvite}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let rooms = snapshot.val().rooms || []
            let isExist = rooms.some((room)=>{
                return room.id===chatWindow.id
            })
            if(!isExist)
            {
                rooms = [{id:chatWindow.id,name:chatWindow.name},...rooms]
            }
            let updates = {}
            updates[`users/${userInvite}/rooms`] = rooms
            console.log(updates)
            update(dbRef,updates)
            userInviteRef.current.style.display='none'
        } else {
            errRef.current.style.display='block'
        }
        }).catch((error) => {
        console.error(error);
        })
    }
    console.log(userInvite)
    return(
        <>
            <div ref={userInviteRef} className={styles.userInvite}>
                <div  onClick={()=>{
                    userInviteRef.current.style.display='none'
                    setUserInvite('')
                    }}>x</div>
                <h3>Invite</h3>
                <input
                    placeholder='Enter username...' 
                    value={userInvite}
                    onChange={e=>{errRef.current.style.display='none';setUserInvite(e.target.value)}}
                />
                <p ref={errRef} className={styles.error} >User not found, retry one more time please!</p>
                <button onClick={handleInviteUser} >ADD</button>
            </div>
            {chatWindow?
                <div className={styles.header}>
                    <div>
                        <h4>{chatWindow.name}</h4>
                        <span>{chatWindow.description}</span>
                    </div>
                    <div>
                        <span 
                            onClick={()=>{
                                userInviteRef.current.style.display='block'
                            }} 
                            className={styles.invite}
                        >
                            <UserAdd/>
                            <span>
                                Mời
                            </span>
                        </span>
                        <span className={styles.members}>
                            <img 
                                src={chatWindow.members[0].avata?
                                    chatWindow.members[0].avata:
                                    Avata
                                } 
                                alt='image' 
                            />
                            {chatWindow.members[1]?<img 
                                src={chatWindow.members[1].avata?
                                    chatWindow.members[1].avata:
                                    Avata
                                } 
                                alt='image' 
                            />
                            :''}
                            {chatWindow.members.length>=3?
                                <span style={{justifyContent:'center'}}>
                                    {chatWindow.members.length-2}
                                </span>
                                :''
                            }
                        </span>
                    </div>
                </div>
                :<h1 style={{margin:'40px auto'}}>Vui lòng chọn room chat!!!</h1>
            }
        </>
    )
}

export default Header
