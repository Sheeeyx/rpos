import { useMutation } from "react-query";
import { request } from "../../../../../api/api";


const useFoodServiceDeleteMeal = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/food_service/meal/${id}/`)
                .then((res) => res.data)
    );

export default useFoodServiceDeleteMeal;
