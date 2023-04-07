import { useMutation } from "react-query";
import { request } from "../../../../../api/api";


const useBakeryDeleteMeal = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/bakery_meal/${id}/`)
                .then((res) => res.data)
    );

export default useBakeryDeleteMeal;
