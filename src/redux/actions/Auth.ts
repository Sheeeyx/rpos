import {
    SET_AUTH_TOKENS,
    REFRESH_ACCESS_TOKEN,
    CLEAR_ON_SIGNOUT
} from "../constant/Auth"


export const setAuthTokens = (data:any) => ({
    type: SET_AUTH_TOKENS,
    payload: {
        token: data.data && data.data.token,
    },
});
export const logout = () => ({
    type: CLEAR_ON_SIGNOUT,
});

export const refreshAccessToken = (token:any) => ({
    type: REFRESH_ACCESS_TOKEN,
    payload: token,
});

