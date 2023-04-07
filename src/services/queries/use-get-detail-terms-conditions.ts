import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsTermsCondition = (id: string) =>
    useQuery(`terms-condition${id}`, () =>
        request.private.get(`/terms/terms_conditions/${id}/`).then((res) => res.data)
    );