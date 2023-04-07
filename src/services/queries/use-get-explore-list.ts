import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetExploreList = (page=1) =>
  useQuery(`exploreList-page=${page}`, () =>
    request.private.get(`explore/exp/?page=${page}`)
      .then((res) => res.data)
  );
