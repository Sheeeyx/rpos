import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailTravelling = (id: string) =>
    useQuery(`detail-travelling-${id}`, () =>
        request.private.get(`advert/travelling/${id}/`).then((res) => res.data)
    );
