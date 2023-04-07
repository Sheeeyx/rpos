import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetServiceOptionTags  = () =>
  useQuery('service-option', () =>
    request.private.get('food_dining/service_option/')
      .then((res) => res.data)
);
