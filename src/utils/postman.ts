import axios from "axios";
import qs from "qs";

export const postman = axios.create({
  paramsSerializer: (params) =>
    qs.stringify(params, { indices: false, arrayFormat: "repeat" }),
});

postman.interceptors.request.use((config) => {
  config.params = config.params || {};
  return config;
});

postman.defaults.headers.common["apikey"] = "rWVTMzl78AA6YYWFltixL9dbcKQja7zg";

postman.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    if (error.response) {
      throw error.response;
    }

    throw error;
  }
);
