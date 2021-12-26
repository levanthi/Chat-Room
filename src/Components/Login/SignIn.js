import { useEffect, useRef, useState ,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { ref, child, get } from "firebase/database"

import Loading from '../Loading'
import {db} from '../../Firebase/config'
import styles from './main.module.scss'
import { context } from '../../App'
const $ = document.querySelector.bind(document)

function Validator(options)
{
    const selectorRules = {}
    const formElement = $(options.form)
    let errorMessage
    function validate(inputElement,rule)
    {
        for(var i = 0;i<selectorRules[rule.selector].length;i++)
        {
            errorMessage = selectorRules[rule.selector][i](inputElement.value)
            if(errorMessage)
                break
        }
        if(errorMessage)
        {
            inputElement.parentElement.classList.add(styles.invalid)
            inputElement.parentElement.querySelector('span').innerText = errorMessage
        }
    }
    if(formElement)
    {
        options.rules.forEach((rule)=>{
            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test)
            }
            else
            {
                selectorRules[rule.selector] = [rule.test]
            }

            let inputElement = formElement.querySelector(rule.selector)
            inputElement.onblur = ()=>{
                validate(inputElement,rule)
            }
            inputElement.oninput = ()=>{
                inputElement.parentElement.classList.remove(styles.invalid)
                inputElement.parentElement.querySelector('span').innerText = ''
            }
        })
        formElement.onsubmit = (e)=>{
            e.preventDefault()
            options.rules.forEach((rule)=>{
                let inputElement = formElement.querySelector(rule.selector)
                validate(inputElement,rule)
            })
        }
    }
}
Validator.isRequired = (selector,message)=>{
    return {
        selector,
        test:(value)=>{
            return value.trim()?undefined:message||'vui lòng nhập trường này!'
        }
    }
}
Validator.minLength = (selector,min,message)=>{
    return {
        selector,
        test:(value)=>{
            return value.length>=min?undefined:message||`Trường này tôi tối thiểu ${min} kí tự!`
        }
    }
}
function SignIn()
{
    const navigate = useNavigate()
    const [account,setAccount] = useState('')
    const [password,setPassword] = useState('')
    const {setUser,loading,setLoading} = useContext(context)
    const signinRef = useRef()
    useEffect(()=>{
        Validator({
            form:'#form1',
            rules:[
                Validator.isRequired('#accountName','Vui lòng nhập tên tài khoản!'),
                Validator.isRequired('#password','Vui lòng nhập mật khẩu'),
                Validator.minLength('#password',6,'mật khẩu phải tối thiểu 6 kí tự!'),
            ]
        })
    },[])
    return (
        <>
        {loading?<Loading/>:''}
        <div className={styles.login}>
            <form id='form1'>
                <h2 style={{marginTop:'0'}} >Đăng Nhập</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="accountName">Tên tài khoản</label>
                    <input 
                        spellCheck='false'
                        value={account}
                        autoComplete='off'
                        type="text" 
                        name="accountName"
                        id="accountName" 
                        placeholder="VD: expample123"
                        onChange={(e)=>{
                            setAccount(e.target.value)
                            signinRef.current.innerText=''
                        }}
                    />
                    <span className={styles.errorMessage}></span>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input 
                        value={password}
                        placeholder='Nhập mật khẩu...'
                        type="password" 
                        name="password"
                        id="password" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                            signinRef.current.innerText=''
                        }}
                    />
                    <span className={styles.errorMessage}></span>
                </div>
                <span ref={signinRef} className={styles.loginFail}></span>
                <button onClick={ async ()=>{
                    if(account && password.length>=6)
                    {
                        setLoading(!loading)
                        const dbRef = ref(db);
                        let temp
                        await get(child(dbRef, `users/`+account)).then((snapshot) => {
                          if (snapshot.exists()) {
                            temp=snapshot.val()
                            if(temp.password === password)
                            {
                                sessionStorage.setItem('user',temp)
                                setUser(temp)
                                navigate('/Chat-Room/chatroom')
                            }
                            else{
                                signinRef.current.innerText='Tài khoản hoặc mật khẩu không chính xác!'
                            }
                          }
                          else{
                            signinRef.current.innerText='Tài khoản hoặc mật khẩu không chính xác!'
                          }
                            setLoading(false)
                        }).catch((error) => {
                          console.error(error);
                        })

                        
                    }
                }} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                Đăng Nhập</button>
            </form>
        </div>
        </>
    )
}

export default SignIn