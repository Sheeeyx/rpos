import { request } from "../../../../api/api";
import { useQuery } from "react-query";

export const useGetFoodServiceMenuList = (id:number) =>
  useQuery(`menu-food_service-${id}`, () =>
    request.private.get(`food_dining/food_service/menu/?food_service=${id}`)
      .then((res) => res.data)
  );
