import { request } from "../api/api";
import { useQuery } from "react-query";


export const useAdvertisementList = (page=1) =>
  useQuery(`advertisement-page=${page}`, () =>
    request.private.get(`advert/advertisement/?page=${page}`)
      .then((res) => res.data)
  );