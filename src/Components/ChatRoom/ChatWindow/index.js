
import styles from './main.module.scss'
import Header from './Header'
import ChatSection from './ChatSection'
function ChatWindow()
{
    return(
        <div className={styles.chatWindow}>
            <Header/>
            <ChatSection/>
        </div>
    )
}

export default ChatWindow
