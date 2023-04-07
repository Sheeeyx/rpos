import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetGoodForTags  = () =>
  useQuery('good-for', () =>
    request.private.get('food_dining/good_for/')
      .then((res) => res.data)
  );
