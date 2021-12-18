import clsx from 'clsx'
import {Link} from 'react-router-dom'
import styles from './main.module.scss'

function Home()
{
    console.log('home:rerender')
    return (
        <div className={clsx(styles.home)}>
            <h2>WELCOME TO CHAT APP</h2>
            <Link to='signin'>Đăng Nhập</Link>
            <Link to='signup'>Đăng Ký</Link>
        </div>
    )
}

export default Home
