import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "https://url-backend-wj45.vercel.app/",
});
console.log(BaseUrl);

export default BaseUrl;
