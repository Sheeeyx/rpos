import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetTravalling = (page=1) =>
    useQuery(`travalling-deals-page=${page}`, () =>
        request.private.get(`advert/travelling/admin/?page=${page}`).then((res) => res.data)
    );
