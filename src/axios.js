import axios from "axios";
const instance = axios.create({
    baseURL:'http://127.0.0.1:5001/clone-2b72f/us-central1/api',// The API (cloud function)URL
//     withCredentials: false,
//     headers: {
//       'Access-Control-Allow-Origin' : '*',
//       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
//   }
});
export default instance;