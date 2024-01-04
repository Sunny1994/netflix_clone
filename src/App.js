import React, { useEffect } from 'react'
import Homescreen from './screens/Homescreen'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loginscreen from './screens/Loginscreen'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userslice'
import ProfileScreen from './screens/ProfileScreen.js'

const App=()=>{

  
  const user=useSelector(selectUser)
  const dispatch= useDispatch()

  useEffect(()=>{
   const unsubscribe= auth.onAuthStateChanged(userAuth=>{
       if(userAuth){
        //login
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
       
       }
       else{
          //logout
          dispatch(logout())
       }
    })

    return unsubscribe
  },[dispatch])



  return(
  <div className='app'>
    
    
    <Router> 

      {!user?(
        <Loginscreen/>
      ):(
        <Routes>
          
        {/* <Route path='/about' element={<About/>}/>

        <Route path='/users'element={<Users/>}/> */}


        <Route path='/profile' element={<ProfileScreen/>}/>
          
        <Route path='/' element={<Homescreen/>}/>
          
        

       </Routes>

        
      )}
        


    </Router>


  </div>
  )

}

export default App