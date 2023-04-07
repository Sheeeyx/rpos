// request.js
import axios from 'axios';
import { store } from '../../redux/store';
import { API_BASE_URL } from "../../configs/AppConfigs";

// optionaly add base url
const client = axios.create({ baseURL:  API_BASE_URL});

const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${store.getState().auth.accessToken}`;

    const onSuccess = (response) => response;
    const onError = (error) => {
       // optionaly catch errors and add some additional logging here
       return error;
    }

    return client(options).then(onSuccess).catch(onError);
}

export default request;