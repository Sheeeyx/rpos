import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetRestaurantMenuList = (id:number) =>
  useQuery(`menu-restaurant-${id}`, () =>
    request.private.get(`food_dining/restaurant/menu/?restaurant=${id}`)
      .then((res) => res.data)
  );
