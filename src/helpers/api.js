import axios from "axios";

// create API
const API = axios.create({
  baseURL: "http://localhost:5050",
  timeout: "20000",
  withCredentials: false,
});

// export API
export default API;
