import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../firebase'
import './Signupscreen.css'
function Signupscreen(){

  const navigate= useNavigate()

    const emailref= useRef(null)
    const passwordref= useRef(null)

    const register=(e)=>{
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailref.current.value,
            passwordref.current.value
        ).then((authuser)=>{
          console.log(authuser)
        }).catch(err=>{
            alert(err.message)
        })
        navigate('/profile')
    }

    const signin=(e)=>{
      e.preventDefault()
      auth.signInWithEmailAndPassword(
        emailref.current.value,
        passwordref.current.value
      ).then(authuser=>{
        console.log(authuser)
      }).catch(err=>{
        alert(err.message)
      })
      navigate('/')
    }

    return(

        <div className="signupscreen">
          <form>
            <h1>Sign In</h1>
            <input ref={emailref} placeholder='Email' type='email'/>
            <input ref={passwordref} placeholder='password' type='password'/>
            <button onClick={signin} type='submit'>Sign In</button>
            <h4><span className='signupgrey'>New to Netflix?</span>
            <span className='signup_link' onClick={register}> Sign up Now</span></h4>
          </form>
        </div>
    )
}

export default Signupscreen