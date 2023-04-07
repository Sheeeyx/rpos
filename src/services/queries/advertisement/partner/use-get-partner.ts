import { request } from "../../../api/api";
import { useQuery } from "react-query";


export const usePartnerList = (page=1) =>
  useQuery(`partner-page=${page}`, () =>
    request.private.get(`advert/partner/?page=${page}`)
      .then((res) => res.data)
  );