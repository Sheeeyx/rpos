import { request } from "../api/api";
import { useQuery } from "react-query";

export const useDetailsAdvetisement = (id: string) =>
    useQuery(`advertisement${id}`, () =>
        request.private.get(`advert/advertisement/${id}/`).then((res) => res.data)
    );
