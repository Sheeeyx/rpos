import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetDetailsSuperMarket = (id: string) =>
    useQuery(`detail-supermarket${id}`, ()=>
        request.private.get(`food_dining/supermarket/detail/${id}/`).then((res)=>res.data)
    );