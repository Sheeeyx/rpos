import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetFaqList = () =>
  useQuery('faq', () =>
    request.private.get('terms/faq/')
      .then((res) => res.data)
  );
