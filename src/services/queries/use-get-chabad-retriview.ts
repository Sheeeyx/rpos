import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetRetrivew = (id: string) =>
    useQuery(`chabad${id}`, () =>
        request.private.get(`chabad/${id}/`).then((res) => res.data)
    );
