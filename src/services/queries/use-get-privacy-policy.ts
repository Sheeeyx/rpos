import { request } from "../api/api";
import { useQuery } from "react-query";


export const useGetPrivacyPolicy = () =>
    useQuery("privacy-policy", () =>
        request.private.get('terms/privacy_policy/').then((res) => res.data)
    );
