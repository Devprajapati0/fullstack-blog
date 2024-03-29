import { useState } from 'react'
import Persist from '../persistent/Persist'
import { Link } from 'react-router-dom'
 import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'

function Loginn() {
    const [errors,setError] = useState('')
    const [loading,setloading] = useState(false)
    const [data,setData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const api = Persist();
    const loginUser = async() => {
try {
    setError('')
    setloading(true)
           const response = await api.post('/v1/users/login',data,{
                withCredentials: true
            })
            console.log(response.data);
            setError(response.data.message)
            const accessToken = response.data.data.accessToken
            const refreshToken = response.data.data.refreshToken
             dispatch(login({
                accessToken:accessToken,
                refreshToken:refreshToken
             }))
            setloading(false)
            navigate('/')

} catch (error) {
    console.log(error);
    if(!error?.response){
        setError('no serve response');

       }else if(error.response?.status === 400){
       setError('missing email or password');}
       else if(error.response?.status === 401){
        setError('unauthorized user');}
        else{
        setError('Loginfailed');}
        setloading(false)
        }
}

const submitlogin = (e) => {
    e.preventDefault()
    loginUser()
   
  }

  const handleDetails = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
  }

    
  return (
    <>
     <div>

<div>
<p>
Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
</p>
</div> 
{errors &&
<p aria-live='assertive' >{errors}</p>}
{
   loading && <h3>Loading.....</h3>
}
<div>
<form action="" onSubmit={submitlogin}>
   <label htmlFor="email">Email:</label>
   <input type="text" id='email' name='email' onChange={handleDetails} value={data.email} placeholder='enter the emial'/>
   <br />
   <label htmlFor="pass">password:</label>
   <input type="password" id='pass' name='password' autoComplete="section-red shipping street-address" onChange={handleDetails} value={data.password} placeholder='enter the password'/>
   <br />
<button type='submit'>Login</button>
</form>
</div>
</div>
    </>
  )
}

export default Loginn