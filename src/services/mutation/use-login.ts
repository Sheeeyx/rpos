import axios from "axios";
import { API_BASE_URL } from "../../configs/AppConfigs";

export const auth = {
    login: (data:any) =>  axios.post(`${API_BASE_URL}user/auth/`
        , data),

};
