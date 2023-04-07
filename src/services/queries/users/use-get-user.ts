import { request } from "../../api/api";
import { useQuery } from "react-query";

export const UseGetUsersList = () =>
  useQuery('user-list', () =>
    request.private.get(`user/all`)
      .then((res) => res.data)
  );
