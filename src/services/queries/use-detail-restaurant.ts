import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsRestaurant = (id: string) =>
    useQuery(`detail-restaurant${id}`, () =>
        request.private.get(`food_dining/restaurant/${id}/`).then((res) => res.data)
    );
