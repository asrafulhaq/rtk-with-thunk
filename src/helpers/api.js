import axios from "axios";

// create API
const API = axios.create({
  baseURL: "https://devzone-rest-apis.onrender.com",
  timeout: "20000",
  withCredentials: false,
});

// export API
export default API;
