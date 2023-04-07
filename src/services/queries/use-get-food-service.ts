import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetFoodService  = (page=1) =>
  useQuery(`food-service-page=${page}`, () =>
    request.private.get(`food_dining/food_service/?page=${1}`)
      .then((res) => res.data)
  );
