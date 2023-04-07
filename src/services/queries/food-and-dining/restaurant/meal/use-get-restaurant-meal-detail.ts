import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetRestaurantDetailMeal = (id: string) =>
    useQuery(`meal-restaurant-${id}`, ()=>
        request.private.get(`food_dining/restaurant/meal/${id}/`).then((res)=>res.data)
    );