import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetSafetyResource = () =>
  useQuery('safety-resource', () =>
    request.private.get('terms/safety_resource_centre/')
      .then((res) => res.data)
  );
