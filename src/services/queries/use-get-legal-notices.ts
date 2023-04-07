import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetLegalNotices = () =>
    useQuery("legal-notices", () =>
        request.private.get('terms/legal_notices/').then((res) => res.data)
    );
