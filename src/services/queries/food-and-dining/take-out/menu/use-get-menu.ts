import { request } from "../../../../api/api";
import { useQuery } from "react-query";

export const useGetTakeOutMenuList = (id:number) =>
  useQuery(`menu-take_out-${id}`, () =>
    request.private.get(`/food_dining/take_out/menu/?take_out=${id}`)
      .then((res) => res.data)
  );
