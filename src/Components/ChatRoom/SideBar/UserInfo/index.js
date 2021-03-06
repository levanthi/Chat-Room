import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './main.module.scss'
import avatar from '../../../../static/image/defaultAvatar.png'
import {context} from '../../../../App'
function UserInfo()
{
    const navigate = useNavigate()
    const {user,setUser} = useContext(context)
    return(
        <div className={styles.userInfo}>
            <div className={styles.user}>
                <Link to='/Chat-Room/useredit'>
                    <img src={user.avata||avatar} alt='avata'/>
                </Link>
                <span>{user.name}</span>
            </div>
            <div className={styles.buttonWrap}>
                <button 
                    className={styles.logout} 
                    onClick = {()=>{
                        sessionStorage.removeItem('user')
                        setUser(null)
                        navigate('/Chat-Room/signin')
                    }}
                >Đăng xuất</button>
                <span></span>
            </div>
        </div>
    )
}

export default UserInfo
