
import styles from './main.module.scss'
import SideBar from './SideBar'
import ChatSection from './ChatWindow'

function ChatRoom()
{
    return (
        <div className={styles.chatroom}>
            <SideBar/>
            <ChatSection/>
        </div>
    )
}

export default ChatRoom
