import { request } from "../api/api";
import { useQuery } from "react-query";

export const useTopEvents = () =>
  useQuery([], () =>
    request.private.get('event/top_10_events/')
      .then((res) => res.data)
  );
