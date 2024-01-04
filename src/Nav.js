import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Nav.css'

function Nav(){

    const [show, setShow]= useState(false)
    const navigate= useNavigate()
    
    const transitionNavbar=()=>{
        if(window.scrollY>100){
          setShow(true)
        }
        else{
            setShow(false)
        }
    }
    useEffect(()=>{
        
        window.addEventListener('scroll', transitionNavbar)

        return()=>window.removeEventListener('scroll', transitionNavbar)

    },[])


    return(
<div className={`nav ${show && 'nav_black'}`}>

    
    <div className='nav_contents'>
    <img className='nav_logo' 
    src='https://www.freepnglogos.com/uploads/netflix-logo-0.png' width={110} alt=''></img>

     <img className='nav_avatar' onClick={()=>navigate('/profile')}
     src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117' alt=''></img>

</div>
</div>

    )


}

export default Nav