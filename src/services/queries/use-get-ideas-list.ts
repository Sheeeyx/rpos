import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetIdeasList = (page:number) =>
  useQuery([page], () =>
    request.private.get(`voice_matters/idea/?page=${page}`)
      .then((res) => res.data)
  );
