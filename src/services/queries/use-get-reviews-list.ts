import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetReviewsList = (page:number) =>
  useQuery([page], () =>
    request.private.get(`voice_matters/review/?page=${page}`)
      .then((res) => res.data)
  );
