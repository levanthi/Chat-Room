import { useEffect, useRef, useState ,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { ref, child, get,onValue } from "firebase/database"

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
            return value.trim()?undefined:message||'vui l??ng nh???p tr?????ng n??y!'
        }
    }
}
Validator.minLength = (selector,min,message)=>{
    return {
        selector,
        test:(value)=>{
            return value.length>=min?undefined:message||`Tr?????ng n??y t??i t???i thi???u ${min} k?? t???!`
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
                Validator.isRequired('#accountName','Vui l??ng nh???p t??n t??i kho???n!'),
                Validator.isRequired('#password','Vui l??ng nh???p m???t kh???u'),
                Validator.minLength('#password',6,'m???t kh???u ph???i t???i thi???u 6 k?? t???!'),
            ]
        })
    },[])
    return (
        <>
        {loading?<Loading/>:''}
        <div className={styles.login}>
            <form id='form1'>
                <h2 style={{marginTop:'0'}} >????ng Nh???p</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="accountName">T??n t??i kho???n</label>
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
                    <label htmlFor="password">M???t kh???u</label>
                    <input 
                        value={password}
                        placeholder='Nh???p m???t kh???u...'
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

                                const userRef = ref(db, 'users/' + account)
                                onValue(userRef, (snapshot) => {
                                const data = snapshot.val()
                                setUser(data)
                                })

                            }
                            else{
                                signinRef.current.innerText='T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c!'
                            }
                          }
                          else{
                            signinRef.current.innerText='T??i kho???n ho???c m???t kh???u kh??ng ch??nh x??c!'
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
                ????ng Nh???p</button>
            </form>
        </div>
        </>
    )
}

export default SignIn