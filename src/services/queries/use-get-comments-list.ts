import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetCommentsList = (page: number) =>
  useQuery([page], () =>
    request.private.get(`voice_matters/comment/?page=${page}`)
      .then((res) => res.data)
  );
