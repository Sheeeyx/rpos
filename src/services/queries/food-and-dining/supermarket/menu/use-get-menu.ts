import { request } from "../../../../api/api";
import { useQuery } from "react-query";

export const useGetSuperMarketMenuList = (id:number) =>
  useQuery(`menu-supermarket-${id}`, () =>
    request.private.get(`food_dining/supermarket_menu/?supermarket=${id}`)
      .then((res) => res.data)
  );
