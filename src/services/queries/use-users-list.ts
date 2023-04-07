
import { request } from "../api/api";
import { useQuery } from "react-query";

export const useUserList = (page=1, page_size = 0) =>
  useQuery([page], () =>
    request
      .private.get(`/user/users_for_admin/?${page_size > 0 ? `page_size=${page_size}` : `page=${page}`}`)
      .then((res) => res.data)
  );
