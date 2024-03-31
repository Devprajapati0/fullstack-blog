import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { api } from './axiosprivate';
import axios from 'axios';
import { login } from '../store/authSlice';


function Persist() {
    const dispatch = useDispatch();
    const selector = useSelector((feild) => feild.auth.useAuth)


    useEffect(()=>{

        const requestIntercept = api.interceptors.request.use(
          config=>{
            if(!config.headers['Authorization']){
              config.headers['Authorization'] = `Bearer ${selector?.accessToken}`
            }
            return config;
          },(Error)=>Promise.reject(Error)
        );
      
      // Add the interceptor to handle 401 responses
      const responseIntercept = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error?.config;
      
          // Check if the error is due to an expired access token
          if (error?.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            try {
              // Refresh the access token
              const {accessToken} =await generaterefreshToken()
              console.log("new acces token is:",accessToken);
      
              // Update the original request with the new access token
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
      
              // Retry the original request
              return api(originalRequest);
            } catch (refreshError) {
              // If refresh fails, redirect to login or handle as needed
              console.error('Failed to refresh access token:', refreshError);
              
              // Redirect to login or handle the error
            }
          }
      
          return Promise.reject(error);
        }
      )
      return ()=>{
        api.interceptors.request.eject(requestIntercept)
        api.interceptors.response.eject(responseIntercept)
      }
       })
      
      
      
      
  
      const generaterefreshToken = async () => {
        try {
          const response = await axios.post('/api/v1/users/refreshregenerate', {}, { withCredentials: true });
          const refreshToken = response.data.data.refreshToken;
          const accessToken = response.data.data.accessToken;
      
          console.log("New AccessToken:", accessToken);
          console.log("RefreshToken:", refreshToken);
      
          // Dispatch the login action with the new access token
          dispatch(login({ accessToken: accessToken }));
      
          return { accessToken, refreshToken };
        } catch (error) {
          console.error('Failed to refresh access token:', error);
          throw error; // Rethrow the error for handling in loginUser function
        }
      };

      return (
        api
      )
}

export default Persist