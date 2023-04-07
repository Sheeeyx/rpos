import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetTakeout = (page=1) =>
  useQuery(`takeout-page-${page}`, () =>
    request.private.get(`food_dining/take_out/?page=${page}`)
      .then((res) => res.data)
);
