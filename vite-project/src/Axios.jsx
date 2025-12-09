import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "https://url-server-ten.vercel.app/",
});
console.log(BaseUrl);

export default BaseUrl;
