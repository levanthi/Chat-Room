import {Routes,Route,useNavigate} from 'react-router-dom'
import {useState,useEffect,useLayoutEffect,createContext,useRef} from 'react'
import {db} from './Firebase/config'
import { ref ,onValue} from "firebase/database";

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
  const [loading,setLoading] = useState(false)
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
    if(accountName)
    {
      const userUpdate = ref(db, 'users/'+accountName);
      onValue(userUpdate, (snapshot) => {
        const data = snapshot.val();
        setUser(data)
      })
    }
  },[accountRef.current])
  useEffect(()=>{
    if(user)
    {
      sessionStorage.setItem('user',JSON.stringify(user))
      accountRef.current = user.accountName
    }
    return ()=>{
      setChatWindow(null)
    }
  },[user])

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
