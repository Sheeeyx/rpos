import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsFaq = (id: string) =>
    useQuery(`faq${id}`, () =>
        request.private.get(`terms/faq/${id}/`).then((res) => res.data)
    );