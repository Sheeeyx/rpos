import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetContactUs = () =>
  useQuery('contact', () =>
    request.private.get('terms/get-contact-us/')
      .then((res) => res.data)
  );
