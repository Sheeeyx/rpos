import { request } from "../../../../../api/api";
import { useQuery } from "react-query";


export const useGetFoodServiceDetailMeal = (id: string) =>
    useQuery(`meal-food_service-${id}`, ()=>
        request.private.get(`food_dining/food_service/meal/${id}/`).then((res)=>res.data)
    );