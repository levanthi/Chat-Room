import {Routes,Route,useNavigate} from 'react-router-dom'
import {useState,useEffect,createContext, useMemo,useRef, useCallback, useLayoutEffect} from 'react'
import { ref, onValue } from "firebase/database"

import './App.css';
import {db} from './Firebase/config'
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import Home from './Components/Home';
import ChatRoom from './Components/ChatRoom';
import UserEdit from './Components/UserEdit';
export const context = createContext()



function App() {

  const [user,setUser] = useState()
  const [chatWindow,setChatWindow] = useState()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    let storage = JSON.parse(sessionStorage.getItem('user'))
    if(storage)
    {
      setUser(storage)
      navigate('Chat-Room/chatroom')

      const userRef = ref(db, 'users/' + JSON.parse(sessionStorage.getItem('user')).accountName)
      onValue(userRef, (snapshot) => {
        const data = snapshot.val()
        setUser(data)
      })
      console.log('call')
    }
  },[])
  // useEffect(()=>{
  //   if(user)
  //   {
  //     const userRef = ref(db, 'users/' + user.accountName)
  //     onValue(userRef, (snapshot) => {
  //       const data = snapshot.val()
  //       setUser(data)
  //     })
  //   }
  // },[])
  useEffect(()=>{
    if(chatWindow)
    {
      setChatWindow(null)
    }
  },[window.location.pathname])
  useEffect(()=>{
    if(user)
    {
      sessionStorage.setItem('user',JSON.stringify(user))
    }
  },[user])
  console.log(user)
  console.log('app:rerender')
  return (
    <context.Provider value={{user,setUser,chatWindow,setChatWindow,loading,setLoading}}>
      <Routes>
        <Route path='/Chat-Room/signin' element={user?<ChatRoom/>:<SignIn setUser={setUser}/>}/> 
        <Route path='/Chat-Room/signup' element={user?<ChatRoom/>:<SignUp/>}/> 
        <Route path='/Chat-Room/chatroom' element={user?<ChatRoom/>:<Home/>}/> 
        <Route path='/Chat-Room/useredit' element={user?<UserEdit/>:<SignIn/>}/> 
        <Route path='/Chat-Room/' element={user?<ChatRoom/>:<Home/>}/>
      </Routes>
    </context.Provider>
  );
}

export default App;
