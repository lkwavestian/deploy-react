import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(config);
      }, 1000)
    );
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
