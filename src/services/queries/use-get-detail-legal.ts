import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsLegalNotice = (id: string) =>
    useQuery(`legal-notice${id}`, () =>
        request.private.get(`/terms/legal_notices/${id}/`).then((res) => res.data)
    );