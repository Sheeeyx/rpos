import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetExploreTags  = () =>
  useQuery('explore-tags', () =>
    request.private.get('explore/tags/')
      .then((res) => res.data)
  );
