import { request } from "../../../../api/api";
import { useQuery } from "react-query";

export const useGetBekeryMenuList = (id:number) =>
  useQuery(`menu-bakery-${id}`, () =>
    request.private.get(`/food_dining/bakery_menu/?bakery=${id}`)
      .then((res) => res.data)
  );
