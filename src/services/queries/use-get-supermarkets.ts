import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetSupermarkets  = (page=1) =>
  useQuery(`supermarkets-page=${page}`, () =>
    request.private.get(`food_dining/supermarket/list/?page=${page}`)
      .then((res) => res.data)
);
