import axios from "axios";

export const api = axios.create({
    baseURL: '/api', // Your API base URL
    withCredentials: true, // Include credentials (cookies) with requests
   });
