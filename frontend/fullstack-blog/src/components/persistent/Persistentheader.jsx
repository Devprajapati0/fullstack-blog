import  { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function Persistentheader() {
    const [loading,setloading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector((state)=>state.auth.useAuth)
    useEffect(()=>{
      const refreshregenerate = async()=>{
              try {
            const response =  await axios.post('/api/v1/users/refreshregenerate',  { withCredentials: true });
              dispatch(login(response.data.data.accessToken));
        console.log("hello");
          }
           catch (error) {
           navigate('/login')}
               finally{
                setloading(false)
  }
  }
  (selector.accessToken =="")? refreshregenerate():setloading(false)
  },[setloading,selector,dispatch,navigate])
    return(
      <>
      {loading ? <div className='spinner' ></div>
      : 
      
        <Outlet />
      }
      </>
    )
}

export default Persistentheader