import { request } from "../../api/api";
import { useQuery } from "react-query";

export const useDetailsUser = (data: string) =>
    useQuery(`users-${data}`, () =>
        request.private.post(`user/get`,`id=${data}`).then((res) => res.data)
    );
