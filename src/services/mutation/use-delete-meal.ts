import { useMutation } from "react-query";
import { request } from "../api/api";


const useDeleteMeal = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/restaurant/meal/${id}/`)
                .then((res) => res.data)
    );

export default useDeleteMeal;
