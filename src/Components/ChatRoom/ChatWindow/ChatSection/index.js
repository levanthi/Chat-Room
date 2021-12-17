import clsx from 'clsx'
import {useContext,useEffect,useState} from 'react'
import { ref, push, set,onValue } from "firebase/database"

import { db } from '../../../../Firebase/config'
import { context } from '../../../../App'
import styles from './main.module.scss'
import Avatar from '../../../../static/image/defaultAvatar.png'

function ChatSection()
{
    const [message,setMessage] = useState('')
    const {chatWindow,user} = useContext(context)
    const [messageBox,setMessageBox] = useState()
    useEffect(()=>{
        if(chatWindow)
        {
            const chatBoxRef = ref(db, 'chatrooms/' + chatWindow.id + '/chatBox');
            onValue(chatBoxRef, (snapshot) => {
                setMessageBox(snapshot.val())
            })
        }
    },[chatWindow])
    function handleSend()
    {
        if(!message)
            return
        let now = new Date()
        let data={
            message:message,
            avata:user['avata']||'',
            name:user.name,
            time:now.toLocaleString(),
            account:user.accountName
        }
        const postListRef = ref(db, `chatrooms/${chatWindow.id}/chatBox`)
        const newPostRef = push(postListRef);
        set(newPostRef,data)
        setMessage('')
    }

    function me(name)
    {
        if(name===user.accountName)
        {
            return styles.me
        }
    }

    if(chatWindow)
    {
        let renderBox =[]
        if(!chatWindow["chatBox"])
        {
            chatWindow["chatBox"] = {}
        }
        for(var i in messageBox)
        {
            renderBox.unshift(messageBox[i])
        }
        return(
            <>
                
                <div className={styles.chatSection}>
                    <div className={styles.chatBox}>
                        {renderBox.map((chatItem)=>
                        {
                            return (
                                <div 
                                    key={chatItem.time} 
                                    className={
                                        clsx(styles.chatItem,
                                        me(chatItem.account)
                                        )
                                    }>
                                    <div>
                                        <img src={chatItem.avata||Avatar} alt='image'/>
                                        <span className={styles.name}>{chatItem.name}</span>
                                        <span className={styles.time} >{chatItem.time}</span>
                                    </div>
                                    <p>{chatItem.message}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
                <div className={styles.sendGroup}>
                    <input 
                        placeholder='message...'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        onKeyDown={e=>{
                            if(e.key==='Enter')
                            {
                                handleSend()
                            }
                        }}
                    />
                    <button
                        onClick={handleSend}
                    >Gửi</button>
                </div>
            </>
        )
    }
    return <></>
}

export default ChatSection