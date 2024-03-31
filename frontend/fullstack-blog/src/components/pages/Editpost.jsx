import {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Persist from '../persistent/Persist';
import RTE from '../sections/RTE';
import "../loader.css"

function Editpost() {

  const {postId} = useParams()

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    title: '',
    content: '',
    featuredImage: null,
    isActive: false
  });
  const navigate = useNavigate()

  const api = Persist();

  const editpost = async () => {
    try {
      setError('');
      setLoading(true);
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      formData.append('featuredImage', post.featuredImage); // Append the file
      formData.append('isActive', post.isActive); 
      console.log(formData);
      
      const response = await api.patch(`/v1/posts/editpost/${postId}`, formData, {
        withCredentials: true,
      });
      console.log(response.data.data._id);
      setError(response.data.message);
      setLoading(false);
      navigate(`/Post/${response.data.data._id}`)

    } catch (error) {
      console.error(error);
      if (!error.response) {
        setError('No server response');
      } else if (error.response.status === 400) {
        setError('Missing post credentials');
      } else if (error.response.status === 401) {
        setError('Unauthorized user');
      } else {
        setError('Post creation failed');
      }
      setLoading(false);
    }
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    editpost();
  };
                                                                                                                                                                       
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPost(prevPost => ({
      ...prevPost,
      featuredImage: file
    }));
  };

  return !loading ? (
    <div>
      <div>
        <p>{error}</p>
      </div>
      {loading && <h3>Loading.....</h3>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={post.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <RTE name="content" value={post.content} onChange={(content) => setPost(prevPost => ({ ...prevPost, content }))} />
        </div>
        <div>
          <label htmlFor="featuredImage">Featured Image:</label>
          <input type="file" id="featuredImage" name="featuredImage" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="isActive">isActive:</label>
          <input type="checkbox" id="isActive" name="isActive" checked={post.isActive} onChange={handleChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  ):<div className='spinner' ></div>

}

export default Editpost