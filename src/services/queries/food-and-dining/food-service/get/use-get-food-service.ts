import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetDetailsFoodService = (id: string) =>
    useQuery(`detail-food-service${id}`, ()=>
        request.private.get(`food_dining/food_service/${id}/`).then((res)=>res.data)
    );