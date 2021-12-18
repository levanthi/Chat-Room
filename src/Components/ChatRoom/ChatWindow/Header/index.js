import { useContext,useState,useRef, useEffect } from 'react'
import {  ref, child, get,update,onValue,set } from "firebase/database"

import { db } from '../../../../Firebase/config'
import {context} from '../../../../App'
import styles from './main.module.scss'
import {ReactComponent as UserAdd} from '../../../../static/icon/user-plus-solid.svg'
import Avata from '../../../../static/image/defaultAvatar.png'
function Header()
{
    const {chatWindow,setChatWindow} = useContext(context)
    const [userInvite,setUserInvite] = useState()
    const userInviteRef = useRef()
    const errRef = useRef()
    let id
    useEffect(()=>{
        if(chatWindow)
            id=chatWindow.id
    },[chatWindow])
    useEffect(()=>{
        const chatWindowRef = ref(db, 'chatrooms/' + id)
        onValue(chatWindowRef, (snapshot) => {
        const data = snapshot.val();
        setChatWindow(data);
        })
    },[id])
    function handleInviteUser()
    {
        if(!userInvite) return
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
            else{
                errRef.current.innerText='User had exsisted in this room.'
                return
            }
            let updates = {}
            updates[`users/${userInvite}/rooms`] = rooms
            update(dbRef,updates)

            get(child(dbRef, `users/${userInvite}/avata`)).then((snapshot1) => {
            if (snapshot1.exists()){
                set(ref(db, 'chatrooms/' + chatWindow.id+'/members/'+userInvite), {
                    avata:snapshot1.val()
                  })
            } else {
                set(ref(db, 'chatrooms/' + chatWindow.id+'/members/'+userInvite), {
                    avata:''
                  })
            }
            }).catch((error) => {
            console.error(error);
            })
            

            

            userInviteRef.current.style.display='none'
            errRef.current.innerText=''
            setUserInvite('')
        } else {
            errRef.current.innerText='User not found, try again please!'
        }
        }).catch((error) => {
        console.error(error);
        })
    }

    return(
        <>
            <div ref={userInviteRef} className={styles.userInvite}>
                <div  onClick={()=>{
                    errRef.current.innerText=''
                    userInviteRef.current.style.display='none'
                    setUserInvite('')
                    }}>x</div>
                <h3>Invite</h3>
                <input
                    placeholder='Enter username...' 
                    value={userInvite}
                    onChange={e=>{errRef.current.innerText='';setUserInvite(e.target.value)}}
                />
                <p ref={errRef} className={styles.error} ></p>
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
                                src={chatWindow.members[Object.keys(chatWindow.members)[0]].avata?
                                    chatWindow.members[Object.keys(chatWindow.members)[0]].avata:
                                    Avata
                                } 
                                alt='img1' 
                            />
                            {Object.keys(chatWindow.members).length>1?<img 
                                src={chatWindow.members[Object.keys(chatWindow.members)[1]].avata?
                                    chatWindow.members[Object.keys(chatWindow.members)[1]].avata:
                                    Avata
                                } 
                                alt='img2' 
                            />
                            :''}
                            {Object.keys(chatWindow.members).length>=3?
                                <span style={{justifyContent:'center'}}>
                                    +{Object.keys(chatWindow.members).length-2}
                                </span>
                                :''
                            }
                        </span>
                    </div>
                </div>
                :<h1 className={styles.noroom} style={{margin:'40px auto'}}>Vui lòng chọn room chat!!!</h1>
            }
        </>
    )
}

export default Header
