import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsPrivacyPolicy = (id: string) =>
    useQuery(`privacy-policy${id}`, () =>
        request.private.get(`/terms/privacy_policy/${id}/`).then((res) => res.data)
    );