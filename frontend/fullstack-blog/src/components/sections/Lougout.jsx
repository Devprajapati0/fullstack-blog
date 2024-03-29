import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

function Lougout() {
    const [loading,setloading] = useState(false)
    const [errors,setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutuser = async() => {
   try {
      setError("")
      setloading(true)
        const response =  await axios.get('/api/v1/users/logout',{
             withCredentials:true,
         })
         setError(response.data.message)
         dispatch(logout())
         console.log(response.data);
         setloading(false)
         navigate('/')
         
   } catch (error) {
      console.log(error);
      if(!error?.response){
          setError('no serve response');
  
         }
         else if(error.response?.status === 401){
          setError('unauthorized user');}
          else{
          setError('Logoutfailed');}
          setloading(false)
          }
   }
  return (
    <>
    <div>{errors &&
<p aria-live='assertive' >{errors}</p>}
{
   loading && <h3>Loading.....</h3>
}
        <button onClick={logoutuser} >Logout</button>
    </div>
    </>
  )
}

export default Lougout