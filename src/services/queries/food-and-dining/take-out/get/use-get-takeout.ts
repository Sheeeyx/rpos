import { request } from "../../../../api/api";
import { useQuery } from "react-query";


export const useGetDetailsTakeOut = (id: string) =>
    useQuery(`detail-takeout${id}`, ()=>
        request.private.get(`food_dining/take_out/${id}/`).then((res)=>res.data)
    );