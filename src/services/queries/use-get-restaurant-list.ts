import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetRestaurantList = (page=1) =>
  useQuery(`restaurant-page=${page}`, () =>
    request.private.get('food_dining/restaurant/')
      .then((res) => res.data)
  );
