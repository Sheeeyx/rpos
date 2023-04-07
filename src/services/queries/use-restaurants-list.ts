
import { request } from "../api/api";
import { useQuery } from "react-query";

interface RestaurantList {
    results: any;  
}

export const useRestaurantList = (page=1, page_size = 0) =>
    useQuery([page], () =>
        request.private
            .get<RestaurantList>("food_dining/restaurant/")
            .then((res) => res.data.results)
);