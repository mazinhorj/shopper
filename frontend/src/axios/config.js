import axios from 'axios';

// const url = process.env.REACT_APP_API

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    // "Content-Type": "application/json",
  },
});

export default api;