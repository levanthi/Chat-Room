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
            return value.trim()?undefined:message||'Vui l??ng nh???p tr?????ng n??y!'
        }
    }
}
Validator.isPassword = (selector,min)=>{
    return{
        selector,
        test:(value)=>{
            return value.length>=6?undefined:`m???t kh???u ph???i t???i thi???u ${min} k?? t???!`
        }
    }
}
Validator.isPasswordComfirmation = (selector,password,message)=>{
    return{
        selector,
        test:(value)=>{
            return value === password()?undefined:message||'Nh???p l???i kh??ng ch??nh x??c!'
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
                Validator.isRequired('#name','vui l??ng nh???p t??n ?????y ?????!'),
                Validator.isRequired('#accountName','vui l??ng nh???p t??n t??i kho???n!'),
                Validator.isRequired('#password','vui l??ng nh???p m???t kh???u!'),
                Validator.isPassword('#password',6),
                Validator.isRequired('#password_confirmation','vui l??ng nh???p l???i m???t kh???u!'),
                Validator.isPassword('#password_confirmation',6),
                Validator.isPasswordComfirmation(
                    '#password_confirmation',
                    ()=>{
                        return $('#form1').querySelector('#password').value
                    },
                    'M???t kh???u x??c nh???n kh??ng ch??nh x??c!'
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
                $('#gender').querySelector('span').innerText='vui l??ng ch???n gi???i t??nh'
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
                    signupRef.current.innerText='T??n t??i kho???n ???? t???n t???i!'
                } else {
                    writeData('users/',temp.accountName,temp)
                    alert('????ng k?? th??nh c??ng! Xin m???i ????ng nh???p!')
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
                        ????ng k?? th??nh vi??n
                    </h1>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="name">T??n ?????y ?????</label>
                    <input
                        spellCheck='false'
                        value={state.name}
                        type="text" 
                        name="name"
                        id="name" 
                        placeholder="VD: L?? V??n Thi"
                        onChange={(e)=>{dispatch(nameAction(e.target.value))}}
                    />
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="accountName">T??n t??i kho???n</label>
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
                    <label htmlFor="password">M???t kh???u</label>
                    <input 
                        value={state.password} 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="M???t kh???u"
                        onChange={(e)=>{dispatch(passwordAction(e.target.value))}}/>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div className={clsx(styles.formGroup)}>
                    <label htmlFor="password_confirmation">Nh???p l???i m???t kh???u</label>
                    <input 
                        value={state.passwordConfirmation} 
                        type="password" 
                        name="password_confirmation" 
                        id="password_confirmation" 
                        placeholder="Nh???p l???i m???t kh???u"
                        onChange={(e)=>{dispatch(passwordComfirmAction(e.target.value))}}/>
                    <span className={clsx(styles.errorMessage)}></span>
                </div>

                <div id='gender' className={clsx(styles.formGroup)}>
                    <label>Gi???i t??nh</label>
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
                    ????ng k??
                </button>

            </form>

            <script src='../../library/Validator'></script>
        </div>
        </>
    )
}

export default SignUp
