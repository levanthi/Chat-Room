
import styles from './main.module.scss'
import UserInfo from './UserInfo'
import RoomList from './RoomList'

function SideBar()
{
    return (
        <div className={styles.SideBar}>
            <UserInfo/>
            <RoomList/>
        </div>
    )
}

export default SideBar
