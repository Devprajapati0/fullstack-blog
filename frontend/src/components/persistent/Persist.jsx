// api.js

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useEffect } from 'react';

const useAuthApi = () => {
  const accessToken = useSelector((state) => state.auth.useAuth);
  const dispatch = useDispatch();
 

  const api = axios.create({
    baseURL: '/api',
    // Other axios configuration options if needed
  });

  useEffect(()=>{

  // Request interceptor
  const requestIntercept = api.interceptors.request.use(
    (config) => {
     console.log(accessToken.accessToken)
      if (accessToken.accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  const responseIntercept = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log('Error response:', error);

   
      const originalRequest = error.config;

      // Handle 401 unauthorized errors for token refreshing
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Call your endpoint to refresh the access token
          console.log('Refreshing access token...');
          const response = await axios.post('/api/v1/users/refreshregenerate',  { withCredentials: true });

          // Update the access token in Redux store or wherever you manage authentication
          dispatch(login(response.data.data.accessToken));
          console.log('New access token:', response.data.data.accessToken);

          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          alert("login first")
 
          // Handle refresh token failure, e.g., redirect to login page
        }
      }
      else{
        console.log("hello")
  
      }

      return Promise.reject(error);
    }
  );

  return ()=>{
    api.interceptors.request.eject(requestIntercept)
    api.interceptors.response.eject(responseIntercept)
  }
  },[accessToken,api,dispatch])

  return api
  
};

export default useAuthApi;
