import { request } from "../../../api/api";
import { useQuery } from "react-query";

export const useDetailsPartner= (id: string) =>
    useQuery(`partner-${id}`, () =>
        request.private.get(`advert/partner/${id}/`).then((res) => res.data)
    );
