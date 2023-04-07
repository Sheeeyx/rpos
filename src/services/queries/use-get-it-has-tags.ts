import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetItHasTags  = () =>
  useQuery('it-has', () =>
    request.private.get('food_dining/it_has/')
      .then((res) => res.data)
  );
