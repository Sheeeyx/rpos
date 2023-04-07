import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetRetrivew = (id: string) =>
    useQuery(`explore${id}`, () =>
        request.private.get(`explore/exp/${id}/`).then((res) => res.data)
    );
