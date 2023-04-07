import { useMutation } from "react-query";
import { request } from "../../../../../api/api";


const useTakeOutDeleteMeal = () =>
    useMutation(
        (id: number) =>
            request.private
                .delete(`food_dining/take_out/meal/${id}/`)
                .then((res) => res.data)
    );

export default useTakeOutDeleteMeal;
