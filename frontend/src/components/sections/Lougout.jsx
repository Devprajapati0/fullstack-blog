import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import "../loader.css"
import useAuthApi from '../persistent/Persist'
function Lougout() {
    const [loading,setloading] = useState(false)
    const [errors,setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = useAuthApi()
    const logoutuser = async() => {
   try {
      setError("")
      setloading(true)
        const response =  await api.get('/v1/users/logout',{
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
  return !loading ? (
    <>
    <div>{errors &&
<p aria-live='assertive' >{errors}</p>}
        <button onClick={logoutuser}  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >Logout</button>
    </div>
    </>
  ):  <div className='spinner' ></div>
}

export default Lougout