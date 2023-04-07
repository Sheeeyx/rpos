import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetTermsConditions = () =>
    useQuery("terms-conditions", () =>
        request.private.get('terms/terms_conditions/').then((res) => res.data)
    );
