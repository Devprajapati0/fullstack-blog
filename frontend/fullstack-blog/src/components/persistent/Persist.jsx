import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: '/api',
  // Other axios configuration options if needed
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const navigate = useNavigate();
    const originalRequest = error.config;

    // Handle 401 unauthorized errors for token refreshing
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call your endpoint to refresh the access token
        const response = await api.post('/auth/refresh-token', {}, { withCredentials: true });

        // Update the access token in Redux store or wherever you manage authentication
        const dispatch = useDispatch();
        dispatch(login(response.data.accessToken));

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh access token:', refreshError);
        // Handle refresh token failure, e.g., redirect to login page
        navigate('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
