import axios from "axios";
// const BASE_URL = "web-url yha dalna hai deployment ke bad";
const BASE_URL = "http://localhost:8000";
// axios.defaults.withCredentials = true;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});