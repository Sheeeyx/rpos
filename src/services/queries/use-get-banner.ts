import { request } from "../api/api";
import { useQuery } from "react-query";


export const useBannerList = (page=1) =>
  useQuery(`banner-page=${page}`, () =>
    request.private.get(`advert/banner/?page=${page}`)
      .then((res) => res.data)
  );