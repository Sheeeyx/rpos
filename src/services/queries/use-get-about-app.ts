import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetAboutApp = () =>
  useQuery('about-app', () =>
    request.private.get('terms/about_app/first/')
      .then((res) => res.data)
  );
  