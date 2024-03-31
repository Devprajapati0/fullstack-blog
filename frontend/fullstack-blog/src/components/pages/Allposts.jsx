import { useState,useEffect} from 'react'
import Persist from "../persistent/Persist"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Container from "../post/Container"
import Postcard from "../post/Postcard"

function Allposts() {
   const api = Persist();
    const navigate = useNavigate();
    const {postId} = useParams()
    const [loading,setloading] = useState(false)
    const [responseData,setresponseData] = useState([])

    useEffect(()=>{
      const fetchdata  =async() =>{
        try {
            setloading(true)
                const response = await api.get('/v1/posts/getallpost',{
                        withCredentials:true
                    })
                    console.log(response.data.data)
                    setresponseData(response.data.data)
                    setloading(false)
        } catch (error) {
            console.log(error);
                navigate('/');
                }
            }
        fetchdata()
    },[api,navigate,postId])

  return !loading ? (
    <div className='w-full py-8'>
    <Container>
      <div className='flex flex-wrap'>
      {
        responseData.map((res)=>(
          <div key={responseData._id} className='p-2 w-1/4'>
          <Postcard {...res} />
      </div>
        ))
      }
    </div>
    </Container>
    </div>
  ) :<div className='spinner' ></div>
}

export default Allposts