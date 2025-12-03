import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "http://localhost:8000",
});
console.log(BaseUrl);

export default BaseUrl;
