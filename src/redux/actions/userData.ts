import { SET_USER_DATA } from "../constant/Auth";

export const setUserData = (data:any) => ({
    type: SET_USER_DATA,
    payload: data,
})