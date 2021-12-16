import {Routes,Route,useNavigate} from 'react-router-dom'
import {useState,useEffect,useLayoutEffect,createContext,useRef, useCallback} from 'react'
import {db} from './Firebase/config'
import { ref, set,get ,child,onValue} from "firebase/database";

import './App.css';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import Home from './Components/Home';
import ChatRoom from './Components/ChatRoom';
import UserEdit from './Components/UserEdit';
export const context = createContext()



function App() {

  const [user,setUser] = useState()
  const [chatWindow,setChatWindow] = useState()
  const navigate = useNavigate()
  const accountRef = useRef()
  useLayoutEffect(()=>{
    let storage = JSON.parse(sessionStorage.getItem('user'))
    if(storage)
    {
      setUser(storage)
      navigate('/chatroom')
    }
  },[])
  useEffect(()=>{
    const accountName = accountRef.current
    const userUpdate = ref(db, 'users/'+accountName);
    onValue(userUpdate, (snapshot) => {
      const data = snapshot.val();
      setUser(data)
    })
  },[accountRef.current])

  useEffect(()=>{
    if(user)
    {
      sessionStorage.setItem('user',JSON.stringify(user))
      accountRef.current = user.accountName
    }
  },[user])

  return (
    <context.Provider value={{user,setUser,chatWindow,setChatWindow}}>
      <Routes>
        <Route path='/signin' element={user?<ChatRoom/>:<SignIn setUser={setUser}/>}/> 
        <Route path='/signup' element={user?<ChatRoom/>:<SignUp/>}/> 
        <Route path='/chatroom' element={user?<ChatRoom/>:<Home/>}/> 
        <Route path='/useredit' element={user?<UserEdit/>:<SignIn/>}/> 
        <Route path='Chat-Room/' element={user?<ChatRoom/>:<Home/>}/>
      </Routes>
    </context.Provider>
  );
}

export default App;
