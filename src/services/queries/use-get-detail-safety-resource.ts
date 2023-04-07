import { request } from "../api/api";
import { useQuery } from "react-query";

export const useGetDetailsSafetyResource = (id: string) =>
    useQuery(`safety-resource${id}`, () =>
        request.private.get(`/terms/safety_resource_centre/${id}/`).then((res) => res.data)
    );