import './ProfileScreen.css'
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userslice'
import { auth } from '../firebase'
import PlansScreen from './PlansScreen'
function ProfileScreen(){

    const user= useSelector(selectUser)

    return(
        <div className='profilescreen'>
              <Nav/>
              <div className='profilescreen_body'>
                   <h3>Edit Profile</h3>
                   <div className='profilescreen_info'>
                      <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'/>
                           <div className='profilescreen_details'>
                                 <h3>{user.email}</h3>
                                 <div className='profilescreen_plans'>
                                       <h3>Plans</h3>
                                       <PlansScreen/>
                                        <button onClick={()=>auth.signOut()} className='profilescreen_Signout'>Sign Out</button>
                                    
                                 </div>
                          </div>

               
                             
                  </div>
               </div>
        </div>
    )

}

export default ProfileScreen