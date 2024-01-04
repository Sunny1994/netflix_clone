import { useState } from 'react'
import './Loginscreen.css'
import Signupscreen from './Signupscreen'

function Loginscreen(){

    const [signin, setSignin]= useState(false)


    return(
        <div className='loginscreen'>
              <div className='loginscreen_background'>
                  <img className='loginscreen_logo' src='https://www.freepnglogos.com/uploads/netflix-logo-0.png'/>


                  <button onClick={()=>setSignin(true)}  className='loginscreen_button'>
                       Sign in
                    </button>


                    <div className='loginscreen_gradient'/>

                    <div className='loginscreen_body'>
                        {signin?(
                            <Signupscreen/>
                        ):(
                          
                            <>
                        <h1>Unlimited films, TV programmes and More</h1>
                        <h2>Watch Anywhere, Anytime on <span className='name'>Roshan's</span> Netflix</h2>
                        <h3>Reaady To watch? Enter your email and create your membership account</h3>

                        <div className='loginscreen_input'>
                            <form>
                                <input type='email'
                                placeholder='enter your email'
                                />
                                <button onClick={()=>setSignin(true)} className='loginscreen_getstarted'>
                                    GET STARTED
                                </button>
                            </form>

                        </div>
                        </>

                        )}
                       
                    </div>


              </div>

              



        </div>
    )

}

export default Loginscreen