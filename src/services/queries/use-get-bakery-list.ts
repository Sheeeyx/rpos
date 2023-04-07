import { request } from "../api/api";
import { useQuery } from "react-query";


export const useGetBakeryList = (page=1) =>
  useQuery(`bakery-page=${page}`, () =>
    request.private.get(`food_dining/bakery/list/?page=${page}`)
      .then((res) => res.data)
  );