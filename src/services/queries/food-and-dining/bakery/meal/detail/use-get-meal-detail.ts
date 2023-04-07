import { request } from "../../../../../api/api";
import { useQuery } from "react-query";


export const useGetBakeryDetailMeal = (id: string) =>
    useQuery(`meal-bakery-${id}`, ()=>
        request.private.get(`food_dining/restaurant/meal/${id}/`).then((res)=>res.data)
    );