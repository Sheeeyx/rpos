import { request } from "../api/api";
import { useQuery } from "react-query";

export const useDetailsBanner = (id: string) =>
    useQuery(`banner${id}`, () =>
        request.private.get(`advert/banner/${id}/`).then((res) => res.data)
    );
