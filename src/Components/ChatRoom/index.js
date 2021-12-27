
import styles from './main.module.scss'
import SideBar from './SideBar'
import ChatWindow from './ChatWindow'

function ChatRoom()
{
    console.log('chat-room:rerender')
    return (
        <div className={styles.chatroom}>
            <SideBar/>
            <ChatWindow/>
        </div>
    )
}

export default ChatRoom
