import { request } from "../api/api";
import { useQuery } from "react-query";

interface UserCountTypes{
  user_count: number
}

export const useUsersCount = () =>
  useQuery("users-count", () =>
    request.private.get<UserCountTypes>(`user/user_count/`)
      .then((res) => res.data)
  );
