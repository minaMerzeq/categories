import axios from "axios";
import { CancelToken } from "axios"; // Import CancelToken

const axiosConfig = axios.create();

axiosConfig.interceptors.request.use(
  (config) => {
    // Create a new cancel token for each request
    const source = CancelToken.source();
    config.cancelToken = source.token;
    config.headers["private-key"] = "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16";
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default axiosConfig;
