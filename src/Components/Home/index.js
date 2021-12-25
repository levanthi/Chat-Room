import clsx from 'clsx'
import {Link} from 'react-router-dom'
import styles from './main.module.scss'


function Home()
{
    console.log('home:rerender')
    return (
        <div className={clsx(styles.home)}>
            <h2>WELCOME TO CHAT APP</h2>
            <Link className={styles.loginBtn,styles.signinBtn} to='/Chat-Room/signin'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Đăng Nhập
            </Link>
            <Link className={styles.loginBtn,styles.signupBtn} to='/Chat-Room/signup'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Đăng Ký
            </Link>
        </div>
    )
}

export default Home
