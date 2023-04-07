
import axios from "axios";
import { API_BASE_URL } from "../../configs/AppConfigs";
import {store} from "../../redux/store";

export const request = {
  private: axios.create({ baseURL: API_BASE_URL }),
  public: axios.create({ baseURL: API_BASE_URL }),
};
request.private.interceptors.request.use((config:any) => {
  config.headers["Authorization"] =  `Bearer ${store.getState().auth.accessToken}`;
  return config;
});
