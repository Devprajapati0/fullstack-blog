import { useState,useEffect} from 'react'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Container from "../post/Container"
import Postcard from "../post/Postcard"
import "../loader.css"
import api from '../persistent/Persist'

function Home() {
    const navigate = useNavigate();
    const {postId} = useParams()
    const [loading,setloading] = useState(false)
    const [responseData,setresponseData] = useState([])

    useEffect(()=>{
      const fetchdata  =async() =>{
        try {
            setloading(true)
                const response = await api.get('/v1/posts/',{
                        withCredentials:true
                    })
                    console.log(response.data.data)
                    setresponseData(response.data.data)
                    setloading(false)
                    navigate('/')
        } catch (error) {
            console.log(error);
                navigate('/');
                }
            }
        fetchdata()
    },[navigate,postId])

  return !loading ? (
    <div  className='w-full py-8'>
    <Container>
      <div className='flex flex-wrap'>
      {
        responseData.map((res)=>(
          <div key={res._id} className='p-2 w-1/4'>
          <Postcard {...res} />
      </div>
        ))
      }
    </div>
    </Container>
    </div>
  ) : <div className='spinner' ></div>
}

export default Home