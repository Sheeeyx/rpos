import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetFoodTypeTags  = () =>
  useQuery('food-type', () =>
    request.private.get('food_dining/food_type/')
      .then((res) => res.data)
  );
