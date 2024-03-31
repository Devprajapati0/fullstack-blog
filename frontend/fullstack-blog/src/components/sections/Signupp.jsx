
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "../loader.css"

 function Signupp() {
  const [data,setData] = useState({
    username:"",
    email:"",
    password:""
  })

  const [loading,setloading] = useState(false)
  const [errorq,setError] = useState('')
  const navigate = useNavigate()

  const register = async() => {
 try {
    setError("")
    setloading(true)
      const response =  await axios.post('/api/v1/users/signup',data,{
           withCredentials:true,
       })
       setError(response.data.message)
       console.log(response.data);
       setloading(false)
       navigate('/')
       
 } catch (error) {
    console.log(error);
    if(!error?.response){
        setError('no serve response');

       }else if(error.response?.status === 400){
       setError('missing usernmae or password');}
       else if(error.response?.status === 401){
        setError('unauthorized user');}
        else{
        setError('Signupfailed');}
        setloading(false)
        }
 }
  

  const submitregister = (e) => {
    e.preventDefault()
    register()
   
  }

  const handleDetails = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
  }





  return !loading ?(
    <>
    <div className="flex items-center justify-center">

         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Login
            </Link> 
        </p>
        </div> 
        {errorq &&
         <p>{errorq}</p>}
         {
            loading && <h3>Loading.....</h3>
         }
        <div>
        <form action="" onSubmit={submitregister}>
            <label htmlFor="name">Username:</label>
            <input type="text" id='name' name='username' onChange={handleDetails} value={data.username} placeholder='Eneter the username'/>
            <br />
            <label htmlFor="email">Email:</label>
            <input type="text" id='email' name='email' onChange={handleDetails} value={data.email} placeholder='enter the emial'/>
            <br />
            <label htmlFor="pass">password:</label>
            <input type="password" id='pass' name='password' autoComplete="section-red shipping street-address" onChange={handleDetails} value={data.password} placeholder='enter the password'/>
            <br />
        <button type='submit'>Signup</button>
        </form>
        </div>
    </div>
    </>
  ) :<div className='spinner' ></div>
}

export default Signupp
