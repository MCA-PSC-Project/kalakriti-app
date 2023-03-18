import axios from 'axios';

// const baseURL= process.env.REACT_APP_API_URL
const baseURL= "http://localhost:3500"

export default axios.create({
    baseURL: baseURL
});