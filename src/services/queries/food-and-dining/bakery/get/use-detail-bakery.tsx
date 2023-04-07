import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetDetailsBakery = (id: string) =>
    useQuery(`details-bakery${id}`, ()=>
        request.private.get(`food_dining/bakery/detail/${id}/`).then((res)=>res.data)
    );