import clsx from 'clsx'
import {useContext,useEffect,useState,useRef} from 'react'
import { ref, push, set,onValue } from "firebase/database"
import Picker from 'emoji-picker-react'

import {ReactComponent as SmileIcon} from '../../../../static/icon/smile-solid.svg'
import { db } from '../../../../Firebase/config'
import { context } from '../../../../App'
import styles from './main.module.scss'
import Avatar from '../../../../static/image/defaultAvatar.png'

function ChatSection()
{
    //emojy
    const emojiRef = useRef()
    const overlayRef = useRef()
    const onEmojiClick = (event, emojiObject) => {
        setMessage(message+emojiObject.emoji)
    }   


    // app
    const [message,setMessage] = useState('')
    const {chatWindow,user,setChatWindow} = useContext(context)
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
                                    key={Math.random().toString(36).substr(2, 9)} 
                                    className={
                                        clsx(styles.chatItem,
                                        me(chatItem.account)
                                        )
                                    }>
                                    <div>
                                        <img src={chatItem.avata||Avatar} alt='img'/>
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
                    <div className={styles.inputWrap}>
                        {/* emoji */}
                        <div 
                            ref={emojiRef} 
                            className={styles.emoji} 
                        >
                        <Picker onEmojiClick={onEmojiClick} />
                        </div>
                        <div 
                            ref={overlayRef} 
                            className={styles.overlay}
                            onClick={()=>{
                                overlayRef.current.style.display='none'
                                emojiRef.current.style.display='none'
                            }}
                        ></div>
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
                        <SmileIcon
                            onClick={()=>{
                                // emojiRef.current.style.display='block'
                                if(emojiRef.current.style.display==='block')
                                {
                                    emojiRef.current.style.display='none'
                                }
                                else
                                {
                                    overlayRef.current.style.display='block'
                                    emojiRef.current.style.display='block'
                                }
                            }}
                        />
                    </div>
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