import { request } from "../../../../../api/api";
import { useQuery } from "react-query";


export const useGetTakeOutDetailMeal = (id: string) =>
    useQuery(`meal-take_out-${id}`, ()=>
        request.private.get(`food_dining/take_out/meal/${id}/`).then((res)=>res.data)
    );