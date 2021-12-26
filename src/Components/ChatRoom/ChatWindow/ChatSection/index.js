import clsx from 'clsx'
import {useContext,useEffect,useState,useRef} from 'react'
import { ref, push, set,onValue } from "firebase/database"
import Picker from 'emoji-picker-react'

import Loading from '../../../Loading'
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
        messageRef.current.innerText+=emojiObject.emoji
    }   


    // app
    const messageRef = useRef()
    const {chatWindow,user,loading} = useContext(context)
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
        if(messageRef.current.innerText==='')
        {
            messageRef.current.innerText=''
            return
        }
        let now = new Date()
        let data={
            message:messageRef.current.innerText,
            avata:user['avata']||'',
            name:user.name,
            time:now.toLocaleString(),
            account:user.accountName
        }
        const postListRef = ref(db, `chatrooms/${chatWindow.id}/chatBox`)
        const newPostRef = push(postListRef);
        set(newPostRef,data)
        messageRef.current.innerText=''
    }

    function me(name)
    {
        if(name===user.accountName)
        {
            return styles.me
        }
    }
    console.log('message-render')
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
                        <div 
                            ref={messageRef}
                            contentEditable='true'
                            data-text="Nhập tin nhắn..."
                            className={styles.input}
                            onKeyDown={e=>{
                                if(e.key==='Enter')
                                {
                                    if(window.innerWidth>=740)
                                        e.preventDefault()
                                    handleSend()
                                }
                            }}
                        ></div>
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
    return <span className='responsive'> {loading?<Loading/>:''}</span>
}

export default ChatSection