import { useContext,useState,useRef, useEffect } from 'react'
import {  ref, child, get,update,onValue,set,remove } from "firebase/database"
import clsx from 'clsx'

import { db } from '../../../../Firebase/config'
import {context} from '../../../../App'
import styles from './main.module.scss'
import {ReactComponent as UserAdd} from '../../../../static/icon/user-plus-solid.svg'
import Avata from '../../../../static/image/defaultAvatar.png'
import {ReactComponent as ArrowDown} from '../../../../static/icon/arrow-down.svg'
function Header()
{
    const {chatWindow,setChatWindow,user} = useContext(context)
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
        if(!userInvite){
            errRef.current.innerText='Vui lòng nhập tên tài khoản'
            return
        }
        const dbRef = ref(db)
        get(child(dbRef, `users/${userInvite}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let rooms = snapshot.val().rooms || {}
            let isExist = Object.keys(rooms).some((id)=>{
                return id===chatWindow.id
            })
            if(isExist)
            {
                errRef.current.innerText='Người dùng đã tồn tại trong phòng!'
                return
            }
            let updates = {}
            updates[`users/${userInvite}/rooms/${chatWindow.id}`] = {name:chatWindow.name}
            update(dbRef,updates)

            get(child(dbRef, `users/${userInvite}/avata`)).then((snapshot1) => {
            if (snapshot1.exists()){
                set(ref(db, 'chatrooms/' + chatWindow.id+'/members/'+userInvite), {
                    avata:snapshot1.val()
                  })
                chatWindow.members={...chatWindow.members,[userInvite]:{avata:snapshot1.val()}}
            } else {
                set(ref(db, 'chatrooms/' + chatWindow.id+'/members/'+userInvite), {
                    avata:''
                  })
            }
            }).catch((error) => {
            console.error(error);
            })
            

            userInviteRef.current.classList.add(styles.hide)
            userInviteRef.current.style.display='none'
            errRef.current.innerText=''
            setUserInvite('')
        } else {
            errRef.current.innerText='Không tìm thấy người dùng!'
        }
        }).catch((error) => {
        console.error(error);
        })
    }
    function handleDelete()
    {
        const dbRef = ref(db);
        get(child(dbRef, `chatrooms/${chatWindow.id}/members`)).then((snapshot) => {
        if (snapshot.exists()) {
            Object.keys(snapshot.val()).forEach((username)=>{
                console.log(username)
                remove(ref(db,`users/${username}/rooms/${chatWindow.id}`))
            })
            remove(ref(db,`chatrooms/${chatWindow.id}`))
            setChatWindow(null)
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        })
    }
    return(
        <>
            <div className={clsx(styles.deleteComfirm,styles.hide)}>
                <h4>Bạn chắc chắn muốn xóa phòng?</h4>
                <button
                    onClick={(e)=>{
                        e.target.parentElement.classList.add(styles.hide)
                        e.target.parentElement.style.display='none'
                        handleDelete()
                    }}
                >Xóa</button>
                <button
                    onClick={(e)=>{
                        e.target.parentElement.classList.add(styles.hide)
                        e.target.parentElement.style.display='none'
                    }}
                >Hủy</button>
            </div>
            <div ref={userInviteRef} className={clsx(styles.userInvite,styles.hide)}>
                <div  onClick={()=>{
                    errRef.current.innerText=''
                    userInviteRef.current.classList.add(styles.hide)
                    userInviteRef.current.style.display='none'
                    setUserInvite('')
                    }}>x</div>
                <h3>Mời</h3>
                <input
                    placeholder='Enter username...' 
                    value={userInvite}
                    onChange={e=>{errRef.current.innerText='';setUserInvite(e.target.value)}}
                />
                <p ref={errRef} className={styles.error} ></p>
                <button onClick={()=>{
                    handleInviteUser()
                    }} >Mời</button>
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
                                userInviteRef.current.classList.remove(styles.hide)
                            }} 
                            className={styles.invite}
                        >
                            <UserAdd/>
                            <span>
                                Mời
                            </span>
                        </span>
                        <span className={styles.members}>
                            <div>
                                <img 
                                    src={chatWindow.members[Object.keys(chatWindow.members)[0]].avata?
                                        chatWindow.members[Object.keys(chatWindow.members)[0]].avata:
                                        Avata
                                    } 
                                    alt='img1' 
                                />
                            </div>
                            {Object.keys(chatWindow.members).length>1?<div><img 
                                src={chatWindow.members[Object.keys(chatWindow.members)[1]].avata?
                                    chatWindow.members[Object.keys(chatWindow.members)[1]].avata:
                                    Avata
                                } 
                                alt='img2' 
                            /></div>
                            :''}
                            {Object.keys(chatWindow.members).length>=3?
                                <div><span style={{justifyContent:'center'}}>
                                    +{Object.keys(chatWindow.members).length-2}
                                </span></div>
                                :''
                            }
                            <span className={styles.memberListWrap}>
                                <span className={clsx(styles.memberList)}>
                                    {Object.keys(chatWindow.members).map((img,index)=>{
                                        return <img key={index} src={chatWindow.members[img].avata||Avata} alt='img' />
                                    })}
                                </span>
                            </span>
                        </span>
                        {chatWindow.host===user.accountName?
                            <span 
                                className={styles.arrowDown}
                                onMouseEnter={()=>{
                                    document.querySelector(`.${styles.roomSetting}`).style.display='flex'
                                }}
                                onMouseLeave={()=>{
                                    document.querySelector(`.${styles.roomSetting}`).style.display='none'
                                }}
                            >
                                <ArrowDown />
                                <span className={clsx(styles.roomSetting)}>
                                    <div 
                                        onClick={(e)=>{
                                            document.querySelector(`.${styles.deleteComfirm}`).style.display='block'
                                            document.querySelector(`.${styles.deleteComfirm}`).classList.remove(styles.hide)
                                            e.target.parentElement.style.display='none'
                                        }} 
                                        className={styles.roomDelete}
                                    >Xóa phòng</div>
                                </span>
                            </span>:''}
                    </div>
                </div>
                :<h1 className={styles.noroom} style={{margin:'40px auto'}}>Vui lòng chọn room chat!!!</h1>
            }
        </>
    )
}

export default Header
