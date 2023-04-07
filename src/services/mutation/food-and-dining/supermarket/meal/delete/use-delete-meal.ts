import { useMutation } from "react-query";
import { request } from "../../../../../api/api";


const useSuperMarketDeleteMeal = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/supermarket_meal/${id}/`)
                .then((res) => res.data)
    );

export default useSuperMarketDeleteMeal;
