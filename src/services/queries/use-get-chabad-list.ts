import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetChabadList = (page=1) =>
  useQuery(`chabadList-page=${page}`, () =>
    request.private.get(`chabad/?page=${page}`)
      .then((res) => res.data)
  );
