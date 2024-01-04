import { useEffect, useState } from 'react'
import './PlansScreen.css'
import {db} from '../firebase'
import {collection, query, where, getDocs, doc, onSnapshot, setDoc, addDoc, getDoc} from 'firebase/firestore'

import {db as d} from '../firebase'
import { collection as c, query as qu, getDocs as g } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userslice'
import { loadStripe } from '@stripe/stripe-js'




function PlansScreen(){ 

    const [products, setProducts]= useState([])
    const user= useSelector(selectUser)
    const [subscription, setSubscription]= useState(null)

    useEffect(()=>{
        
        const currentplan=async()=>{

            let sub= query(collection(db,'customers', `${user.uid}`, 'subscriptions'))

            const querysnap= await getDocs(sub)

            querysnap.forEach(async currentsubscription=>{
                console.log(currentsubscription.data())
                setSubscription({
                    role: currentsubscription.data().role,
                    current_period_end: currentsubscription.data().current_period_end.seconds,
                    current_period_start: currentsubscription.data().current_period_start.seconds
                })
            })


        }

        currentplan()



    },[user.uid])

    useEffect(()=>{

        const fetcho=async()=>{

        const q= query(collection(db,'products'), where('active','==',true))
   
        const querySnapshot= await getDocs(q);
        
        
        const products={}

        querySnapshot.forEach(async productDoc=>{
            //console.log(productDoc.data())
         products[productDoc.id]=productDoc.data()
          
          let u= collection(db,`products/${productDoc.id}/prices`)
          const pricesnap= await getDocs(u)
          pricesnap.docs.forEach(doc=>{
            products[productDoc.id].prices={
                priceID: doc.id,
                priceData: doc.data()
            }
          })
          setProducts(products)

        })

    } 
    fetcho()
    
    },[])
   
  console.log(products)
  console.log(subscription)

  const loadCheckout= async(priceID)=>{

    const docref=await addDoc(c(d, `customers/${user.uid}`, 'checkout_sessions'), {
        price: priceID,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    })

    // docref.onSnapshot(async(snap)=>{
    //     const {error, sessionId}= snap.data()

    //     if(error){
    //         alert(`An error occured:${error.message}`)
    //     }
    // })
   

    // let q = qu(c(d, `customers/${user.uid}/checkout_sessions`));
    //     let querySnapshot = await getDocs(q);
        
        
    //     querySnapshot.forEach(async (user) => {
    //         await addDoc(c(d, `customers/${user.uid}/checkout_sessions`), {
    //             price: priceID,
                
    //         });
    //     })
    //     console.log(querySnapshot)

    onSnapshot(docref, async (snap)=>{
        const {error, sessionId}= snap.data()

        if(error){
            alert(`An error occured:${error.message}`)
        }

        if(sessionId){
            const stripe= await loadStripe('pk_test_51MEsdNSIQfVMmlex32k4GwQT6mcKDCqkx41473UJHjhr50oON0t7bvvJ0cbWLWdddJnxD0R7Cooz5TNECXATyb1Z00UxWGH2VE')
            stripe.redirectToCheckout({sessionId})
        }
    })
    }

    return(
        <div className='plansscreen'>

           {subscription&& <p>Renewal Date:{new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}

             {Object.entries(products).map(([productId, productData])=>{

               
                const isCurrentpackage= productData.name.includes(subscription?.role)
                return(
                    <div key={productId} className={`${isCurrentpackage && 'planscreen_disabled'} planscreen_plan`}>
                        <div className='planscreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={()=>!isCurrentpackage && loadCheckout(productData.prices.priceID)}>{isCurrentpackage?'Current Plan': 'Subscribe'}</button>
                    </div>
                )
             })}

        </div>
    )
            }

export default PlansScreen