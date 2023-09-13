import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

export default http;
