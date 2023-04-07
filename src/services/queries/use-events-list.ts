
import { request } from "../api/api";
import { useQuery } from "react-query";

export const useEventList = (page=1, page_size = 0) =>
  useQuery([page], () =>
    request.private
      .get(`event/?${page_size ? `page_size=${page_size}` : `page=${page}`}`)
      .then((res) => res.data)
  );
