import { useState,useEffect} from 'react'
import Persist from "../persistent/Persist"
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Container from "../post/Container"
import { Link } from 'react-router-dom'
import "../loader.css"


function Post() {
    const api = Persist();
    const navigate = useNavigate();
    const {postId} = useParams()
    const [loading,setloading] = useState(false)
    const [errror,setError] = useState('login first')
    const [responseData,setresponseData] = useState({})

    const deletpost = async() => {
try {
    setError("")
            setloading(true)
          const response =  await api.delete(`/v1/posts/deletepost/${responseData._id}`,{
                withCredentials:true
            }) 
            setloading(false)
            setError(response.data.message)
            alert(response.data.message)
            navigate('/')
} catch (error) {
    console.log(error);
    if(!error?.response){
        alert('no serve response');

       }
       else if(error.response?.status === 401){
        alert('unauthorized user');}
        else{
        alert('Logoutfailed');}
        setloading(false)
        }
}
    useEffect(() => {
        const fetchdata  =async() =>{
        try {
            setError('')
            setloading(true)
                const response = await api.get(`/v1/posts/getpost/${postId}`,{
                        withCredentials:true
                    })
                    console.log(response.data.data)
                    setresponseData(response.data.data)
                    setloading(false)
        } catch (error) {
            console.log(error);
            if(!error?.response){
                setError('no serve response');
        
               }else if(error.response?.status === 400){
               setError('credential are required');}
               else if(error.response?.status === 401){
                setError('unauthorized user');}
                else{
                setError('Post doesnot found');}
                setloading(false)
                navigate('/')
                }
            }
        fetchdata()
    }, [postId,api,navigate])

  return !loading ? (

    <div>
    <Container>
        {errror}
        <div>
            <img src={responseData.featuredImage} />
            <Link to={`/Editpost/${responseData._id}`}>
                                <button className="mr-3 bg-red-500">
                                    Edit
                                </button>
                            </Link>

                            
                                <button className="mr-3" onClick={deletpost}>
                                    Delete
                                </button>
                            
                            <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{responseData.title}</h1>
                </div>    
        <div className="browser-css">
                    {responseData.content}
                    </div>  
                    
                   
                    

        <button onClick={()=>navigate('/')}>Confirm</button>           
            

        </div>
        
        </Container>    
        
    </div>

  )  :<div className='spinner' ></div>
}

export default Post