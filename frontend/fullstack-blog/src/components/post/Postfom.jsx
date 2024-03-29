import { useState } from "react"
import Persist from "../persistent/Persist"

function Postfom() {
  /*const [data,setData] = useState({
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
  }*/
  /*
          <p ref={errref} className={errmsg ? "Errmsg" : "offscreen"} aria-live='assertive' >{errmsg}</p>
        <h1>Sign in</h1>
        <form action="" onSubmit={submit}>
      <h3>Email:</h3>
      <input type="text" ref={userref} required name='email' value={data.email} onChange={handlechnage}/>
      <h3>Password:</h3>
      <input type="password" ref={userref} required name='password' value={data.password} onChange={handlechnage}/>
      <br/><input type="checkbox" name="" id="" onChange={togglepersist} checked={persist} />Remeber me:<br/>
      <button type='submit' > submit</button>
    </form>
    <button onClick={logout}>Logout</button>


    
  const registered = async()=>{
    setError(false);
    try {
      const response = await axios.post('/api/v1/users/register',register,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true})
    setLoading(false)
        setRegister(response.data)
        console.log(response.data);
    } catch (error) {
      setError(true);
      setLoading(true)
      console.log(error.message);
    }
  }

  const handlechange = (e)=>{
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }

  const handlefilechange = (e,feildname)=>{
    const file = e.target.files[0];
    setRegister((prev)=>({
      ...prev,
      [feildname]:file,}))
    
  }

  const submitregister=async(e)=>{
    e.preventDefault();
    registered()
  }*/

  const [errorr,setError] = useState('')
  const [loading,setloading] = useState(false)
  const [post,setpost] = useState({
    title:'',
    content:'',
    featuredImage:null,
    isActive:false
  })
  const api = Persist()
  const createpsot = async() => {
   try {
    setError('')
    setloading(true)
    const response=  await api.post('/v1/posts/createpost',post,{
       withCredentials:true
     })
     console.log(response.data);
     setError(response.data.data.message)
     setloading(false)
   } catch (error) {
    console.log(error);
    if(!error?.response){
        setError('no serve response');
       }else if(error.response?.status === 400){
       setError('missing post credentials');}
       else if(error.response?.status === 401){
        setError('unauthorized user');}
        else{
        setError('Post creation failed');}
        setloading(false)
        }
   }
  return (
    <div>
      <div>
      <p ref={errorr}>{errorr}</p></div>

        <form action="" onSubmit={submitpostcreation}>
      <h3>Title:</h3>
      <input type="text" required name='title' value={} onChange={handlechnage}/>
      <h3>Content:</h3>
      <input type="password"  required name='password' value={data.password} onChange={handlechnage}/>
      <br/><input type="checkbox" name="" id="" onChange={togglepersist} checked={persist} />Remeber me:<br/>
      <button type='submit' > submit</button>
    </form>
    </div>
  )
}

export default Postfom