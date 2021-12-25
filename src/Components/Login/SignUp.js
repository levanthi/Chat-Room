import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import { useEffect, useReducer, useRef ,useContext} from 'react'
import {  ref,get ,child} from "firebase/database"

import {context} from '../../App'
import Loading from '../Loading'
import writeData from '../../Hooks/useFirebase'
import styles from './main.module.scss'
import {db} from '../../Firebase/config'
// import { FacebookAuthProvider,signInWithPopup } from "firebase/auth";
// const fbProvider = new FacebookAuthProvider();

var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

function getParent(child,parentClass)
{
    while(child!==null)
    {
        if(child.parentElement.classList.contains(parentClass))
            return child.parentElement
        child = child.parentElement
        
    }
}

//CONSTANTS
const NAME='name'
const ACCOUNT_NAME='accountName'
const PASSWORD='password'
const PASSWORD_CONFIRMATION='passwordConfirmation'
const GENDER='gender'

// initial state
const initState = {
    name:'',
    accountName:'',
    password:'',
    passwordConfirmation:'',
    gender:null
}

// Action
function nameAction(value)
{
    return {
        action:NAME,
        payload:value
    }
}
function accountNameAction(value)
{
    return {
        action:ACCOUNT_NAME,
        payload:value
    }
}
function passwordAction(value)
{
    return {
        action:PASSWORD,
        payload:value
    }
}
function passwordComfirmAction(value)
{
    return {
        action:PASSWORD_CONFIRMATION,
        payload:value
    }
}
function genderAction(value)
{
    return {
        action:GENDER,
        payload:value
    }
}

// reducer
function reducer(state,option)
    {
        switch (option.action) {
            case NAME:
                return{
                    ...state,
                    name:option.payload
                }
            case ACCOUNT_NAME:
                return{
                    ...state,
                    accountName:option.payload
                }
            case PASSWORD:
                return{
                    ...state,
                    password:option.payload
                }
            case PASSWORD_CONFIRMATION:
                return{
                    ...state,
                    passwordConfirmation:option.payload
                }
            case GENDER:
                {
                    return {
                        ...state,
                        gender:option.payload
                    }
                }
            default:
                return state
        }
        
    }

// Validator instant
function Validator(options)
{
    let selectorsRules = {}
    let formElement = $(options.form)
    let errorMessage
    if(formElement)
    {
        function validate(inputElement,rule,formGroupElement)
        {
            formGroupElement = getParent(inputElement,styles.formGroup)
            if(inputElement)
            {
                for(var i = 0;i<selectorsRules[rule.selector].length;i++)
                {
                    errorMessage = selectorsRules[rule.selector][i](inputElement.value)
                    if(errorMessage)
                        break
                }
            }
            if(errorMessage)
            {
                formGroupElement.classList.add(styles.invalid)
                formGroupElement.querySelector('span').innerText = errorMessage
            }
        }
        options.rules.forEach((rule)=>{
            let inputElement = formElement.querySelector(rule.selector)
            let formGroupElement = getParent(inputElement,styles.formGroup)
            if(Array.isArray(selectorsRules[rule.selector]))
            {
                selectorsRules[rule.selector].push(rule.test)
            }
            else{
                selectorsRules[rule.selector] = [rule.test]
            }
            inputElement.onblur = ()=>{
                validate(inputElement,rule)
            }
            inputElement.oninput = ()=>{
                formGroupElement.classList.remove(styles.invalid)
                formGroupElement.querySelector('span').innerText = ''
            }
        })
        formElement.querySelector('button').onclick =()=>{
            options.rules.forEach((rule)=>{
                let inputElement = formElement.querySelector(rule.selector)
                let formGroupElement = getParent(inputElement,styles.formGroup)
                validate(inputElement,rule,formGroupElement)
            })
        }
    }
}
Validator.isRequired = (selector,message)=>{
    return{
        selector,
        test:(value)=>{
            return value.trim()?undefined:message||'Vui lòng nhập trường này!'
        }
    }
}
Validator.isPassword = (selector,min)=>{
    return{
        selector,
        test:(value)=>{
            return value.length>=6?undefined:`mật khẩu phải tối thiểu ${min} kí tự!`
        }
    }
}
Validator.isPasswordComfirmation = (selector,password,message)=>{
    return{
        selector,
        test:(value)=>{
            return value === password()?undefined:message||'Nhập lại không chính xác!'
        }
    }
}

function SignUp()
{  
    const navigate = useNavigate()
    const [state,dispatch] = useReducer(reducer,initState)
    const {loading,setLoading} = useContext(context)
    const submitRef = useRef()
    const signupRef = useRef()
    useEffect(()=>{
        Validator({
            form:'#form1',
            rules:[
                Validator.isRequired('#name','vui lòng nhập tên đầy đủ!'),
                Validator.isRequired('#accountName','vui lòng nhập tên tài khoản!'),
                Validator.isRequired('#password','vui lòng nhập mật khẩu!'),
                Validator.isPassword('#password',6),
                Validator.isRequired('#password_confirmation','vui lòng nhập lại mật khẩu!'),
                Validator.isPassword('#password_confirmation',6),
                Validator.isPasswordComfirmation(
                    '#password_confirmation',
                    ()=>{
                        return $('#form1').querySelector('#password').value
                    },
                    'Mật khẩu xác nhận không chính xác!'
                ),
            ]
        })

        let genderElements = [...$$('input[type=radio]')]
        genderElements.forEach((input)=>{
            input.onchange = ()=>{
                $('#gender').querySelector('span').innerText=''
            }
        })
    },[])
    useEffect(()=>{
        $('#form1').onsubmit = (e)=>{
            e.preventDefault()
            if(state.gender)
            {
                $('#gender').querySelector('span').innerText=''
                $('#gender').classList.remove(styles.invalid)
            }
            else{
                $('#gender').querySelector('span').innerText='vui lòng chọn giới tính'
                $('#gender').classList.add(styles.invalid)
            }
            const isSubmit = !$(`.${styles.invalid}`)
            if(isSubmit)
            {
                setLoading(!loading)
                const temp = state
                delete temp.passwordConfirmation
                console.log(temp)

                const dbRef = ref(db);
                get(child(dbRef, `users/${temp.accountName}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    signupRef.current.innerText='Tên tài khoản đã tồn tại!'
                } else {
                    writeData('users/',temp.accountName,temp)
                    alert('SignUp susscess! signin please!!!')
                    navigate('/Chat-Room/signin')
                }
                setLoading(false)
                }).catch((error) => {
                console.error(error);
                })
            }
        }
    },[state])

    return(
        <>
        {loading?<Loading/>:''}
        <div className={clsx(styles.login,styles.signUp)}>
            <form action="POST" id="form1" autoComplete="off">
                <div className={clsx(styles.formHeader)}>
                    <h1 className={clsx(styles.formHeading)}>
                        Đăng kí thành viên
                    </h1>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="name">Tên đầy đủ</label>
                    <input
                        spellCheck='false'
                        value={state.name}
                        type="text" 
                        name="name"
                        id="name" 
                        placeholder="VD: Lê Văn Thi"
                        onChange={(e)=>{dispatch(nameAction(e.target.value))}}
                    />
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="accountName">Tên tài khoản</label>
                    <input 
                        value={state.accountName}
                        spellCheck='false' 
                        name="accountName" 
                        id="accountName" 
                        placeholder="VD: example1001"
                        onChange={(e)=>{
                            dispatch(accountNameAction(e.target.value))
                            signupRef.current.innerText=''
                        }}/>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input 
                        value={state.password} 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Mật khẩu"
                        onChange={(e)=>{dispatch(passwordAction(e.target.value))}}/>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="password_confirmation">Nhập lại mật khẩu</label>
                    <input 
                        value={state.passwordConfirmation} 
                        type="password" 
                        name="password_confirmation" 
                        id="password_confirmation" 
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e)=>{dispatch(passwordComfirmAction(e.target.value))}}/>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div id='gender' className={clsx(styles.formGroup)}>
                    <label>Giới tính</label>
                    <div>
                        <input
                            type="radio" 
                            name="gender" 
                            value="male"
                            onChange={(e)=>dispatch(genderAction(e.target.value))}
                        />Nam
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="female"
                            onChange={(e)=>dispatch(genderAction(e.target.value))}
                            />Nu
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            name="gender" 
                            value="other"
                            onChange={(e)=>dispatch(genderAction(e.target.value))}
                            />Khac
                    </div>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <span ref={signupRef} className={styles.userExist} ></span>
                <button ref={submitRef} className={clsx(styles.button)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Đăng ký
                </button>

            </form>

            <script src='../../library/Validator'></script>
        </div>
        </>
    )
}

export default SignUp
