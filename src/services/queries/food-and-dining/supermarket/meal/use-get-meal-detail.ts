import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetSupermarketDetailMeal = (id: string) =>
    useQuery(`meal-supermarket-${id}`, ()=>
        request.private.get(`food_dining/supermarket_meal/${id}/`).then((res)=>res.data)
    );