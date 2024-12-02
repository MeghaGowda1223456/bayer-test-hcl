import axios from "axios";

const baseURL =
  "https://4ds8jhomw6.execute-api.ap-southeast-2.amazonaws.com/dev";
console.log(baseURL, "base url");
const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // console.log("token values is : ", token);
  config.headers = {
    "content-type": "application/json",
    // Authorization: `Bearer ${token}`,
    // "content-type":
    //   "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    // "content-type": "multipart/form-data",
    ...config.headers,
  };
  return config;
});
export { axiosInstance, baseURL };
